import React from 'react';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', }} >Product List</h1>
      <ProductList />
    </div>
  );
};

export default App;
