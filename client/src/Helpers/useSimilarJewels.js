import { useState, useEffect } from "react";
import { getSimilarJewels } from "../Services/ApiEndpoints";

const useSimilarJewels = (jewel) => {
  const [similarJewels, setSimilarJewels] = useState(null);

  const handleGetSimilarJewels = async () => {
    let data = await getSimilarJewels(jewel.piece._id);
    setSimilarJewels(data);
  };

  useEffect(() => {
    console.log(jewel);
    if (jewel) {
      handleGetSimilarJewels();
    }
    return () => {
      setSimilarJewels(null);
    };
  }, [jewel]);
  return { similarJewels };
};

export default useSimilarJewels;
