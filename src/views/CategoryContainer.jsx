import { useState, useEffect } from "react";
import ProductsListContainer from "../components/ProductsList";
import Loading from "../components/Loader/Loading";

export default function CategoryContainer({ id }) {
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = "https://dummyjson.com";
  const URL_CATEGORY = `/products/category/${id}`;

  useEffect(() => {
    const fetchProductsOfCategory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}${URL_CATEGORY}`);
        if (!response.ok) throw new Error(`Error al obtener los productos de la categoría: ${response.statusText}`);
        const data = await response.json();
        setProductsOfCategory(data?.products);
      } catch (error) {
        console.error("Error al obtener los productos de la categoría:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsOfCategory();
  }, [id]);

  if (isLoading)
    return (
      <div className="grid h-full w-full place-content-center">
        <div className="scale-[300%] opacity-50">
          <Loading />
        </div>
      </div>
    );
  else if (!productsOfCategory.length) return <h2>No se encontraron productos</h2>;

  return (
    <section className="mx-auto max-w-screen-xl">
      <ProductsListContainer listOfProducts={productsOfCategory} />
    </section>
  );
}
