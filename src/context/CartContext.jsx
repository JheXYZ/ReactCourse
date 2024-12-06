import { useEffect, useState, createContext } from "react";
import { getProductById } from "../firebase/firebase";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useState(new Map(getFromLocalStorage("cartItems")));

  async function addToCart(productID, quantity = 1) {
    const itemQuantity = items.get(productID) || 0;
    const response = await getProductById(productID);

    if (response.errorMessage) return false;
    if (itemQuantity + quantity <= response.product.stock) {
      setItems(items.set(productID, itemQuantity + quantity));
      setToLocalStorage("cartItems", Array.from(items.entries()));
      return true;
    }
    return false;
  }

  function clearCart() {
    setItems(new Map());
    localStorage.removeItem("cartItems");
  }

  useEffect(() => {
    setItems(new Map(getFromLocalStorage("cartItems")));
  }, []);

  return <CartContext.Provider value={[items, setItems, addToCart, clearCart]}>{children}</CartContext.Provider>;
}

/**
 * @param {string} key
 * @returns { [[string, number]] | [] }
 */
function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
}

/**
 * @param {string} key
 * @param {number} value
 */
function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
