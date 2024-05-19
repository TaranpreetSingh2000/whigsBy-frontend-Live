import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByCategories } from "../../../_utils/GlobalApi";
import { BallTriangle } from "react-loader-spinner";

const ShopCategoriesDetails = () => {
  // const fetchCart = useCart();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryname } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getCateogoryProducts(categoryname);
  }, [categoryname]);

  const getCateogoryProducts = (categoryname) => {
    getProductsByCategories(categoryname).then((res) => {
      window.scrollTo(0, 0);
      setCategoryDetails(res.data.data);
      setLoading(false);
    });
  };

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
  }

  // const onAddToCartClick = (id, item) => {
  //   const data = {
  //     data: {
  //       email: email,
  //       products: id,
  //     },
  //   };
  //   fetchCart(data, {
  //     // format in for access the data in cart
  //     productData: item,
  //   });
  //   if (!toast.isActive(14, "cart")) {
  //     toast("Product Added successfully", {
  //       position: "top-right",
  //       autoClose: true,
  //       closeOnClick: true,
  //       draggable: false,
  //       type: "success",
  //       toastId: 14,
  //     });
  //   }
  // };

  return (
    <>
      {categoryDetails &&
        categoryDetails.map((item, index) => (
          <Link key={index} to={`/productDetails/${item.id}`}>
            <div
              className="border p-4 flex m-5 max-[500px]:flex-col max-[500px]:items-center "
              key={index}
            >
              <div className="flex w-40">
                <img
                  src={item?.attributes?.image?.data[0]?.attributes?.url}
                  alt={item?.attributes?.title}
                  className=" w-full object-contain"
                />
              </div>

              <div className="flex flex-col px-4">
                <h2 className="text-md font-semibold hover:text-orange-500 hover:underline">
                  {item?.attributes?.title}
                </h2>
                <div className="w-[130px]">
                  <button className="text-white bg-red-700 text-left px-2 py-0.5 rounded-[4px] font-semibold mb-2 text-sm">
                    {item?.attributes?.offer}
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red-500 mb-2 text-2xl">
                    {item?.attributes.discount}% off
                  </span>
                  <p className="text-black mb-2 text-3xl">
                    <sup className="text-xl mt-[20px] leading-0">₹</sup>
                    {item.attributes.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 mb-2 text-md font-serif">
                    M.R.P: ₹
                    <span className="line-through">
                      {item?.attributes?.mrp}
                    </span>
                  </span>
                </div>
              </div>
              {/* <div className="flex gap-2">
                <span>
                  <BsCart2
                    className="text-2xl cursor-pointer"
                    onClick={() => onAddToCartClick(item?.id, item)}
                  />
                </span>
              </div> */}
            </div>
          </Link>
        ))}
    </>
  );
};

export default ShopCategoriesDetails;
