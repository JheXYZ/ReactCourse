import { useEffect, useState, createContext } from "react";
import { getAllProducts } from "../firebase/firebase";

export const ProductsContext = createContext(null);

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState(new Map());

  useEffect(() => {
    // const limit = 8;
    getAllProducts({ orderByParam: "category" }).then(({ products: productsFB, errorMessage }) => {
      if (!errorMessage)
        setProducts(
          productsFB.reduce((acc, product) => {
            acc.set(product.id, product);
            return acc;
          }, new Map()),
        );
    });
  }, []);

  function updateProducts(updatedProducts) {
    updatedProducts.forEach((product) => {
      setProducts(products.set(product.id, product));
    });
  }

  return <ProductsContext.Provider value={[products, setProducts, updateProducts]}>{children}</ProductsContext.Provider>;
}
