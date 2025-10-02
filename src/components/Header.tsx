import React, { useState } from 'react';
import { Search, Menu, ShoppingCart, User, Heart, GamepadIcon, X } from 'lucide-react';
import CartModal from './CartModal';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
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
      // La búsqueda se manejará en ProductCatalog
      window.dispatchEvent(new CustomEvent('searchProducts', { 
        detail: { searchTerm: searchTerm.trim() } 
      }));
      setIsMobileSearchOpen(false);
    }
  };

  const handleLogin = () => {
    alert('¡Bienvenido a GamerTech!\n\nFuncionalidades disponibles:\n• Ver historial de compras\n• Gestionar favoritos\n• Configurar cuenta\n• Soporte técnico\n\nPróximamente: Sistema de autenticación completo.');
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    alert('Funcionalidad de registro implementada!');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm">
          <span className="hidden sm:inline">⚡ OFERTAS ESPECIALES: Hasta 40% OFF en placas de video RTX | Envío gratis en compras +$50.000</span>
          <span className="sm:hidden">⚡ OFERTAS: 40% OFF | Envío gratis +$50k</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-1.5 sm:p-2 rounded-lg">
              <GamepadIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">GamerTech</h1>
              <p className="text-xs text-gray-500 dark:text-gray-300">Pro Gaming Store</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">GamerTech</h1>
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
                  className="w-full py-3 px-4 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-full focus:border-orange-500 focus:outline-none transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
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
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden text-gray-700 hover:text-orange-600 transition-colors p-2"
            >
              <Search className="h-5 w-5" />
            </button>

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
              onClick={() => {
                const favoritesCount = getFavoritesCount();
                if (favoritesCount > 0) {
                  alert(`Tienes ${favoritesCount} productos en favoritos.\n\nPróximamente podrás ver y gestionar tus favoritos aquí.`);
                } else {
                  alert('No tienes productos en favoritos.\n\nAgrega algunos productos a favoritos para verlos aquí.');
                }
              }}
              className="relative text-gray-700 hover:text-orange-600 transition-colors p-2"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-orange-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {getFavoritesCount()}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-orange-600 transition-colors p-2"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-orange-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden text-gray-700 hover:text-orange-600 transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileSearchOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full py-3 px-4 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-full focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
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

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <button 
              onClick={handleLogin}
              className="w-full text-left px-4 py-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <User className="h-5 w-5 text-orange-600" />
              <span>Mi Cuenta</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('filterByCategory', { 
                    detail: { category: 'gpu' } 
                  }));
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center text-sm"
              >
                Placas de Video
              </button>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('filterByCategory', { 
                    detail: { category: 'cpu' } 
                  }));
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center text-sm"
              >
                Procesadores
              </button>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('filterByCategory', { 
                    detail: { category: 'ram' } 
                  }));
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center text-sm"
              >
                Memorias RAM
              </button>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('filterByCategory', { 
                    detail: { category: 'peripheral' } 
                  }));
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center text-sm"
              >
                Monitores
              </button>
            </div>
          </div>
        </div>
      </div>


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