import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductsContext";
import { UserContext } from "../context/UserContext";
import { addAnOrder } from "../firebase/firebase";
import ItemCount from "../components/ItemCount";
import Button from "../components/Button";
import useForceUpdate from "./../hooks/useForceUpdate";

export default function CartContainer() {
  const forceUpdate = useForceUpdate();
  const [products, , updateProducts] = useContext(ProductsContext);
  const [user] = useContext(UserContext);
  const [orderID, setOrderID] = useState(null);
  const [items, , , clearCart, updateCart, deleteItem] = useContext(CartContext);

  function calculateTotal() {
    if (!items.size || !products.size) return 0;
    return Array.from(items.entries()).reduce(
      (acc, [id, quantity]) => acc + applyDiscount(products.get(id).price * quantity, products.get(id).discountedPercentage),
      0,
    );
  }

  function handleQuantityChange(event, id) {
    let value = parseInt(event.target.value);
    if (value > products.get(id).stock) value = products.get(id).stock;
    else if (value < 0) value = 1;

    if (value === 0) deleteItem(id);
    else updateCart(id, value);
    forceUpdate();
  }

  function finalPrice(price, discount = 0) {
    return formatPrice(applyDiscount(price, discount));
  }

  async function finalizePurchase() {
    const { id, errorMessage } = await addAnOrder({
      buyerID: user.id,
      items: Array.from(items.entries().map(([id, quantity]) => ({ id: id, quantity: quantity }))),
      total: parseFloat(calculateTotal().toFixed(2)),
      createdAt: new Date(),
    });
    if (errorMessage) return alert("Purchase failed: " + errorMessage);
    const productsUpdated = Array.from(items.entries()).map(([id, quantity]) => {
      return { ...products.get(id), stock: products.get(id).stock - quantity };
    });
    console.log(productsUpdated);
    updateProducts(productsUpdated);
    setOrderID(id);
    alert("Purchase successful");
    clearCart();
  }

  return (
    <div className="mx-auto max-w-screen-xl p-2">
      <section className="grid auto-rows-auto grid-cols-[repeat(5,auto)] gap-1 gap-x-3 rounded-md bg-secondary">
        <header className="col-span-full grid h-12 grid-cols-subgrid place-items-center whitespace-nowrap rounded-t-md bg-accent px-2 py-3 font-medium">
          <div className="col-span-2 px-2">Product Name</div>
          <div className="px-2">Quantity</div>
          <div className="px-2">Price</div>
          <div className="px-2">Total</div>
        </header>
        <ul className="col-span-full grid grid-cols-subgrid px-2 py-1">
          {!items.size && !orderID && (
            <li className="col-span-full grid grid-cols-1 place-items-center py-2">
              <div>Cart's empty 😴</div>
            </li>
          )}
          {orderID && (
            <li className="col-span-full grid grid-cols-1 place-items-center py-2">
              <h2>Order placed 🎉</h2>
              <h3>Order ID: {orderID}</h3>
            </li>
          )}
          {items.size > 0 &&
            products.size > 0 &&
            Array.from(items.entries()).map(([id, quantity]) => (
              <li
                key={id}
                className="col-span-full grid grid-cols-subgrid place-items-center from-secondary via-accent to-secondary p-2 even:bg-gradient-to-r"
              >
                <div className="col-span-2 max-w-full place-self-start truncate">{products.get(id).title}</div>
                <div className="flex flex-wrap items-center justify-center">
                  <ItemCount id={id} max={products.get(id).stock} min={0} value={quantity} onChange={handleQuantityChange} />
                </div>
                <div>{finalPrice(products.get(id).price, products.get(id).discountedPercentage)}</div>
                <div>{finalPrice(products.get(id).price * quantity, products.get(id).discountedPercentage)}</div>
              </li>
            ))}
        </ul>
        <footer className="col-span-full flex h-12 items-center justify-end gap-2 rounded-b-md bg-accent px-2 py-3 font-medium">
          <div className="justify-self-end">Final Price</div>
          <div className="text-xl">{finalPrice(items.size > 0 && products.size > 0 ? calculateTotal() : 0)}</div>
        </footer>
      </section>

      <div className="mt-2 flex justify-center gap-2">
        <Button extraStyles="hue-rotate-180 saturate-150" onClick={clearCart} disabled={!items.size}>
          Clear Cart
        </Button>
        <Button disabled={!user || !items.size} extraStyles="hue-rotate-[300deg] saturate-150" onClick={finalizePurchase}>
          {!user ? "Please Login" : " Finalize Purchase"}
        </Button>
      </div>
    </div>
  );
}

function applyDiscount(price, discount) {
  return ((100 - discount) / 100) * price;
}

function formatPrice(price) {
  return Intl.NumberFormat("es-AR", { style: "currency", currency: "USD" }).format(price);
}
