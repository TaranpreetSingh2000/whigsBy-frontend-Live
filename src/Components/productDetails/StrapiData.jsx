import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAllProducts,
  getProductsSearchCategory,
} from "../../_utils/GlobalApi";
import { CgSearch } from "react-icons/cg";
import { CartContext } from "../../_context/CartContext";
import Cookies from "js-cookie";

const StrapiData = ({ fetchedQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [data, setData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { priceFilter, initialData } = useContext(CartContext);

  useEffect(() => {
    const isLogin = Cookies.get("token");
    if (isLogin) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  useEffect(() => {
    if (
      searchQuery ||
      (fetchedQuery && Object.keys(priceFilter).length === 0)
    ) {
      const query = searchQuery || fetchedQuery;
      getProductsSearchCategory(query)
        .then((res) => {
          setData(res);
        })
        .catch((error) => {
          setError(error);
        });
    } else if (priceFilter && Object.keys(priceFilter).length > 0) {
      setData(priceFilter);
    } else if (initialData && Object.keys(initialData).length > 0) {
      setData(initialData);
    } else {
      getAllProducts()
        .then((res) => {
          setData(res);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [searchQuery, fetchedQuery, priceFilter, initialData]);

  if (error) {
    return (
      <div className="container flex justify-center text-xl text-gray-600">
        <div class="grid h-screen place-content-center bg-white px-4">
          <h1 class="uppercase tracking-widest text-gray-500">
            404 | Not Found
          </h1>
        </div>
      </div>
    );
  }
  const handleViewAllClick = (e) => {
    if (!isAuth) {
      e.preventDefault();
      navigate("/login");
    }
  };
  return (
    <>
      <div className="container mx-auto mb-6 p-4">
        {pathname === "/listing" && (
          <div className="flex flex-1 items-center w-full">
            <div className="w-full">
              <form className="mt-5 flex items-center border-b border-[#252e49] gap-2">
                <CgSearch size={20} className="text-gray-600" />
                <input
                  className="border-none w-full focus:outline-none"
                  placeholder="Search brands..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto mb-6">
        <div className="upperHeading flex justify-between items-center my-[30px] max-[500px]:flex-col">
          <h1 className="uppercase text-[1.5em] text-zinc-700 font-medium tracking-[0.2em] tracking-normal-[2.5em] px-[45px] max-[500px]:px-0 max-[500px]:text-2xl max-[500px]:text-center">
            {isAuth ? " GRAND GLOBAL BRANDS" : "Trending Products"}
          </h1>

          {pathname === "/" && (
            <Link
              to="/listing"
              className="text-blue-700 font-semibold hover:underline"
              onClick={handleViewAllClick}
            >
              View All Collection
            </Link>
          )}
        </div>
        {data.data && data.data.data.length === 0 ? (
          <p className="text-gray-700 text-lg flex justify-center items-center w-full">
            No products Found
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer p-3 max-[460px]:grid-cols-2">
            {data.data ? (
              data.data.data.map((product) => (
                <Link key={product.id} to={`/productDetails/${product.id}`}>
                  <div className="text-center bg-white rounded-lg h-[100%] flex flex-col items-center cursor-pointer hover:border hover:border-orange-200 hover:duration-500 ease-in-out">
                    <div className="relative">
                      <img
                        src={`${product.attributes.image.data[0].attributes.url}`}
                        alt={product?.attributes?.title}
                        className="rounded-md aspect-[4/4] object-contain"
                      />
                      {product?.attributes?.delivery && (
                        <span className="absolute right-0 top-0 bg-green-500 text-white px-2 py-1 text-xs rounded-tl-lg">
                          Instant Delivery
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col mt-2 p-2 max-[460px]:text-sm">
                      <p className="text-md font-semibold">
                        {product?.attributes?.title.split(" ")[0]}
                      </p>
                      <h2 className="text-md hover:text-orange-500 hover:underline max-[500px]:min-h-0">
                        {product.attributes.title.slice(0, 50)}...
                      </h2>
                    </div>

                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-black text-md py-0.5 font-semibold font-[Arial] max-[460px]:text-sm">
                        ₹{product.attributes.price}
                      </p>
                      <span className="text-gray-800 mb-2 text-sm">
                        ₹
                        <span className="line-through">
                          {product?.attributes.mrp}
                        </span>
                      </span>
                      <span className="text-orange-500 font-semibold mb-2 text-md font-[sans-serif] tracking-wide max-[460px]:text-sm">
                        {product?.attributes.discount}% off
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <div className="bg-white rounded-lg cursor-pointer flex justify-center flex-col items-center mx-5">
                  <div className="h-[250px] w-[270px] bg-slate-200 animate-pulse rounded-lg max-[500px]:w-[160px] max-[500px]:h-[150px]"></div>
                  <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                  <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                </div>
                <div className="bg-white rounded-lg cursor-pointer w-[100%] flex justify-center flex-col items-center">
                  <div className="h-[250px] w-[270px] bg-slate-200 animate-pulse rounded-lg max-[500px]:w-[160px] max-[500px]:h-[150px]"></div>
                  <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                  <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                </div>
                <div className="bg-white rounded-lg cursor-pointer w-[100%] flex justify-center flex-col items-center">
                  <div className="h-[250px] w-[270px] bg-slate-200 animate-pulse rounded-lg max-[500px]:w-[160px] max-[500px]:h-[150px]"></div>
                  <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                  <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                </div>
                <div className="bg-white rounded-lg cursor-pointer w-[100%] flex justify-center flex-col items-center">
                  <div className="h-[250px] w-[270px] bg-slate-200 animate-pulse rounded-lg max-[500px]:w-[160px] max-[500px]:h-[150px]"></div>
                  <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                  <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                  <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2 max-[500px]:w-[140px] max-[500px]:h-[30px]"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StrapiData;
