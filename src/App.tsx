import { useEffect, useState } from "react";
import { ProductItem } from "./types";
import { FromScratch } from "./components/FromScratch";
import { WithReactScroll } from "./components/WithReactScroll";
import { WithReactWindow } from "./components/WithReactWindow";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products/?limit=10&skip=${(page - 1) * 10}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts((prevItems) => [...prevItems, ...data.products]);
        page === 1 && setTotalProducts(() => data.total);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    let subscribed = true;
    (async () => {
      if (subscribed) {
        await fetchData(1);
      }
    })();

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <div>
      {/* <FromScratch
        products={products}
        fetchData={fetchData}
        loading={loading}
        error={error}
      /> */}
      {/* <WithReactScroll
        products={products}
        fetchData={fetchData}
        totalProducts={totalProducts}
      /> */}
      <WithReactWindow
        products={products}
        fetchData={fetchData}
        totalProducts={totalProducts}
        loading={loading}
      />
    </div>
  );
}

export default App;
