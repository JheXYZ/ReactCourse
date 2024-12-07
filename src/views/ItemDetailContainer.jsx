import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconRosetteDiscountFilled } from "@tabler/icons-react";
import Button from "./../components/Button";
import ItemCount from "./../components/ItemCount";
import { ProductsContext } from "../context/ProductsContext";
import { getProductById } from "../firebase/firebase";
import Loading from "./../components/Loader/Loading";
import AddToCart from "../components/AddToCart";
import { CartContext } from "../context/CartContext";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productsList] = useContext(ProductsContext);
  const [items, , addToCart] = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedStock, setSelectedStock] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    let value = parseInt(event.target.value);
    if (value > product.stock) value = product.stock;
    else if (value <= 0) value = 1;
    setSelectedStock(value);
  }

  async function handleBuy() {
    setIsLoading(true);
    if (!items.has(id)) if (!(await addToCart(id, selectedStock))) return alert("Product not available or not enough stock");
    setIsLoading(false);
    navigate("/cart");
  }

  useEffect(() => {
    if (productsList.has(id)) setProduct(productsList.get(id));
    else getProductById(id).then(({ product, errorMessage }) => !errorMessage && setProduct(product));
  }, [id]);

  if (productsList.size === 0)
    return (
      <div className="grid h-[500px] w-full place-content-center">
        <div className="scale-[300%] opacity-50">
          <Loading />
        </div>
      </div>
    );
  else if (!product) return <h2>Product not found</h2>;

  return (
    <article className="relative mx-auto grid max-w-screen-xl grid-rows-[auto_1fr] gap-4 p-2 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:grid-rows-1">
      <div className="rounded-md border border-accent bg-secondary bg-opacity-30 p-4 text-text">
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <img src={product?.images[0]} alt={"Image of " + product.title} loading="lazy" className="max-h-[650px]" />
        </div>
      </div>
      <div className="order-1">
        <hr className="mb-4 mt-2 border-secondary" />
        <div className="rounded-md border border-accent p-4">
          <h3 className="text-xl">Description</h3>
          <p className="ml-2">{product.description}</p>
        </div>
      </div>
      <aside className="top-2 flex h-fit flex-col gap-4 rounded-md border border-accent bg-secondary bg-opacity-30 p-4 sm:sticky">
        <h1 className="text-4xl text-text">{product.title}</h1>
        <div>
          {product.discountedPercentage > 0 && (
            <div className="flex w-fit items-center gap-1 rounded-md bg-secondary px-2 py-1 text-text">
              <span className="mr-2 inline-block text-sm text-gray-200 line-through">{formatPrice(product.price)}</span>
              <span className="text-lg font-medium text-text">{product.discountedPercentage}</span>
              <IconRosetteDiscountFilled size={30} />
            </div>
          )}
          <h2 className="text-3xl font-medium text-text">{finalPrice(product.price, product.discountedPercentage)}</h2>
        </div>
        <div>
          <h3 className="text-gray-400">
            Stock: <span>{product.stock}</span>
          </h3>
          <div className="flex items-center gap-2">
            <ItemCount slider text="Buy quantity" value={selectedStock} min={1} max={product.stock} step={1} onChange={handleChange} />
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-2">
          <Button widening extraStyles={"px-9"} onClick={handleBuy} disabled={isLoading}>
            Buy
          </Button>
          <AddToCart productID={id} quantity={selectedStock} />
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
