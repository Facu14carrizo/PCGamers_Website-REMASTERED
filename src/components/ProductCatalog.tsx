import React, { useState, useEffect } from 'react';
import { Grid, List, Filter, SortAsc, Search, Sparkles, TrendingUp, Zap, Award } from 'lucide-react';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import ProductModal from './ProductModal';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

const ProductCatalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['ofertas', 'gaming']);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const categories = [
    { id: 'all', name: 'Todos', icon: <Sparkles className="h-5 w-5" />, count: 847 },
    { id: 'gpu', name: 'Placas de Video', icon: <Zap className="h-5 w-5" />, count: 156 },
    { id: 'cpu', name: 'Procesadores', icon: <TrendingUp className="h-5 w-5" />, count: 89 },
    { id: 'motherboard', name: 'Motherboards', icon: <Award className="h-5 w-5" />, count: 234 },
    { id: 'ram', name: 'Memorias', icon: <Grid className="h-5 w-5" />, count: 178 },
    { id: 'storage', name: 'Almacenamiento', icon: <List className="h-5 w-5" />, count: 145 },
  ];

  const products = [
    {
      id: 1,
      name: "NVIDIA GeForce RTX 4090 Gaming X Trio 24GB GDDR6X",
      brand: "MSI",
      price: 899999,
      originalPrice: 1199999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.8,
      reviews: 127,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'gpu',
      specs: ['24GB GDDR6X', '4K Gaming', 'Ray Tracing', 'DLSS 3.0']
    },
    {
      id: 2,
      name: "AMD Ryzen 9 7950X3D Procesador Gaming 16-Core",
      brand: "AMD",
      price: 649999,
      originalPrice: 749999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.9,
      reviews: 89,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'cpu',
      specs: ['16 Cores', '32 Threads', '5.7GHz Boost', '3D V-Cache']
    },
    {
      id: 3,
      name: "ASUS ROG Strix B650E-E Gaming WiFi Motherboard AM5",
      brand: "ASUS",
      price: 289999,
      originalPrice: 349999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.7,
      reviews: 234,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['AM5 Socket', 'WiFi 6E', 'PCIe 5.0', 'DDR5 Support']
    },
    {
      id: 4,
      name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6000",
      brand: "G.Skill",
      price: 189999,
      originalPrice: 229999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.6,
      reviews: 156,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'ram',
      specs: ['32GB Kit', 'DDR5-6000', 'RGB Lighting', 'Low Latency']
    },
    {
      id: 5,
      name: "Samsung 980 PRO 2TB NVMe SSD PCIe 4.0 M.2",
      brand: "Samsung",
      price: 159999,
      originalPrice: 199999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.8,
      reviews: 298,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'storage',
      specs: ['2TB Capacity', 'PCIe 4.0', '7000MB/s Read', 'M.2 2280']
    },
    {
      id: 6,
      name: "Monitor Gaming ASUS ROG Swift PG279QM 27\" 240Hz 4K",
      brand: "ASUS",
      price: 459999,
      originalPrice: 549999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.9,
      reviews: 78,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['27\" 4K', '240Hz', 'G-Sync', 'HDR600']
    },
    {
      id: 7,
      name: "Teclado Mecánico Corsair K95 RGB Platinum XT",
      brand: "Corsair",
      price: 129999,
      originalPrice: 159999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.5,
      reviews: 167,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'peripheral',
      specs: ['Cherry MX', 'RGB Backlight', 'Macro Keys', 'USB Passthrough']
    },
    {
      id: 8,
      name: "Mouse Gaming Logitech G Pro X Superlight Wireless",
      brand: "Logitech",
      price: 89999,
      originalPrice: 109999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.7,
      reviews: 245,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['25K DPI', 'Wireless', '63g Weight', 'HERO Sensor']
    }
  ];

  // Filtrar productos basado en categoría activa y término de búsqueda
  useEffect(() => {
    let filtered = products;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        });
        break;
      default: // popularity
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, sortBy]);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    // Mostrar notificación de éxito
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
    notification.textContent = `¡${product.name} agregado al carrito!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchTerm(''); // Limpiar búsqueda al cambiar categoría
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setActiveCategory('all');
    setSearchTerm('');
    setSortBy('popularity');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      {/* Advanced Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, orange 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, orange 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'float 20s ease-in-out infinite'
          }} />
        </div>
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Gaming Catalog
            </h1>
            <p className="text-xl text-gray-300 mb-6">Descubre el futuro del gaming con nuestra selección premium</p>
            
            {/* Advanced Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos gaming de última generación..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full py-4 px-6 pr-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all duration-300"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Sidebar isOpen={true} onClose={() => {}} />
          </div>

          {/* Mobile Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Advanced Controls Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-gray-900">
                    <span className="text-2xl font-bold text-orange-600">{filteredProducts.length}</span>
                    <span className="text-gray-600 ml-2">productos encontrados</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Filter className="h-5 w-5" />
                  </button>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-white shadow-md text-orange-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-white shadow-md text-orange-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300 appearance-none cursor-pointer pr-10"
                    >
                      <option value="popularity">Más Popular</option>
                      <option value="price-low">Precio: Menor a Mayor</option>
                      <option value="price-high">Precio: Mayor a Menor</option>
                      <option value="rating">Mejor Calificación</option>
                      <option value="newest">Más Nuevos</option>
                      <option value="discount">Mayor Descuento</option>
                    </select>
                    <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Control Panel */}
            <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-40 space-y-4">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-orange-200">
                <div className="space-y-3">
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {viewMode === 'grid' ? <List className="h-5 w-5 mx-auto" /> : <Grid className="h-5 w-5 mx-auto" />}
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 lg:hidden"
                  >
                    <Filter className="h-5 w-5 mx-auto" />
                  </button>
                </div>
              </div>
            </div>

            {/* Immersive Filter Experience */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">
                        Explorar Productos
                      </h2>
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl font-bold text-orange-400">{filteredProducts.length}</span>
                        <span className="text-gray-300">productos disponibles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, orange 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className={`relative z-10 grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="transform transition-all duration-700"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.8s ease-out forwards'
                      }}
                    >
                      <ProductCard 
                        product={product} 
                        index={index}
                        onAddToCart={handleAddToCart}
                        onQuickView={handleQuickView}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full">
                    <div className="text-center py-24 bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl border-2 border-dashed border-gray-300">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-full blur-3xl transform scale-150" />
                        <Search className="relative h-24 w-24 mx-auto mb-6 text-gray-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-700 mb-4">No encontramos productos</h3>
                      <p className="text-gray-500 mb-8 text-lg">Intenta ajustar tus filtros o términos de búsqueda</p>
                      <button 
                        onClick={clearAllFilters}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                      >
                        🔄 Explorar todos los productos
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Load More Section */}
            {filteredProducts.length > 0 && (
              <div className="mt-20">
                <div className="bg-gradient-to-r from-gray-900 via-orange-900 to-gray-900 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-400 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                          animationDelay: `${i * 0.3}s`
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-8">
                      <h3 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                        Descubre Más Gaming
                      </h3>
                      <div className="flex items-center justify-center space-x-4 text-orange-300 mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-32" />
                        <span className="text-lg font-semibold">
                          Mostrando {filteredProducts.length} de 847 productos
                        </span>
                        <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-32" />
                      </div>
                      
                      {/* Progress Visualization */}
                      <div className="max-w-md mx-auto mb-8">
                        <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-1000 relative"
                            style={{ width: `${(filteredProducts.length / 847) * 100}%` }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-orange-300 mt-2">
                          <span>Inicio</span>
                          <span>{Math.round((filteredProducts.length / 847) * 100)}% explorado</span>
                          <span>Completo</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-16 py-6 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className="relative flex items-center space-x-4">
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                            <span className="text-xl">Cargando experiencias gaming...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-6 w-6 group-hover:animate-bounce" />
                            <span className="text-xl">Cargar Más Productos</span>
                            <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                              +24 productos
                            </div>
                          </>
                        )}
                      </div>
                    </button>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="text-3xl font-bold text-orange-400 mb-2">847</div>
                        <div className="text-white/80">Productos Totales</div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="text-3xl font-bold text-orange-400 mb-2">156</div>
                        <div className="text-white/80">Marcas Premium</div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="text-3xl font-bold text-orange-400 mb-2">4.8★</div>
                        <div className="text-white/80">Rating Promedio</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedProduct ? isFavorite(selectedProduct.id) : false}
      />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductCatalog;