import ProductCard from "./ProductCard";

export default function ProductsListContainer({ listOfProducts = [] }) {
  return (
    <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-2 overflow-hidden px-2 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {listOfProducts.map((product) => (
        <li key={product.title + "-" + product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
