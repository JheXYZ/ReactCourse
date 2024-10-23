import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";
function App() {
  return (
    <section className="text-text bg-background grid min-h-screen grid-rows-[auto_minmax(0,1fr)_auto]">
      <Header />
      <MainContainer />
      <Footer />
    </section>
  );
}

export default App;
