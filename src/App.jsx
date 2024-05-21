import React, { useState, lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Signup from "./Components/auth/signup/Signup";
import Login from "./Components/auth/login/Login";
import Layout from "./Components/layout/Layout";
import Protected from "./Components/services/Protected.jsx";
import Admin from "./Components/auth/admin/Admin.jsx";
import AdminProtected from "./Components/services/AdminProtected.jsx";
import { CartContext } from "./_context/CartContext.js";
import { ToastContainer } from "react-toastify";
import Home from "./Components/home/Home.jsx";

// Lazy load components
const Dashboard = lazy(() =>
  import("./Components/ProductsListing/ProductsListing.jsx")
);

const AboutUs = lazy(() => import("./Components/about/AboutUs.jsx"));
const Page = lazy(() => import("./cartPage/Page.jsx"));
const SuccessPopup = lazy(() =>
  import("./Components/successPage/SuccessPopup.jsx")
);
const Contact = lazy(() => import("./Components/contact/Contact.jsx"));
const ProductDetails = lazy(() =>
  import("./Components/productDetails/ProductDetails.jsx")
);
const CategoriesPage = lazy(() =>
  import("./Components/category/CategoriesPage.jsx")
);
const Cart = lazy(() => import("./Components/cart/Cart.jsx"));
const Wishlist = lazy(() => import("./Components/wishlist/Wishlist.jsx"));

const ShopCategoriesDetails = lazy(() =>
  import("./Components/productDetails/ShopCategoriesDetails.jsx")
);
const ManageProducts = lazy(() =>
  import("./Components/adminDashboard/manageProducts/ManageProducts.jsx")
);
const Users = lazy(() => import("./Components/adminDashboard/Users.jsx"));
const AdminCart = lazy(() =>
  import("./Components/adminDashboard/AdminCart.jsx")
);
const Checkout = lazy(() => import("./Components/checkout/Checkout.jsx"));
const Customers = lazy(() =>
  import("./Components/adminDashboard/Customers.jsx")
);
const Orders = lazy(() => import("./Components/adminDashboard/Orders.jsx"));

const Profile = lazy(() => import("./Components/profile/Profile.jsx"));

const AdminDashboard = lazy(() =>
  import("./Components/adminDashboard/AdminDashboard.jsx")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="category"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CategoriesPage />
            </Suspense>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route
          path="listing"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Protected Component={Dashboard} />
            </Suspense>
          }
        />
        <Route
          path="productDetails/:productId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/categoryDetails/:categoryname"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Protected Component={ShopCategoriesDetails} />
            </Suspense>
          }
        />
        <Route
          path="/categoryDetails/:productId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Protected Component={ProductDetails} />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Protected Component={Wishlist} />
            </Suspense>
          }
        />
        <Route
          path="checkout"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Protected Component={Checkout} />
            </Suspense>
          }
        />
        <Route
          path="/page"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Protected Component={Page} />
            </Suspense>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Protected Component={SuccessPopup} />
            </Suspense>
          }
        />
        <Route
          path="admindashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminProtected Component={AdminDashboard} />
            </Suspense>
          }
        >
          <Route
            path="manageproducts"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ManageProducts />
              </Suspense>
            }
          />
          <Route
            path="user"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="admincart"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminCart />
              </Suspense>
            }
          />
          <Route
            path="customer"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Customers />
              </Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="contact"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Contact />
            </Suspense>
          }
        />
      </Route>
    </>
  )
);

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWistlist] = useState([]);
  const [priceFilter, setPriceFilter] = useState({});
  const [initialData, setInitialData] = useState({});

  return (
    <>
      <ToastContainer autoClose={1000} />
      <CartContext.Provider
        value={{
          cart,
          setCart,
          wishlist,
          setWistlist,
          priceFilter,
          setPriceFilter,
          initialData,
          setInitialData,
        }}
      >
        <RouterProvider router={router} />
      </CartContext.Provider>
    </>
  );
}

export default App;
