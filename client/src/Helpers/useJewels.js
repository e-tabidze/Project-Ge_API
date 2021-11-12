import { useState, useEffect } from "react";
import { getJewels } from "../Services/ApiEndpoints";

const useJewels = () => {
  const [jewels, setJewels] = useState(null);

  const handleGetJewels = async () => {
    const data = await getJewels();
    setJewels(data);
  };

  useEffect(() => {
    handleGetJewels();
    return () => {
      setJewels(null);
    };
  }, []);
  return { jewels, setJewels };
};

export default useJewels;
