import axios from "axios";

const apiKey = import.meta.env.VITE_PUBLIC_REST_API_KEY;
const axiosClient = axios.create({
  baseURL: "https://whigsby-live-server.onrender.com/api",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getAllProducts = async () =>
  await axiosClient.get("/products?populate=* &pagination[limit]=25");

const getProductsById = (id) =>
  axiosClient.get("/products/" + id + "?populate=* &pagination[limit]=100");

const getProductsSearchCategory = (query) =>
  axiosClient.get(
    "/products?filters[categories][Name][$containsi]=" + query + "&populate=*"
  );

const getProductsPriceFilter = (min, max, category, rating) => {
  let baseUrl = "/products?";

  if (category) {
    baseUrl += `filters[categories][Name][$containsi]=${category}&`;
  }

  if (min !== undefined && max !== undefined) {
    baseUrl += `filters[price][$gte]=${min}&filters[price][$lte]=${max}&`;
  }

  if (rating) {
    const upperLimit = rating === 3 ? 4 : 5;
    baseUrl += `filters[rating][$gte]=${rating}&filters[rating][$lte]=${upperLimit}&`;
  }

  baseUrl += "populate=*";

  return axiosClient.get(baseUrl);
};

const getProductsRatingFilter = (rating) =>
  axiosClient.get(
    "/products?filters[rating][$gte]=" +
      rating +
      "&filters[rating][$lte]=" +
      (rating === 3 ? 4 : 5) +
      "&populate=*"
  );

const getCategories = () => axiosClient.get("/categories");
// add to cart function
const addtoCart = (data) =>
  axiosClient.post("/carts", data, "&pagination[limit]=100");

// Get user cart items
const getUserCartItems = (email) =>
  axiosClient.get(
    "/carts?populate[products][populate][0]=image&&filters[email][$eq]=" +
      email +
      "&pagination[limit]=100"
  );

// delete cartItems
const deleteCartItems = (id) => axiosClient.delete("/carts/" + id);

// filter products by categories

const getProductsByCategories = (category) =>
  axiosClient.get(
    "/products?filters[category][$containsi]=" + category + "&populate=*"
  );

// whishlist Products

const addtoWhistlist = (data) =>
  axiosClient.post("/whistlists", data, "&pagination[limit]=100");

// get wishlist Item

const getUserWishlistItem = (email) =>
  axiosClient.get(
    "/whistlists?populate[products][populate][0]=image&&filters[email][$eq]=" +
      email +
      "&pagination[limit]=100"
  );

// delete wishlist Item

const deleteWishlistItem = (id) => axiosClient.delete("/whistlists/" + id);

const getCustomerLoginId = () =>
  axiosClient.get(
    "https://whigsby-live-server.onrender.com/api/carts?filters[email][$contains]=com"
  );

export {
  getAllProducts,
  addtoCart,
  getProductsById,
  getUserCartItems,
  deleteCartItems,
  getProductsByCategories,
  addtoWhistlist,
  getUserWishlistItem,
  deleteWishlistItem,
  getCustomerLoginId,
  getProductsSearchCategory,
  getCategories,
  getProductsPriceFilter,
  getProductsRatingFilter,
};
