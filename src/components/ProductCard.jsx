import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { IconRosetteDiscountFilled, IconShoppingCartPlus } from "@tabler/icons-react";

export default function ProductCard({ product, addToCart = true }) {
  return (
    <article className="h-full w-full rounded-xl border-2 border-accent p-3 shadow-md backdrop-brightness-90 transition hover:bg-secondary hover:shadow-accent">
      <div className="cursor-default">
        <div className="cursor-pointer overflow-hidden rounded-md">
          <Link to={`/item/${product.id}`}>
            <img src={product.thumbnail} alt={product.title} loading="lazy" className="transition-transform hover:scale-105" />
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
            <Link to={`/category/${product.category}`} className="text-sm text-accent hover:cursor-pointer hover:underline">
              {product.category}
            </Link>
          </small>
        </div>
        <div>
          {product.discountedPercentage > 0 && (
            <div className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-tr from-secondary to-accent px-2 py-1 text-text">
              <span className="mr-2 inline-block text-sm text-gray-200 line-through">{formatPrice(product.price)}</span>
              <span className="text-lg font-medium text-text">{product.discountedPercentage}</span>
              <IconRosetteDiscountFilled size={30} />
            </div>
          )}
          <h3 className="text-lg text-text sm:text-2xl">{finalPrice(product.price, product.discountedPercentage)}</h3>
        </div>
      </div>
      {addToCart && (
        <footer className="mt-1 flex justify-center">
          <div className="transition-transform hover:scale-105 active:scale-100">
            <AddToCart productID={product.id}>
              <IconShoppingCartPlus />
            </AddToCart>
          </div>
        </footer>
      )}
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
  return price.toLocaleString("es-AR", { style: "currency", currency: "USD" });
}
