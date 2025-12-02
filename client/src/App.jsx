import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Recipe/Categories/Categories";
import All from "./components/Recipe/All/All";
import Details from "./components/Recipe/Details/Details";
import CreateRecipe from "./components/Recipe/Create/Create";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Loader from "./components/Loader/Loader";

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
const AllRecipes = lazy(() =>
  import("./components/Administration/Recipe/All/All")
);

// todo add RouteGuard

function App() {
  const { pathname } = useLocation();

  const isHome = () => {
    return pathname === "/";
  };

  return (
    <AuthProvider>
      <Header isHome={isHome()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe">
          <Route path="categories" element={<Categories />} />
          <Route path=":categoryId" element={<All />} />
          <Route path=":categoryId/:recipeId" element={<Details />} />
          <Route path="create" element={<CreateRecipe />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <Jumbo />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="category">
            <Route
              path="all"
              element={
                <Suspense fallback={<Loader />}>
                  <AllCategories />
                </Suspense>
              }
            />

            <Route
              path="create"
              element={
                <Suspense fallback={<Loader />}>
                  <CreateCategory />
                </Suspense>
              }
            />
          </Route>

          <Route path="recipe">
            <Route
              path="all"
              element={
                <Suspense fallback={<Loader />}>
                  <AllRecipes />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
