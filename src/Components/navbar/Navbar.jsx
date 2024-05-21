import React, { useEffect, useState, useRef, useContext } from "react";
import logo from "../../../public/whigsBy.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { GoHeart } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";
import { CartContext } from "../../_context/CartContext";
import Cart from "../cart/Cart";
import { getUserCartItems, getUserWishlistItem } from "../../_utils/GlobalApi";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [user, setUser] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart, wishlist, setWistlist } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const email = localStorage.getItem("Email");
  const name = localStorage.getItem("Name");
  localStorage.setItem("Wishlist", JSON.stringify(wishlist));
  localStorage.setItem("CartItems", JSON.stringify(cart));

  useEffect(() => {
    if (email) {
      getCartItem();
      getWishlistItem();
      setUser(name);
    }
  }, [email]);

  const getCartItem = () => {
    getUserCartItems(email).then((res) => {
      const result = res.data.data;
      if (result) {
        setCart(
          result.map((prod) => ({
            id: prod?.id,
            products: prod.attributes.products.data,
          }))
        );
      }
    });
  };

  const getWishlistItem = () => {
    getUserWishlistItem(email).then((res) => {
      const result = res.data.data;
      if (result) {
        setWistlist(
          result.map((prod) => ({
            id: prod?.id,
            products: prod.attributes.products.data,
          }))
        );
      }
    });
  };
  useEffect(() => {
    const isLogin = Cookies.get("token");
    const isAdminLogin = Cookies.get("Admintoken");

    if (isLogin) {
      setIsAuth(true);
    } else if (isAdminLogin) {
      setIsAdminAuth(true);
    } else {
      setIsAuth(false);
      setIsAdminAuth(false);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("loginEmail");
    localStorage.removeItem("Email");
    localStorage.removeItem("Name");
    setIsMenuOpen(false);
    toast.success("Logout Successfully ");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleAdminLogout = () => {
    Cookies.remove("Admintoken");
    localStorage.removeItem("Email");
    localStorage.removeItem("Name");
    toast.success("Logout Successfully ");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto p-2.5 max-[365px]:flex-col max-[365px]:items-center max-[365px]:justify-center">
          <div>
            <Link to="/">
              <img
                src={logo}
                className="w-auto h-[80px] cursor-pointer"
                alt="Logo"
              />
            </Link>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="text-black flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  className="block py-2 px-3 text-[#1f3167] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="block py-2 px-3 text-[#1f3167] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-[#1f3167] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 "
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {isAuth || isAdminAuth ? (
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="flex flex-row items-center">
                <div className="relative" ref={menuRef}>
                  <button
                    className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none cursor-pointer"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen ? "true" : "false"}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="rounded-full p-2 m-2 text-blue-800 border border-blue-800"
                    />
                  </button>

                  {isMenuOpen && (
                    <ul className="absolute text-black z-[1000] float-left m-0 w-[150px] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-surface-dark right-0 mt-2 h-30">
                      <li>
                        <Link
                          to="/profile"
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-md font-normal text-black hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none"
                          onClick={toggleMenu}
                        >
                          My Profile
                        </Link>
                      </li>

                      {isAdminAuth ? (
                        <a
                          className="block px-4 w-full whitespace-nowrap bg-white py-2 text-md font-normal text-black hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none  cursor-pointer"
                          onClick={handleAdminLogout}
                        >
                          Logged out Admin
                        </a>
                      ) : (
                        <Link
                          to="/admin"
                          className="block px-4 w-full whitespace-nowrap bg-white py-2 text-md font-normal text-black hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none cursor-pointer"
                          onClick={toggleMenu}
                        >
                          Login Admin
                        </Link>
                      )}

                      <li>
                        {isAuth ? (
                          <a
                            href="#"
                            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-md font-normal text-black hover:bg-zinc-200/60 "
                            onClick={handleLogout}
                          >
                            Logout
                          </a>
                        ) : (
                          <Link
                            to="/login"
                            className="block px-4 w-full whitespace-nowrap bg-white py-2 text-md font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none  cursor-pointer"
                            onClick={toggleMenu}
                          >
                            Login User
                          </Link>
                        )}
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center items-end cursor-pointer">
                <div
                  className="flex items-center relative"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <BsCart2 className="text-[25px]" />
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 text-white text-sm px-[6px] py-[0.4px]">
                    {cart?.length}
                  </span>
                </div>

                <div>
                  <Link to="/wishlist">
                    <GoHeart className="text-2xl" />
                  </Link>
                </div>
              </div>
              {openCart && isAuth ? <Cart /> : null}
              {(isAuth || isAdminAuth) && (
                <div className="profileSection max-[500px]:hidden">
                  <ul>
                    <li>
                      <strong>{user && `Welcome, ${user}`}</strong>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link
                class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                to="/login"
              >
                <span class="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    class="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span class="text-sm font-medium transition-all group-hover:ms-4">
                  Login
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
