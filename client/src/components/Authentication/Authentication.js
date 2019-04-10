import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";

export const AuthContext = React.createContext();

const Authentication = (props) => {
  const [userData, setUserData] = useState({
    id: '1',
    name: '1',
    email: '1',
    token: null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = decode(token);
        const currentTime = Math.floor(new Date().getTime() / 1000);

        if (currentTime > decodedToken.exp) {
          localStorage.removeItem("token");
          props.history.push("/login");
        } else {
          setUserData({
            id: decodedToken.id,
            name: decodedToken.name,
            email: decodedToken.email,
            token
          });
          setIsLoggedIn(true);
        }
      } catch (err) {
        props.history.push("/login");
      }
    } else {
      setUserData({ id: null, name: null, email: null, token: null });
      setIsLoggedIn(false);
      props.history.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{userData, isLoggedIn}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(Authentication);
