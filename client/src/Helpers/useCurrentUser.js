import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserRef = useRef(null);
  const existingJWT = localStorage.getItem("token");

  const getCurrentUser = (jwt) => {
    try {
      let currentUserData = jwtDecode(jwt ? jwt : existingJWT);
      setCurrentUser(currentUserData);
      currentUserRef.current = currentUserData;
    } catch (ex) {}
  };

  useEffect(() => {
    getCurrentUser();
    return () => {
      setCurrentUser(null);
    };
  }, []);

  return { currentUser, setCurrentUser, getCurrentUser, existingJWT, currentUserRef };
};

export default useCurrentUser;
