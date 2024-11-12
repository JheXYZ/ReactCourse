import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./views/ItemDetailContainer";
import AboutUsContainer from "./views/AboutUsContainer";
import ItemListContainer from "./views/ItemListContainer";

function App() {
  return (
    <section className="grid min-h-screen grid-rows-[auto_minmax(0,1fr)_auto] bg-background text-text">
      <BrowserRouter>
        <Header />
        <main className="my-2 rounded-3xl border border-secondary border-x-transparent py-2">
          <Routes>
            <Route exact path="/" element={<ItemListContainer />} />
            <Route exact path="/category/:id" element={<ItemListContainer />} />
            <Route exact path="/item/:id" element={<ItemDetailContainer />} />
            <Route exact path="/about-us" element={<AboutUsContainer />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </section>
  );
}

export default App;
