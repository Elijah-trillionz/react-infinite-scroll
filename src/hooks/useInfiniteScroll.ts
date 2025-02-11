import { useEffect, useState } from "react";

const debounce = (func: (args: any) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(args);
    }, delay);
  };
};

export const useInfiniteScroll = (fetchData: (page: number) => Promise<void>) => {
  const [page, setPage] = useState(1);

  const handleScroll = debounce(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 300;

    if (bottom) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
