import axios from 'axios';

// Fetch products for infinite scroll
export const fetchProducts = async (skip: number = 0, limit: number = 20) => {
  const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
  return response.data.products;
};

// Fetch products for search
export const searchProducts = async (query: string) => {
  const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
  return response.data.products;
};
