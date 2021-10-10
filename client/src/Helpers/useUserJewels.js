import { useState, useEffect } from "react";
import { getUserJewels } from "../Services/ApiEndpoints";

const useUserJewels = (currentUserRef) => {
  const [userJewels, setUserJewels] = useState(null);

  const handleGetUserJewels = async () => {
    let data = await getUserJewels(currentUserRef.current._id);
    setUserJewels(data.data);
  };

  useEffect(() => {
    handleGetUserJewels();
    return () => {
      setUserJewels(null);
    };
  }, []);
  return { userJewels, setUserJewels };
};

export default useUserJewels;
