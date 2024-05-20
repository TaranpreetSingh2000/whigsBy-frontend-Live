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
                        {product.attributes.title.slice(0, 80)}...
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
