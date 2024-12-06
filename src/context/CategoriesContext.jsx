import { useEffect, useState, createContext, useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export const CategoriesContext = createContext(false);

export default function CategoriesProvider({ children }) {
  const [products] = useContext(ProductsContext);
  const [categories, setCategories] = useState(new Map());

  useEffect(() => {
    if (!products.size) return;
    // categoriesMap devuelve un Map con la key siendo el slug de la categoría y un objeto con el nombre de la categoría y el array de productos
    // siendo el resultado: Map { key:"category-name", value: { name: "Category Name", products: [Producto, Producto, ...]}, ... } //
    const categoriesMap = new Map(
      Object.entries(Object.groupBy(Array.from(products.values()), (product) => product.category)).map(([slug, products]) => [
        slug,
        { name: formatString(slug), products: products },
      ]),
    );
    setCategories(categoriesMap);
  }, [products]);

  return <CategoriesContext.Provider value={[categories, setCategories]}>{children}</CategoriesContext.Provider>;
}

function formatString(input) {
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
