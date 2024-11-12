import NavBar from "./NavBar";
import CartWidget from "./CartWidget";
import logo from "../assets/logo.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    // the filter gets rid of the empty strings, such as [[""], [""]] so it results in [] or in a path like [["category"], ["nameOfCategory"]]
    const newPath = location.pathname.split("/").filter((item) => item);
    const pathMap = new Map([
      ["category", "Category"],
      ["product", "Product"],
      ["products", "Products"],
      ["about-us", "About Us"],
    ]);

    setTitle(pathMap.get(newPath[0]) || "Ultra Store");
  }, [location]);

  return (
    <header className="flex min-h-20 w-screen justify-center px-3 py-2">
      <div className="flex w-full max-w-screen-xl flex-col items-center justify-between gap-1">
        <section className="flex w-full items-center justify-between gap-2">
          <img src={logo} alt="logo of the store" className="h-20 rounded-md" />
          <h2 className="text-xl text-text sm:text-2xl">{title}</h2>
          <CartWidget />
        </section>
        <NavBar />
      </div>
    </header>
  );
}
