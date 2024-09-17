import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchProducts, searchProducts } from '../api/products';
import ProductCard from './ProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [flag, setFlag] = useState(true);
  useEffect(() => {

    loadProducts();
  }, [flag]);

  const loadProducts = async () => {
    // Set a timeout to delay the API call
    setTimeout(async () => {
      const newProducts = await fetchProducts(skip);
      setProducts((prev) => [...prev, ...newProducts]);

      setSkip((prev) => prev + 20);
      if (newProducts.length < 20) setHasMore(false);
    }, 700);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Only perform a search if the search term is not empty
    if (newSearchTerm === "") {
      setHasMore(true);

    } else {
      setHasMore(false);
      const searchResults = await searchProducts(newSearchTerm);
      setProducts(searchResults);
    }
  };

  const handleRefresh = () => {
    // Reset state to initial values
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    setSearchTerm("");
    setFlag(prevFlag => !prevFlag);

  };

  return (
    <div>
      <div style={{ textAlign: 'center', }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: '20px', padding: '10px', width: '20%' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
        <button onClick={handleRefresh} style={{ padding: '15px', backgroundColor: '#4CAF50', border: 'none',  color: 'white', textDecoration: 'none', display: 'inline-block', fontSize: '16px', borderRadius: '8px', cursor: 'pointer'}}>
          Refresh
        </button>
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={loadProducts}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: 'center', }}>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center', }}>You've seen it all!</p>}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
