import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Recipe/Categories/Categories";
import CreateRecipe from "./components/Recipe/Create/Create";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import NotFound from "./components/NotFound/NotFound";

const Jumbo = lazy(() => import("./components/Administration/Jumbo/Jumbo"));
const Dashboard = lazy(() =>
  import("./components/Administration/Dashboard/Dashboard")
);
const AllCategories = lazy(() =>
  import("./components/Administration/Category/All/All")
);
const CreateCategory = lazy(() =>
  import("./components/Administration/Category/Create/Create")
);

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

        <Route
          path="/admin"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Jumbo />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="category">
            <Route
              path="all"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <AllCategories />
                </Suspense>
              }
            />

            <Route
              path="create"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <CreateCategory />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
