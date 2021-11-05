import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserRef = useRef(null);
  const existingJWT = localStorage.getItem("token");

  let getCurrentUser = (jwt) => {
    try {
      let currentUserData = jwtDecode(jwt ? jwt : existingJWT);
      console.log(currentUserData, "[IBIOMAW]")
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

  useEffect(() => {
    console.log(currentUser, "AXUIEW");
  }, [currentUser])
  return { currentUser, setCurrentUser, getCurrentUser, existingJWT, currentUserRef };
};

export default useCurrentUser;
