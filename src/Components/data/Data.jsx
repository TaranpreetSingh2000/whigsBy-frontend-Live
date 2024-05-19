import React, { useEffect, useState } from "react";

const Data = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section bg-cover bg-center text-white text-center relative">
      <div className="">
        <img
          src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1605&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background Image"
          className="w-full"
        />
        <div
          className={`absolute top-[11%] left-[0%] flex justify-center items-center transition-opacity ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 1s ease-in-out" }}
        >
          <div className="container mx-auto p-2">
            <h1 className="text-7xl uppercase font-bold mb-6 text-white max-[500px]:text-3xl max-[400px]:text-xl max-[400px]:mb-2">
              Welcome to Our E-commerce Store
            </h1>
            <p className="text-2xl max-[400px]:text-lg">
              Discover the best products at the best prices.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Data;
