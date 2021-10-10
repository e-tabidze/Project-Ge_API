import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserRef = useRef(null);
  const jwt = localStorage.getItem("token");

  const getCurrentUser = () => {
    try {
      let currentUserData = jwtDecode(jwt);
      console.log(currentUserData, " Current User")
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
  return { currentUser, setCurrentUser, getCurrentUser, jwt, currentUserRef };
};

export default useCurrentUser;
