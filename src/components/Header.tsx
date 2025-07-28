import React, { useState } from 'react';
import { Search, Menu, ShoppingCart, User, Heart, GamepadIcon } from 'lucide-react';
import CartModal from './CartModal';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartItemsCount 
  } = useCart();
  
  const { getFavoritesCount } = useFavorites();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Buscando: "${searchTerm}"`);
      // Aquí iría la lógica real de búsqueda
    }
  };

  const handleLogin = () => {
    alert('Funcionalidad de login implementada!');
    setIsUserMenuOpen(false);
  };

  const handleRegister = () => {
    alert('Funcionalidad de registro implementada!');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          ⚡ OFERTAS ESPECIALES: Hasta 40% OFF en placas de video RTX | Envío gratis en compras +$50.000
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-2 rounded-lg">
              <GamepadIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GamerTech</h1>
              <p className="text-xs text-gray-500">Pro Gaming Store</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar productos gaming, RTX 4090, periféricos..."
                  className="w-full py-3 px-4 pr-12 border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none transition-colors"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">Mi Cuenta</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <button 
                    onClick={handleLogin}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={handleRegister}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Registrarse
                  </button>
                  <hr className="my-2" />
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                    Mis Pedidos
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                    Configuración
                  </a>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => alert('Vista de favoritos implementada!')}
              className="relative text-gray-700 hover:text-orange-600 transition-colors"
            >
              <Heart className="h-6 w-6" />
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getFavoritesCount()}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full py-3 px-4 pr-12 border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex space-x-8 py-3">
            {['Placas de Video', 'Procesadores', 'Motherboards', 'Memorias RAM', 'Periféricos', 'Monitores', 'Ofertas'].map((item) => (
              <button 
                key={item}
                onClick={() => alert(`Navegando a: ${item}`)}
                className="hover:text-orange-500 transition-colors py-2 border-b-2 border-transparent hover:border-orange-500"
              >
                {item}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {['Placas de Video', 'Procesadores', 'Motherboards', 'Memorias RAM', 'Periféricos', 'Monitores', 'Ofertas'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => {
                    alert(`Navegando a: ${item}`);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-orange-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      </header>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getCartTotal={getCartTotal}
        clearCart={clearCart}
      />
    </>
  );
};

export default Header;