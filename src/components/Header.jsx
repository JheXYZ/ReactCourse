import NavBar from "./NavBar";
import CartWidget from "./CartWidget";
import logo from "../assets/logo.svg";
import { IconUser, IconUserExclamation } from "@tabler/icons-react";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../firebase/firebase";
import { UserContext } from "../context/UserContext";
import Button from "./Button";
import { useContext } from "react";

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // the filter gets rid of the empty strings, such as [[""], [""]] so it results in [] or in a path like [["category"], ["nameOfCategory"]]
    const newPath = location.pathname.split("/").filter((item) => item);
    const pathMap = new Map([
      ["category", "Category"],
      ["item", "Product"],
      ["about-us", "About Us"],
      ["cart", "Cart"],
    ]);
    setTitle(pathMap.get(newPath[0]) || "Ultra Store");
  }, [location]);

  async function handleLogin(e) {
    e.preventDefault();
    const response = await loginUser({ email: email, password: password });
    if (response.errorMessage) alert(response.errorMessage);
    else {
      alert("Logged in: " + response.user.id);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <header className="flex min-h-20 w-screen justify-center px-3 py-2">
      <div className="flex w-full max-w-screen-xl flex-col items-center justify-between gap-1">
        <section className="flex w-full items-center justify-between gap-2">
          <img src={logo} alt="logo of the store" className="h-20 rounded-md" />
          <h2 className="text-xl text-text sm:text-2xl">{title}</h2>
          <div className="flex items-center gap-2">
            <details className="relative">
              <summary className="inline-block cursor-pointer select-none">
                {!user && <IconUserExclamation size={35} />}
                {user && <IconUser size={35} />}
              </summary>
              <div className="absolute right-0 min-w-28 rounded-md bg-secondary p-2">
                {!user && (
                  <>
                    <p className="text-xl text-text">Please Login</p>
                    <form className="ml-1" onSubmit={handleLogin}>
                      <label>
                        E-mail
                        <input
                          type="email"
                          placeholder="email@email.com"
                          onChange={(e) => setEmail(e.target.value)}
                          className="rounded-sm px-2 py-1"
                          required
                        />
                      </label>
                      <label>
                        Password
                        <input required type="password" className="rounded-sm px-2 py-1" onChange={(e) => setPassword(e.target.value)} />
                      </label>
                      <div className="mt-2 flex justify-center">
                        <Button submit>Login</Button>
                      </div>
                    </form>
                  </>
                )}
                {user && (
                  <>
                    <p className="text-nowrap text-gray-200">
                      Welcome <span className="text-xl font-semibold text-text">{user.userName}</span>
                    </p>
                    <ul className="">
                      <li className="ml-2 cursor-pointer hover:underline">
                        <Link to="/user/orders">My Orders</Link>
                      </li>
                    </ul>
                    <div className="mt-2 flex justify-center">
                      <Button onClick={handleLogout} extraStyles="text-sm hue-rotate-180 saturate-150">
                        Logout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </details>
            <CartWidget />
          </div>
        </section>
        <NavBar />
      </div>
    </header>
  );
}
