import React from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="dark min-h-screen bg-gray-900">
      <Header />
      <HeroSlider />
      <main>
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  );
}

export default App;