import { useState, useEffect } from "react";
import { getJewel } from "../Services/ApiEndpoints";
import { useLocation } from "react-router-dom";

const useJewel = () => {
  const [jewel, setJewel] = useState(null);
  const location = useLocation();

  const handleGetJewel = async () => {
    let jewelId = window.location.pathname.split("/")[2];
    let jewelData = await getJewel(jewelId);
    setJewel(jewelData);
  };

  useEffect(() => {
    handleGetJewel();
    return () => {
      setJewel(null);
    };
  }, [location.pathname]);

  return { jewel, setJewel, handleGetJewel };
};

export default useJewel;
