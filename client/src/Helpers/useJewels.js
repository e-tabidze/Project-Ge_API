import { useState, useEffect } from "react";
import { getJewels } from "../Services/ApiEndpoints";

const useJewels = () => {
  const [jewels, setJewels] = useState(null);

  const handleGetJewels = async () => {
    const data = await getJewels();
    setJewels(data);
    console.log(data, "DATA USEJEWELS");
  };

  useEffect(() => {
    handleGetJewels();
    return () => {
      setJewels(null);
    };
  }, []);
  console.log(jewels, "JEWELS USEJEWELS");
  return { jewels, setJewels, handleGetJewels };
};

export default useJewels;
