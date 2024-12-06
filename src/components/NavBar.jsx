import { Link } from "react-router-dom";
import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

export default function NavBar() {
  const [categories] = useContext(CategoriesContext);

  return (
    <section className="flex w-full flex-col gap-2">
      <nav className="relative">
        <ul className="flex justify-center gap-2 text-text">
          <li
            key="home"
            className="select-none place-self-center rounded-lg border border-secondary border-x-transparent px-2 py-1 font-bold transition hover:border-y-primary hover:underline"
          >
            <Link to="/">Home</Link>
          </li>
          <li
            key="categories"
            className="flex justify-center place-self-center rounded-lg border border-secondary border-x-transparent px-2 py-1 font-bold transition hover:border-y-primary"
          >
            <details className="z-10">
              <summary className="inline-block cursor-pointer select-none">Categories</summary>
              <ul className="absolute left-1/2 grid max-h-96 w-max max-w-screen-sm -translate-x-1/2 translate-y-5 grid-cols-1 justify-center gap-1 overflow-scroll rounded-lg bg-secondary bg-opacity-60 p-1 text-text shadow-md backdrop-blur-sm min-[425px]:grid-cols-2 sm:grid-cols-3">
                {categories.size === 0 && <li className="px-2 py-1 font-normal text-gray-400">No categories found</li>}
                {categories &&
                  Array.from(categories.entries()).map(([slug, category]) => (
                    <li key={slug} className="px-2 py-1">
                      <Link
                        to={`/category/${slug}`}
                        className="inline-block w-full rounded-md border border-primary bg-secondary px-2 py-1 transition hover:scale-x-105 hover:shadow-md hover:shadow-accent"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </details>
          </li>
          <li
            key="products"
            className="select-none place-self-center rounded-lg border border-secondary border-x-transparent px-2 py-1 font-bold transition hover:border-y-primary hover:underline"
          >
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
