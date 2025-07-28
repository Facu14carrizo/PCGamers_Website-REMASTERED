import React from 'react';
import { GamepadIcon, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¡Mantente actualizado con las mejores ofertas!</h2>
          <p className="text-lg mb-6 opacity-90">Suscríbete y recibe descuentos exclusivos directamente en tu email</p>
          <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Tu email aquí..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-2 rounded-lg">
                <GamepadIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">GamerTech</h3>
                <p className="text-sm text-gray-400">Pro Gaming Store</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Tu tienda de gaming y tecnología de confianza. Los mejores productos, precios increíbles y el servicio que te mereces.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-orange-600 hover:bg-orange-700 p-2 rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-orange-600 hover:bg-orange-700 p-2 rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-orange-600 hover:bg-orange-700 p-2 rounded-lg transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-orange-600 hover:bg-orange-700 p-2 rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {[
                'Placas de Video',
                'Procesadores',
                'Motherboards', 
                'Memorias RAM',
                'Almacenamiento',
                'Periféricos',
                'Monitores',
                'Ofertas Especiales'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Atención al Cliente</h4>
            <ul className="space-y-2">
              {[
                'Mi Cuenta',
                'Seguir Pedido',
                'Política de Envíos',
                'Devoluciones',
                'Garantías',
                'Formas de Pago',
                'Términos y Condiciones',
                'Preguntas Frecuentes'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Av. Corrientes 1234</p>
                  <p className="text-sm text-gray-400">Buenos Aires, Argentina</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">+54 11 4567-8900</p>
                  <p className="text-xs text-gray-500">Lun a Vie 9:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">info@gamertech.com</p>
                  <p className="text-xs text-gray-500">Respuesta en 24hs</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2 text-orange-500">Medios de Pago</h5>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white p-2 rounded text-gray-900 text-xs font-bold">VISA</div>
                <div className="bg-white p-2 rounded text-gray-900 text-xs font-bold">MC</div>
                <div className="bg-white p-2 rounded text-gray-900 text-xs font-bold">AMEX</div>
                <div className="bg-orange-600 p-2 rounded text-white text-xs font-bold">MP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 GamerTech. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Términos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;