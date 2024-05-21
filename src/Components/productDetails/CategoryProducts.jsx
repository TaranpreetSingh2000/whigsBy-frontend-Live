import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const CategoryProducts = ({ categoryDetails }) => {
  return (
    <>
      <div className="container mx-auto p-10 max-[500px]:p-4">
        <h3 className="text-xl font-semibold font-[Arial] mb-4">
          Similar Products
        </h3>

        {categoryDetails ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {categoryDetails?.data?.data &&
              categoryDetails?.data?.data.map((product) => (
                <Link
                  key={product.id}
                  to={`/productDetails/${product.id}`}
                  className="flex justify-center"
                >
                  <div className="bg-white rounded-lg h-[100%] flex flex-col items-center cursor-pointer hover:border hover:border-orange-300">
                    <div>
                      <img
                        src={`${product.attributes.image.data[0].attributes.url}`}
                        alt={product?.attributes?.title}
                        className="rounded-md object-contain aspect-[4/4]"
                        style={{ mixBlendMode: "darken" }}
                      />
                    </div>

                    <div className="p-2 px-4">
                      <h2 className="text-md text-[#54a0ad] font-semibold mb-1 hover:text-orange-500 hover:underline">
                        {product.attributes.title.slice(0, 74)}...
                      </h2>

                      <div className=" flex gap-3 gap-y-[5px]">
                        <span className="text-white font-[Arial] font-bold bg-red-700 mb-2 text-sm px-2 py-1 tracking-wide">
                          {product?.attributes.discount}% off
                        </span>
                        <button className="text-red-700 text-left py-0.5 rounded-[4px] font-bold mb-2 text-sm">
                          {product?.attributes.offer}
                        </button>
                      </div>
                      <p className="text-black mb-2 text-2xl">
                        ₹{product.attributes.price}
                        <span>
                          <sup className="text-sm px-0.2 font-sans">00</sup>
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 mb-2 text-md">
                          List: ₹
                          <span className="line-through">
                            {product?.attributes.mrp}.00
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 my-2 text-gray-500 text-md font-serif">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          class="h-4 w-4"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
                        </svg>
                        <p className="text-gray-500 text-sm">
                          {product?.attributes?.category}
                        </p>
                      </div>

                      <div className="categorySign flex items-center">
                        <TiTick className="text-yellow-500 text-xl" />
                        <span className="text-sm text-blue-700 font-semibold font-[Amazon Ember]">
                          whigsBy
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center ">No Products Available</p>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
