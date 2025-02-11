import { ProductCard } from "./ProductCard";
import { ProductItem } from "../types";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const FromScratch = ({
  products,
  fetchData,
  loading,
  error,
}: {
  products: ProductItem[];
  fetchData: (page: number) => Promise<void>;
  loading: boolean;
  error: null | Error;
}) => {
  useInfiniteScroll(fetchData);

  return (
    <div>
      <div className="products-list">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};
