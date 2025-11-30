import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Recipe/Categories/Categories";
import CreateRecipe from "./components/Recipe/Create/Create";
import CreateCategory from "./components/Administration/Category/Create/Create";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
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
        <Route path="/recipe">
          <Route path="categories" element={<Categories />} />
          <Route path="create" element={<CreateRecipe />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin">
          <Route path="category">
            <Route path="create" element={<CreateCategory />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
