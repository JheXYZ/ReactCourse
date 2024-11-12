import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader/Loading";
import { IconRosetteDiscountFilled, IconShoppingCartPlus } from "@tabler/icons-react";
import Button from "./../components/Button";
import ItemCount from "./../components/ItemCount";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(1);

  const BASE_URL = "https://dummyjson.com";
  const URL_PRODUCT = `/products/${id}`;

  function handleChange(event) {
    let value = event.target.value;

    if (value > product.stock) value = product.stock;
    else if (value < 1) value = 1;

    setSelectedStock(value);
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}${URL_PRODUCT}`);
        if (!response.ok) throw new Error(`Error al obtener el producto: ${response.statusText}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading)
    return (
      <div className="grid h-full w-full place-content-center">
        <div className="scale-[300%] opacity-50">
          <Loading />
        </div>
      </div>
    );
  else if (!product) return <h2>Product not found</h2>;

  return (
    <article className="relative mx-auto grid max-w-screen-xl grid-rows-[auto_1fr] gap-4 p-2 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:grid-rows-1">
      <div className="rounded-md border border-accent bg-secondary bg-opacity-30 p-4 text-text">
        <div className="max-w-2xl justify-self-center">
          <img
            src={product?.images[0]}
            alt={"Image of " + product.title}
            loading="lazy"
            className="max-h-[650px] min-h-96"
          />
        </div>
      </div>
      <div className="order-1">
        <hr className="mb-4 mt-2 border-secondary" />
        <div className="rounded-md border border-accent p-4">
          <h3 className="text-xl">Description</h3>
          <p className="ml-2">{product.description}</p>
        </div>
        {/* <div className="h-screen"></div> */}
      </div>
      <aside className="top-2 flex h-fit flex-col gap-4 rounded-md border border-accent bg-secondary bg-opacity-30 p-4 sm:sticky">
        <h1 className="text-4xl text-text">{product.title}</h1>
        <div>
          {product.discountPercentage > 0 && (
            <div className="flex w-fit items-center gap-1 rounded-md bg-secondary px-2 py-1 text-text">
              <span className="mr-2 inline-block text-sm text-gray-200 line-through">{formatPrice(product.price)}</span>
              <span className="text-lg font-medium text-text">{product.discountPercentage}</span>
              <IconRosetteDiscountFilled size={30} />
            </div>
          )}
          <h2 className="text-3xl font-medium text-text">{finalPrice(product.price, product.discountPercentage)}</h2>
        </div>
        <div>
          <h3 className="text-gray-400">
            Stock: <span>{product.stock}</span>
          </h3>
          <div className="flex items-center justify-between gap-2">
            <ItemCount
              text="Buy quantity"
              value={selectedStock}
              min={1}
              max={product.stock}
              step={1}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-2">
          <Button widening extraStyles={"px-9"} onClick={() => alert("Buy Pressed (WIP)")}>
            Buy
          </Button>
          <Button onClick={() => alert("Added to Cart (WIP)")} extraStyles={"px-9"}>
            <IconShoppingCartPlus />
          </Button>
        </div>
      </aside>
    </article>
  );
}

function finalPrice(price, discount) {
  return formatPrice(applyDiscount(price, discount));
}

function applyDiscount(price, discount) {
  return ((100 - discount) / 100) * price;
}

function formatPrice(price) {
  return Intl.NumberFormat("es-AR", { style: "currency", currency: "USD" }).format(price);
}
