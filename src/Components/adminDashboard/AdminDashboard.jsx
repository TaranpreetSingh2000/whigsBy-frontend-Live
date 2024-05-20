import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-200 ">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-gray-100 flex-shrink-0 w-64">
          <div className="flex flex-col h-full">
            {/* Sidebar Content */}
            <div className="flex flex-col flex-grow p-4">
              <h2 className="text-2xl font-semibold">Admin Panel</h2>
              <nav className="mt-6">
                <Link
                  to="/admindashboard/orders"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Orders
                </Link>
                <Link
                  to="/admindashboard/manageproducts"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Products
                </Link>
                <Link
                  to="/admindashboard/customer"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Customers
                </Link>
                <Link
                  to="/admindashboard/user"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Users
                </Link>
                {/* <Link
                  to="/admindashboard/admincart"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Cart
                </Link> */}
              </nav>
            </div>
          </div>
        </aside>
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
