import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { ProductCard } from "./ProductCard";
import { ProductItem } from "../types";

export const WithReactWindow = ({
  fetchData,
  products,
  totalProducts,
  loading,
}: {
  products: ProductItem[];
  fetchData: (page: number) => Promise<void>;
  totalProducts: number;
  loading: boolean;
}) => {
  const [page, setPage] = useState(1);

  const hasNextPage = totalProducts > products.length;

  const handleLoadMoreData = () => {
    if (loading) return;
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage);
      return nextPage;
    });
  };

  const isItemLoaded = (index: number) => !hasNextPage || index < products.length;
  const Row = ({ index, style }: { index: number, style: { [key:string]:any } }) => {
    return (
      <div style={style}>
        {isItemLoaded(index) ? (
          <ProductCard product={products[index]} />
        ) : (
          "Loading..."
        )}
      </div>
    );
  };
  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasNextPage ? products.length + 1 : products.length}
      loadMoreItems={handleLoadMoreData}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={window.innerHeight}
          itemCount={products.length}
          itemSize={600}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={450}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};
