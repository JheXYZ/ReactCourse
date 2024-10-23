import NavBar from "./NavBar";
import CartWidget from "./CartWidget";
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="flex min-h-20 w-screen justify-center px-3 py-2">
      <div className="flex w-full max-w-screen-xl flex-col items-center justify-between gap-1">
        <section className="flex w-full items-center justify-between gap-2">
          <img src={logo} alt="logo of the store" className="h-20 rounded-md" />
          <CartWidget quantity={13} />
        </section>
        <NavBar />
      </div>
    </header>
  );
}
