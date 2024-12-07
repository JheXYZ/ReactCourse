import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import { IconShoppingCartPlus } from "@tabler/icons-react";
import Button from "./Button";

export default function AddToCart({ productID, quantity = 1, children }) {
  const [, , addToCart] = useContext(CartContext);

  async function handleCLick() {
    const response = await addToCart(productID, quantity);
    if (!response) alert("Product not available or not enough stock\nYou may already have this product in your cart");
  }
  return <Button onClick={handleCLick}>{children || <IconShoppingCartPlus />}</Button>;
}
