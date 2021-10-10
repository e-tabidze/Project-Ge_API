import { useState, useEffect } from "react";
import { getStones } from "../Services/ApiEndpoints";

const useStones = () => {
  const [stones, setStones] = useState(null);

  const handleGetStones = async () => {
    const stonesData = await getStones();
    setStones(stonesData);
  };

  useEffect(() => {
    handleGetStones();
    return () => setStones(null);
  }, []);
  return { stones, setStones, handleGetStones };
};

export default useStones;
