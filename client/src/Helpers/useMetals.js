import { useState, useEffect } from "react";
import { getMetals } from "../Services/ApiEndpoints";

const useMetals = () => {
  const [metals, setMetals] = useState(null);

  const handleGetMetals = async () => {
    const metalsData = await getMetals();
    setMetals(metalsData);
  };

  useEffect(() => {
    handleGetMetals();
    return () => {
      setMetals(null);
    };
  }, []);
  return { metals, setMetals, handleGetMetals };
};

export default useMetals;
