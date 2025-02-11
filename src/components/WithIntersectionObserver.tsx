import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductItem } from "../types";

export const WithIntersectionObserver = ({
  products,
  fetchData,
  error,
  loading,
}: {
  products: ProductItem[];
  fetchData: (page: number) => Promise<void>;
  error: null | Error;
  loading: boolean;
}) => {
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchData(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <>
      <div className="products-list">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div ref={observerTarget}></div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </>
  );
};
