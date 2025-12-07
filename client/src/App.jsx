import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import UserRoute from "./components/Routes/UserRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import GuestRoute from "./components/Routes/GuestRoute";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Recipe/Categories/Categories";
import Favourite from "./components/Recipe/Favourite/Favourite";
import Search from "./components/Recipe/Search/Search";
import All from "./components/Recipe/All/All";
import Details from "./components/Recipe/Details/Details";
import CreateRecipe from "./components/Recipe/Create/Create";
import AllNotes from "./components/Note/All/All";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Logout from "./components/Logout/Logout";
import Loader from "./components/Loader/Loader";
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

const EditCategory = lazy(() =>
  import("./components/Administration/Category/Edit/Edit")
);

const AllRecipes = lazy(() =>
  import("./components/Administration/Recipe/All/All")
);

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

        <Route element={<UserRoute />}>
          <Route path="/recipe">
            <Route path="categories" element={<Categories />} />
            <Route path="favourites" element={<Favourite />} />
            <Route path="search" element={<Search />} />
            <Route path=":categoryName/:categoryId" element={<All />} />
            <Route path=":recipeId" element={<Details />} />
            <Route path="create" element={<CreateRecipe />} />
          </Route>
          <Route path="/notes" element={<AllNotes />} />
          <Route path="/auth/logout" element={<Logout />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/auth">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
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

              <Route
                path="edit/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <EditCategory />
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
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;
