import { useState, useEffect, useContext } from "react";
import ProductsListContainer from "../components/ProductsList";
import Loading from "../components/Loader/Loading";

import { CategoriesContext } from "../context/CategoriesContext";

export default function CategoryContainer({ id }) {
  const [categories, setCategories] = useContext(CategoriesContext);
  const [productsOfCategory, setProductsOfCategory] = useState(null);

  useEffect(() => {
    if (!categories.has(id)) return setProductsOfCategory(null);
    setProductsOfCategory(categories.get(id).products);
  }, [id]);

  if (!productsOfCategory) return <h2>No se encontraron productos</h2>;

  return (
    <section className="mx-auto max-w-screen-xl">
      <ProductsListContainer listOfProducts={productsOfCategory} />
    </section>
  );
}
