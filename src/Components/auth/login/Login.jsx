import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../authStyle/Auth.module.css";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import Cookies  from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://whigsby-backend-live.onrender.com/api/users/auth",
        loginData
      );

      if (response.status === 201) {
        Cookies.set('token', response.data.token, { expires: 7, secure: true })
        localStorage.setItem("Email", loginData.email);
        localStorage.setItem('Name', response.data.name)
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setIcon(eye);
      setPasswordType("text");
      return;
    }
    setIcon(eyeOff);
    setPasswordType("password");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-[4rem]">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
            Log In
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className={style.inputWithIcon}>
                <input
                  name="password"
                  type={passwordType}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
                <span className={style.icon} onClick={togglePassword}>
                  <Icon icon={icon} size={20} />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div>
                <Link
                  to=""
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
