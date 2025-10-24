// useIsCompact.ts
import { useEffect, useState } from "react";

export function useIsCompact(query = "(max-width: 800px)") {
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setIsCompact(e.matches);
    setIsCompact(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [query]);
  return isCompact;
}
