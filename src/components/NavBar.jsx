import { useState } from "react";
import categoriesJSON from "../data/categories.json";

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!isOpen);
  }

  return (
    <section className="flex flex-col gap-2">
      <nav>
        <ul className="flex justify-center gap-2 text-text">
          <li className="rounded-lg border border-secondary border-x-transparent px-2 py-1 font-bold transition hover:border-y-primary hover:underline">
            <a href="/">Home</a>
          </li>
          <li className="rounded-lg border border-secondary border-x-transparent px-2 py-1 font-bold transition hover:border-y-primary">
            <button className="hover:underline" onClick={toggleOpen}>
              Categorias
            </button>
          </li>
          <li className="rounded-lg border border-secondary border-x-transparent px-2 py-1 font-bold transition hover:border-y-primary hover:underline">
            <a href="#">Nosotros</a>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <div>
          <ul className="flex flex-wrap justify-center gap-3">
            {categoriesJSON.map((category) => (
              <li key={category.name} className="">
                <details className="relative">
                  <summary className="cursor-pointer text-nowrap rounded-lg bg-secondary px-2 py-1 font-medium [userSelect:none]">
                    {category.name}
                  </summary>
                  <ul className="absolute z-10 mt-2 flex w-max flex-col gap-1 rounded-lg bg-primary bg-opacity-90 p-2 font-medium text-background">
                    {category.subcategories.map((subcategory, index) => (
                      <>
                        <li key={subcategory.name}>
                          <a
                            href={`/categories/${subcategory.name.toLowerCase().replaceAll(" ", "-")}`}
                          >
                            {subcategory.name}
                          </a>
                        </li>
                        {index !== category.subcategories.length - 1 && (
                          <li>
                            <hr className="opacity-50" />
                          </li>
                        )}
                      </>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
