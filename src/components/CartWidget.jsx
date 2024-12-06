import { IconShoppingCart } from "@tabler/icons-react";
import CartModal from "./CartModal";
import { CartContext } from "../context/CartContext";
import { useState, useContext, useEffect } from "react";

export default function CartWidget() {
  const [items, setItems] = useContext(CartContext);
  const [isOpen, setOpen] = useState(false);

  function handleToggleCart() {
    setOpen(!isOpen);
  }

  return (
    <div className="relative flex h-11 w-11 justify-end">
      <button onClick={handleToggleCart}>
        <IconShoppingCart size={40} stroke={1.5} />
        {items.size > 0 && (
          <small className="absolute bottom-0 left-0 grid size-7 place-content-center rounded-full bg-secondary bg-opacity-90 p-2 text-base font-medium text-text [userSelect:none]">
            {items.size}
          </small>
        )}
      </button>
      {isOpen && <CartModal />}
    </div>
  );
}
