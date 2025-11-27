import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import NotFound from "./NotFound/NotFound";
import styles from "./App.module.css";

function App() {
  const { pathname } = useLocation();

  const getStyles = () => {
    return pathname === "/" ? styles["home-wrapper"] : "";
  };

  return (
    <>
      <div className={getStyles()}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
