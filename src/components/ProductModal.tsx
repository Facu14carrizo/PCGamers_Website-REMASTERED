import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Star, Zap, Shield, Truck, CreditCard } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  specs?: string[];
  description?: string;
  features?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  isFavorite: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const images = [product.image, product.image, product.image]; // Simular múltiples imágenes

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    // Cerrar el modal después de agregar al carrito
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    
    // Mostrar mensaje de confirmación
    alert(`¡Producto agregado al carrito!\n\n${product.name}\nCantidad: ${quantity}\nTotal: $${(product.price * quantity).toLocaleString()}\n\n¿Deseas proceder al checkout?`);
    
    // Aquí se podría redirigir al checkout real
    // Por ahora solo cerramos el modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Detalles del Producto</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Images */}
          <div>
            <div className="mb-3 sm:mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">
                {product.brand}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reseñas)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-baseline space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-green-600 font-semibold text-sm sm:text-base">
                  Ahorras ${(product.originalPrice - product.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Características Principales</h4>
              <div className="space-y-2">
                {product.specs?.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center space-x-2 text-green-600">
                <Truck className="h-4 w-4" />
                <span className="text-sm">Envío gratis</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">12 cuotas sin interés</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Garantía oficial</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cantidad
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Comprar Ahora
              </button>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Agregar al Carrito</span>
                  <span className="sm:hidden">Agregar</span>
                </button>
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-2.5 sm:p-3 rounded-xl transition-colors ${
                    isFavorite
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;