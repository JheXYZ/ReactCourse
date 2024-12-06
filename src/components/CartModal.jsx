import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductsContext";
import Button from "./Button";

export default function CartModal() {
  const [products] = useContext(ProductsContext);
  const [items, , , clearCart] = useContext(CartContext);

  function calculateTotal() {
    return Array.from(items.entries()).reduce(
      (acc, [id, quantity]) => acc + applyDiscount(products.get(id).price * quantity, products.get(id).discountedPercentage),
      0,
    );
  }

  function finalPrice(price, discount = 0) {
    return formatPrice(applyDiscount(price, discount));
  }

  return (
    <div className="absolute right-0 top-14 z-20 rounded-md border border-accent bg-secondary p-2 sm:right-4 sm:w-[550px]">
      <aside className="grid auto-rows-auto grid-cols-[repeat(5,auto)] gap-1 gap-x-3 rounded-md bg-secondary">
        <header className="col-span-full grid h-12 grid-cols-subgrid place-items-center whitespace-nowrap rounded-t-md bg-accent px-2 py-3 font-medium">
          <div className="col-span-2 px-2">Product Name</div>
          <div className="px-2">Quantity</div>
          <div className="px-2">Price</div>
          <div className="px-2">Total</div>
        </header>
        <ul className="col-span-full grid max-h-[400px] grid-cols-subgrid overflow-y-auto overflow-x-hidden px-2 py-1">
          {!items.size && (
            <li className="col-span-full grid grid-cols-1 place-items-center py-2">
              <div>Cart's empty 😴</div>
            </li>
          )}
          {items.size > 0 &&
            Array.from(items.entries()).map(([id, quantity]) => (
              <li
                key={id}
                className="col-span-full grid grid-cols-subgrid place-items-center from-secondary via-accent to-secondary p-2 even:bg-gradient-to-r"
              >
                <div className="col-span-2 max-w-full place-self-start truncate">{products.get(id).title}</div>
                <div>{quantity}</div>
                <div>{finalPrice(products.get(id).price, products.get(id).discountedPercentage)}</div>
                <div>{finalPrice(products.get(id).price * quantity, products.get(id).discountedPercentage)}</div>
              </li>
            ))}

          {/* <li className="col-span-full grid grid-cols-subgrid place-items-center from-secondary via-background to-secondary p-2 even:bg-gradient-to-tr">
            <div className="col-span-2 max-w-full place-self-start truncate">Product</div>
            <div>2</div>
            <div>$10.00</div>
            <div>$20.00</div>
          </li> */}
        </ul>
        <footer className="col-span-full flex h-12 items-center justify-end gap-2 rounded-b-md bg-accent px-2 py-3 font-medium">
          <div className="justify-self-end">Final Price</div>
          <div className="text-xl">{finalPrice(calculateTotal())}</div>
        </footer>
      </aside>
      <div className="mt-2 flex justify-center gap-2">
        <Button extraStyles="hue-rotate-180 saturate-150" onClick={clearCart}>
          Clear Cart
        </Button>
        <Link to="/cart">
          <Button>Checkout</Button>
        </Link>
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
