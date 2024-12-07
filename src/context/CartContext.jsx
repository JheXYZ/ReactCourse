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

  function updateCart(id, quantity) {
    setItems(items.set(id, quantity));
    setToLocalStorage("cartItems", Array.from(items.entries()));
  }

  function deleteItem(id) {
    setItems(new Map(Array.from(items.entries()).filter(([key]) => key !== id)));
    setToLocalStorage("cartItems", Array.from(items.entries()));
  }

  useEffect(() => {
    setToLocalStorage("cartItems", Array.from(items.entries()));
  }, [items]);

  return <CartContext.Provider value={[items, setItems, addToCart, clearCart, updateCart, deleteItem]}>{children}</CartContext.Provider>;
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
