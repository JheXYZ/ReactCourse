import Button from "./Button";
import { Link } from "react-router-dom";
import { IconShoppingCartPlus } from "@tabler/icons-react";

export default function ProductCard({ product }) {
  return (
    <article className="h-full w-full rounded-xl border-2 border-accent p-3 shadow-md backdrop-brightness-90 transition hover:bg-secondary hover:shadow-accent">
      <div className="cursor-default">
        <div className="cursor-pointer overflow-hidden rounded-md">
          <Link to={`/item/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              className="transition-transform hover:scale-105"
            />
          </Link>
        </div>
        <div>
          <Link to={`/item/${product.id}`}>
            <h2 className="font-medium text-gray-400 transition-colors hover:cursor-pointer hover:text-text hover:underline sm:text-lg">
              {product.title}
            </h2>
          </Link>
          <small>
            <span className="text-gray-400">Category: </span>
            <Link
              to={`/category/${product.category}`}
              className="text-sm text-accent hover:cursor-pointer hover:underline"
            >
              {product.category}
            </Link>
          </small>
        </div>
        <div>
          <h3 className="text-lg text-text sm:text-2xl">{formatPrice(product.price)}</h3>
        </div>
      </div>
      <footer className="mt-1 flex justify-center">
        <div className="transition-transform hover:scale-105 active:scale-100">
          <Button onClick={() => alert("Added to Cart (WIP)")}>
            <IconShoppingCartPlus />
          </Button>
        </div>
      </footer>
    </article>
  );
}

function formatPrice(price) {
  return price.toLocaleString("es-AR", { style: "currency", currency: "USD" });
}
