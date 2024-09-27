import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setpage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    setpage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span key={prod.id} className="product__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : " "}
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
