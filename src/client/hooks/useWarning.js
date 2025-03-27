// src/hooks/useWarning.js
import { useState } from "react";

const useWarning = () => {
  const [warning, setWarning] = useState("");

  const clearWarning = () => setWarning("");
  const setShortSessionWarning = () => setWarning("Session must be at least 10 seconds to be logged.");

  return { warning, clearWarning, setShortSessionWarning };
};

export default useWarning;
