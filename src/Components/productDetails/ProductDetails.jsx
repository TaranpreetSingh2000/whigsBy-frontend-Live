import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BallTriangle } from "react-loader-spinner";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { getProductsByCategories } from "../../_utils/GlobalApi";
import "react-toastify/dist/ReactToastify.css";
import CategoryProducts from "./CategoryProducts";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { BsCartCheckFill } from "react-icons/bs";
import { FaHeartCircleCheck } from "react-icons/fa6";
import StarRating from "../ratings/StarRating";
import Cookies from "js-cookie";

const ProductDetails = () => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const { productId } = useParams();
  const fetchCart = useCart();
  const fetchWishlist = useWishlist();
  const [isAuth, setIsAuth] = useState(false);
  const [filterdata, setFilterData] = useState({});
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState("");
  const email = localStorage.getItem("Email");
  const WishlistItems = JSON.parse(localStorage.getItem("Wishlist")) || [];
  const CartItems = JSON.parse(localStorage.getItem("CartItems")) || [];
  const { response, loading, error } = useFetch(
    `https://whigsby-live-server.onrender.com/api/products/${productId}?populate=*`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setFilterData(response);
    if (response?.data?.data?.attributes?.category) {
      getProductsByCategories(response.data.data.attributes.category).then(
        (res) => {
          setCategoryDetails(res);
        }
      );
    }
  }, [response]);

  useEffect(() => {
    const isLogin = Cookies.get("token");
    if (isLogin) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  useEffect(() => {
    let isWishlistItem = false;
    let isCartItem = false;

    if (WishlistItems.some((item) => item.products.id === Number(productId))) {
      isWishlistItem = true;
    }

    if (CartItems.some((item) => item.products.id === Number(productId))) {
      isCartItem = true;
    }

    setIsAddedToWishlist(isWishlistItem);
    setIsAddedToCart(isCartItem);

    if (isWishlistItem && isCartItem) {
      setIsAddedToWishlist(true);
      setIsAddedToCart(true);
    }
  }, [CartItems, WishlistItems, isAddedToCart, productId, isAddedToWishlist]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] p-5">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#00008B"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  } else if (error) {
    return (
      <div className="container flex justify-center text-xl text-gray-600 my-6 ">
        <div className="flex flex-col items-center font-serif opacity-[0.9]">
          <p className="text-center">Oh, something went wrong!!</p>
          <p>
            We couldn't fetch the data due to some technical error. It happens,
            just try again after a couple of minutes.
          </p>
        </div>
      </div>
    );
  }

  const data = {
    data: {
      email: email,
      products: filterdata?.data?.data?.id,
    },
  };

  const onAddToCartClick = () => {
    if (isAuth) {
      setIsAddedToCart(true);
      fetchCart(data, {
        productData: filterdata?.data?.data,
      });
    } else {
      navigate("/login");
    }
  };

  const onAddToWhishlistClick = () => {
    if (isAuth) {
      setIsAddedToWishlist(true);
      fetchWishlist(data, {
        productData: filterdata?.data?.data,
      });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="pt-4 px-6">
        <Breadcrumb pathname={pathname} />
        <div className="flex justify-center p-4 mb-6 max-[500px]:flex-col">
          <div className="w-1/2 flex flex-col items-center justify-center gap-5 max-[500px]:w-full">
            <div className=" hover:translate-y-[-9px] transition-all duration-500 ease-in-out">
              <img
                src={`${filterdata?.data?.data?.attributes?.image.data[0].attributes.url}`}
                alt={filterdata?.data?.data?.attributes?.title}
                style={{ mixBlendMode: "darken" }}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col pt-5 max-[500px]:w-full">
            <h2 className="text-3xl font-semibold mb-2 max-[500px]:text-xl">
              {filterdata?.data?.data?.attributes?.title}
            </h2>

            <div className="flex items-center gap-3 my-1">
              <button className="text-white bg-red-700 text-left px-2 py-0.5 rounded-[4px] font-semibold text-sm">
                {filterdata?.data?.data?.attributes?.offer}
              </button>

              <h2 className="text-black flex items-center gap-2">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="text-green-500 text-[22px]"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Eligible for Instant Delivery
              </h2>
            </div>

            <div className="flex items-center gap-1 my-1">
              <span className="text-red-500 mb-2 text-xl">
                {filterdata?.data?.data?.attributes.discount}% off
              </span>
              <p className="text-black mb-2 text-2xl">
                <sup className="text-lg mt-[20px] leading-0">₹</sup>
                {filterdata?.data?.data?.attributes.price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 mb-2 text-md font-[Arial]">
                M.R.P: ₹
                <span className="line-through">
                  {filterdata?.data?.data?.attributes?.mrp}
                </span>
              </span>
            </div>

            <div className="flex gap-1 text-gray-500 text-md font-[Arial]">
              Rating:
              <StarRating rating={filterdata?.data?.data?.attributes?.rating} />
            </div>

            <div className="flex items-center gap-2 my-2 text-gray-500 mb-2 text-md font-[Arial]">
              Category:
              <p className="text-gray-500 text-md uppercase">
                {filterdata?.data?.data?.attributes?.category}
              </p>
            </div>

            <div className="flex items-center">
              {isAddedToCart ? (
                <button
                  className="bg-white  text-md text-blue-700 border border-blue-600 px-5 py-2 mr-2 rounded-md flex items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  disabled
                >
                  <span>
                    <BsCartCheckFill className="text-xl max-[430px]:text-sm" />
                  </span>
                  Added to Cart
                </button>
              ) : (
                <button
                  className="bg-blue-600  text-md text-white px-5 py-2 mr-2 rounded-md flex items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  onClick={onAddToCartClick}
                >
                  <span>
                    <BsCart2 className="text-xl max-[430px]:text-sm" />
                  </span>
                  Add to Cart
                </button>
              )}

              {isAddedToWishlist ? (
                <button
                  className="bg-white  text-md text-blue-700 border border-blue-600 px-5 py-2 rounded-md flex justify-center items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  disabled
                >
                  <span>
                    <FaHeartCircleCheck className=" text-xl max-[430px]:text-sm" />
                  </span>
                  Added to Wishlist
                </button>
              ) : (
                <button
                  className="bg-blue-600  text-md text-white px-5 py-2 rounded-md flex justify-center items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  onClick={onAddToWhishlistClick}
                >
                  <span>
                    <AiOutlineHeart className="text-xl max-[430px]:text-sm" />
                  </span>
                  Add to Wishlist
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="categories">
          <CategoryProducts categoryDetails={categoryDetails} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
