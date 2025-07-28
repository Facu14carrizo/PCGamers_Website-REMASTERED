import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Zap, Eye, ArrowRight, Cpu, Monitor, Gamepad2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  freeShipping?: boolean;
  category?: string;
  specs?: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onAddToCart, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const isLiked = isFavorite(product.id);

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : product.discount || 0;

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'gpu': return <Monitor className="h-5 w-5" />;
      case 'cpu': return <Cpu className="h-5 w-5" />;
      case 'peripheral': return <Gamepad2 className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    
    // Animación de feedback
    const button = e.currentTarget as HTMLElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`${product.name} agregado a comparación!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    alert(`¡Comprando ${product.name} ahora!`);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 200}ms`,
              animation: isHovered ? 'float 3s ease-in-out infinite' : 'none'
            }}
          />
        ))}
      </div>

      {/* Image Container with Advanced Effects */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-50 to-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
        
        {/* Dynamic Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                NUEVO
              </span>
            </div>
          )}
          {product.isBestSeller && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
              <Zap className="h-3 w-3 mr-1 animate-bounce" />
              TOP SELLER
            </div>
          )}
          {discountPercentage > 0 && (
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform group-hover:scale-110 transition-transform">
              -{discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Interactive Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button 
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleQuickView}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-gray-600 hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-3">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-bold transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2">
              onClick={handleQuickView}
              <Eye className="h-4 w-4" />
              <span>Vista Rápida</span>
            </button>
            <button 
              onClick={handleAddToCart}
              className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section with Advanced Typography */}
      <div className="p-6 relative">
        {/* Brand and Category */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-orange-100 rounded-lg text-orange-600">
              {getCategoryIcon()}
            </div>
            <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
              {product.brand}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 transition-colors duration-200 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
          {product.name}
        </h3>

        {/* Specs Preview */}
        {product.specs && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.specs.slice(0, 2).map((spec, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {spec}
                </span>
              ))}
              {product.specs.length > 2 && (
                <span className="text-xs text-orange-600 font-semibold">
                  +{product.specs.length - 2} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price Section with Animation */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {discountPercentage > 0 && (
            <div className="text-green-600 text-sm font-semibold">
              Ahorras ${((product.originalPrice || 0) - product.price).toLocaleString()}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-4 space-y-1">
          {product.freeShipping && (
            <div className="flex items-center text-green-600 text-sm font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Envío Gratis
            </div>
          )}
          <div className="flex items-center text-blue-600 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            12 cuotas sin interés
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/btn">
            onClick={handleBuyNow}
            <ShoppingCart className="h-5 w-5 group-hover/btn:animate-bounce" />
            <span>Comprar</span>
            <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleCompare}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            Comparar
          </button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 via-transparent to-orange-400/20 blur-xl" />
      </div>
    </div>
  );
};

export default ProductCard;