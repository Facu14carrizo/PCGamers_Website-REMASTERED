import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { CartItem } from '../hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  getCartTotal,
  clearCart
}) => {
  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega algunos productos antes de proceder al checkout.');
      return;
    }
    
    // Simular proceso de checkout
    const total = getCartTotal();
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`¡Procesando compra!\n\nProductos: ${itemCount}\nTotal: $${total.toLocaleString()}\n\nRedirigiendo al proceso de pago...`);
    
    // Aquí se podría integrar con un servicio de pago real
    // Por ahora solo cerramos el modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            <h2 className="text-lg sm:text-2xl font-bold">Carrito</h2>
            <span className="bg-white/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full max-h-[calc(90vh-200px)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500">
                  ¡Agrega algunos productos increíbles!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start sm:items-center space-x-3 sm:space-x-4 bg-gray-50 p-3 sm:p-4 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">{item.brand}</p>
                      <p className="text-base sm:text-lg font-bold text-orange-600">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t bg-gray-50 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-semibold">Total:</span>
                  <span className="text-xl sm:text-2xl font-bold text-orange-600">
                    ${getCartTotal().toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3 sm:mb-4 text-xs sm:text-sm text-green-600">
                  <Truck className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Envío gratis en compras superiores a $50.000</span>
                  <span className="sm:hidden">Envío gratis +$50k</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={clearCart}
                    className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
                  >
                    Vaciar Carrito
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="w-full sm:flex-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Finalizar Compra</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;