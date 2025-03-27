// src/hooks/useWarning.js
import { useState } from "react";

const useWarning = () => {
  const [warning, setWarning] = useState("");

  const clearWarning = () => setWarning("");
  const setShortSessionWarning = () => setWarning("");

  return { warning, clearWarning, setShortSessionWarning };
};

export default useWarning;
