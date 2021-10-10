import { useState, useEffect } from "react";
import { getPieces } from "../Services/ApiEndpoints";

const usePieces = () => {
  const [pieces, setPieces] = useState(null);

  const handleGetPieces = async () => {
    const piecesData = await getPieces();
    setPieces(piecesData);
  };

  useEffect(() => {
    handleGetPieces();
    return () => setPieces(null);
  }, []);
  return { pieces, setPieces, handleGetPieces };
};

export default usePieces;
