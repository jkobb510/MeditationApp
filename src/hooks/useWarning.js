import { useState } from "react";

export default function useWarning() {
  const [warning, setWarning] = useState("");

  const clearWarning = () => {
    if (warning) setWarning("");
  };

  return { warning, setWarning, clearWarning };
}
