import InfiniteScroll from "react-infinite-scroll-component";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { ProductItem } from "../types";

export const WithReactScroll = ({
  products,
  fetchData,
  totalProducts,
}: {
  products: ProductItem[];
  fetchData: (page: number) => Promise<void>;
  totalProducts: number;
}) => {
  const [page, setPage] = useState(1);

  const handleLoadMoreData = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage);
      return nextPage;
    });
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={handleLoadMoreData}
      hasMore={totalProducts > products.length}
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <div className="products-list">
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
