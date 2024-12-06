import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import { IconShoppingCartPlus } from "@tabler/icons-react";
import Button from "./Button";

export default function AddToCart({ productID, quantity = 1, children }) {
  const [, , addToCart] = useContext(CartContext);

  function handleCLick() {
    const response = addToCart(productID, quantity);
    if (!response) alert("Product not available");
  }
  return <Button onClick={handleCLick}>{children || <IconShoppingCartPlus />}</Button>;
}
