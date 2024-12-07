import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./views/ItemDetailContainer";
import AboutUsContainer from "./views/AboutUsContainer";
import ItemListContainer from "./views/ItemListContainer";
import CartContainer from "./views/CartContainer";
import ProductsProvider from "./context/ProductsContext";
import CategoriesProvider from "./context/CategoriesContext";
import CartProvider from "./context/CartContext";
import UserProvider from "./context/UserContext";
import OrdersContainer from "./views/OrdersContainer";

function App() {
  return (
    <section className="grid min-h-screen grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-background text-text">
      <BrowserRouter>
        <ProductsProvider>
          <CategoriesProvider>
            <UserProvider>
              <CartProvider>
                <Header />
                <main className="my-2 rounded-3xl border border-secondary border-x-transparent py-2">
                  <Routes>
                    <Route exact path="/" element={<ItemListContainer />} />
                    <Route exact path="/category/:id" element={<ItemListContainer />} />
                    <Route exact path="/item/:id" element={<ItemDetailContainer />} />
                    <Route exact path="/about-us" element={<AboutUsContainer />} />
                    <Route exact path="/cart" element={<CartContainer />} />
                    <Route exact path="/user/orders" element={<OrdersContainer />} />
                  </Routes>
                </main>
              </CartProvider>
            </UserProvider>
          </CategoriesProvider>
        </ProductsProvider>
        <Footer />
      </BrowserRouter>
    </section>
  );
}

export default App;
