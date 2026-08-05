import { useCallback, useState } from "react";

export const usePinDigitInput = (length: number) => {
  const [input, setInput] = useState("");

  const reset = useCallback(() => setInput(""), []);

  const handlePressDigit = useCallback(
    (digit: string) => {
      setInput((prev) => (prev.length >= length ? prev : prev + digit));
    },
    [length],
  );

  const handleBackspace = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  return { input, handlePressDigit, handleBackspace, reset };
};
