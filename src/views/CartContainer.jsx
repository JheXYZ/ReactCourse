import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductsContext";
import { UserContext } from "../context/UserContext";
import ItemCount from "../components/ItemCount";
import Button from "../components/Button";
import { getUserById } from "../firebase/firebase";

export default function CartContainer() {
  const [products] = useContext(ProductsContext);
  const [user] = useContext(UserContext);
  const [items, , , clearCart] = useContext(CartContext);

  function calculateTotal() {
    if (!items.size || !products.size) return 0;
    return Array.from(items.entries()).reduce(
      (acc, [id, quantity]) => acc + applyDiscount(products.get(id).price * quantity, products.get(id).discountedPercentage),
      0,
    );
  }

  function finalPrice(price, discount = 0) {
    return formatPrice(applyDiscount(price, discount));
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
          {!items.size && (
            <li className="col-span-full grid grid-cols-1 place-items-center py-2">
              <div>Cart's empty 😴</div>
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
                  <ItemCount max={products.get(id).stock} value={quantity} onChange={(e) => items.set(id, e.target.value)} />
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
        <Button extraStyles="hue-rotate-180 saturate-150" onClick={clearCart}>
          Clear Cart
        </Button>
        <Button disabled={!user} extraStyles="hue-rotate-[300deg] saturate-150">
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
