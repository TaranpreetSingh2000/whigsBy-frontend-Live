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

const getProductsById = async (id) =>
  await axiosClient.get(
    "/products/" + id + "?populate=* &pagination[limit]=25"
  );

const getProductsSearchCategory = async (query) =>
  await axiosClient.get(
    "/products?filters[categories][Name][$containsi]=" + query + "&populate=*"
  );

const getProductsPriceFilter = async (min, max, category, rating) => {
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

  return await axiosClient.get(baseUrl);
};

const getProductsRatingFilter = async (rating) =>
  await axiosClient.get(
    "/products?filters[rating][$gte]=" +
      rating +
      "&filters[rating][$lte]=" +
      (rating === 3 ? 4 : 5) +
      "&populate=*"
  );

const getCategories = async () => await axiosClient.get("/categories");
// add to cart function
const addtoCart = async (data) =>
  await axiosClient.post("/carts", data, "&pagination[limit]=100");

// Get user cart items
const getUserCartItems = async (email) =>
  await axiosClient.get(
    "/carts?populate[products][populate][0]=image&&filters[email][$eq]=" +
      email +
      "&pagination[limit]=50"
  );

// delete cartItems
const deleteCartItems = async (id) => await axiosClient.delete("/carts/" + id);

// filter products by categories

const getProductsByCategories = async (category) =>
  await axiosClient.get(
    "/products?filters[category][$containsi]=" + category + "&populate=*"
  );

// whishlist Products

const addtoWhistlist = async (data) =>
  await axiosClient.post("/whistlists", data, "&pagination[limit]=50");

// get wishlist Item

const getUserWishlistItem = async (email) =>
  await axiosClient.get(
    "/whistlists?populate[products][populate][0]=image&&filters[email][$eq]=" +
      email +
      "&pagination[limit]=25"
  );

// delete wishlist Item

const deleteWishlistItem = async (id) =>
  await axiosClient.delete("/whistlists/" + id);

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
