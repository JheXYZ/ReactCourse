import { useState, useEffect, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import Greetings from "./Greetings.jsx";
import ProductsListContainer from "./ProductsList.jsx";
import Loading from "./Loader/Loading.jsx";
import Button from "./Button";
import { ProductsContext } from "../context/ProductsContext";

export default function HomeContainer() {
  const [productList] = useContext(ProductsContext);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(new Map());
  const [maxProducts, setMaxProducts] = useState(1);
  const [limitProducts, setLimitProducts] = useState(8);

  const isLastPage = currentPage === Math.ceil(maxProducts / limitProducts);
  const isFirstPage = currentPage === 1;

  function handleChangeLimit(event) {
    console.log(event.target.value);
    let value = parseInt(event.target.value);
    setLimitProducts(value);
    setPages(new Map());
    setCurrentPage(1);
  }

  function handlePageUp() {
    if (currentPage < maxProducts / limitProducts) setCurrentPage(currentPage + 1);
  }

  function handlePageDown() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  useEffect(() => {
    if (maxProducts != productList.size) setMaxProducts(productList.size);
    if (!pages.has(currentPage) || !pages.get(currentPage).length)
      setPages(pages.set(currentPage, Array.from(productList.values()).slice((currentPage - 1) * limitProducts, currentPage * limitProducts)));
    setCurrentProducts(pages.get(currentPage));
  }, [currentPage, limitProducts, productList]);

  if (productList.size === 0)
    return (
      <div className="grid h-[500px] w-full place-content-center">
        <div className="scale-[300%] opacity-50">
          <Loading />
        </div>
      </div>
    );
  else if (!currentProducts) return <h2>No se encontraron productos</h2>;

  return (
    <>
      <div className="flex flex-col items-center pb-3">
        <h1 className="text-2xl text-text sm:text-4xl">Ultra Store</h1>
        <Greetings message="¡Te doy la bievenida a mi tienda! 👋" />
      </div>
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-2">
        <div className="flex w-fit items-center gap-2 rounded-md bg-secondary px-2 py-1">
          <Button onClick={handlePageDown} disabled={isLoading || isFirstPage}>
            <IconArrowNarrowLeft />
          </Button>
          <span className="px-2 py-1 text-lg font-medium text-text">
            {currentPage}/{Math.ceil(maxProducts / limitProducts)}
          </span>
          <Button onClick={handlePageUp} disabled={isLoading || isLastPage}>
            <IconArrowNarrowRight />
          </Button>
          <div>
            <label>
              <span>Limit: </span>
              <select value={limitProducts} onChange={handleChangeLimit} className="rounded-md px-2 py-1 font-medium">
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
            </label>
          </div>
        </div>
        <ProductsListContainer listOfProducts={currentProducts} />{" "}
        <div className="flex w-fit items-center gap-2 rounded-md bg-secondary px-2 py-1">
          <Button onClick={handlePageDown} disabled={isLoading || isFirstPage}>
            <IconArrowNarrowLeft />
          </Button>
          <span className="px-2 py-1 text-lg font-medium text-text">
            {currentPage}/{Math.ceil(maxProducts / limitProducts)}
          </span>
          <Button onClick={handlePageUp} disabled={isLoading || isLastPage}>
            <IconArrowNarrowRight />
          </Button>
          <div>
            <label>
              <span>Limit: </span>
              <select value={limitProducts} onChange={handleChangeLimit} className="rounded-md px-2 py-1 font-medium">
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
