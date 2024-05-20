import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminProtected = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = Cookies.get("Admintoken");
    if (isLogin) {
      setIsAuth(true);
    } else {
      navigate("/");
      setIsAuth(false);
    }
  }, [isAuth]);

  return (
    <>
      {isAuth && (
        <div>
          <Component />
        </div>
      )}
    </>
  );
};

export default AdminProtected;
