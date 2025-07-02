// hooks/useScrollProgress.ts
import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollProgress(delay = 1000) {
  const [scroll, setScroll] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollValue = (totalScroll / windowHeight) * 100;

    setScroll(scrollValue);

    if (scrollValue > 1) {
      setIsScrolling(true);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    }
  }, [delay]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [handleScroll]);

  return { scroll, isScrolling };
}
