import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Protected = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = Cookies.get("token");
    if (isLogin) {
      setIsAuth(true);
    } else {
      navigate("/");
      setIsAuth(false);
    }
  }, [isAuth]);

  return <>{isAuth && <Component />}</>;
};

export default Protected;
