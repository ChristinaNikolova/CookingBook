import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Create from "./components/Recipe/Create/Create";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const { pathname } = useLocation();

  const isHome = () => {
    return pathname === "/";
  };

  return (
    <>
      <Header isHome={isHome()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/create" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
