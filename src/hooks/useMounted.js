import { useEffect, useState } from "react";

/** false en SSR y en el primer render del cliente (hidratación estable); true después de montar. */
export default function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
