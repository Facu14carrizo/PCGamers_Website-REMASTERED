import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange?: (filters: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'brand', 'price']);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRanges: [] as string[],
    ratings: [] as number[],
    specialOffers: [] as string[]
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const categories = [
    { name: 'Placas de Video', count: 156 },
    { name: 'Procesadores', count: 89 },
    { name: 'Motherboards', count: 234 },
    { name: 'Memorias RAM', count: 178 },
    { name: 'Almacenamiento', count: 145 },
    { name: 'Periféricos', count: 267 },
    { name: 'Monitores', count: 98 },
    { name: 'Fuentes', count: 67 }
  ];

  const brands = [
    { name: 'NVIDIA', count: 89 },
    { name: 'AMD', count: 67 },
    { name: 'Intel', count: 45 },
    { name: 'ASUS', count: 134 },
    { name: 'MSI', count: 112 },
    { name: 'Gigabyte', count: 98 },
    { name: 'Corsair', count: 76 },
    { name: 'Logitech', count: 54 }
  ];

  const priceRanges = [
    { label: 'Menos de $50.000', min: 0, max: 50000, count: 45 },
    { label: '$50.000 - $100.000', min: 50000, max: 100000, count: 78 },
    { label: '$100.000 - $200.000', min: 100000, max: 200000, count: 156 },
    { label: '$200.000 - $500.000', min: 200000, max: 500000, count: 89 },
    { label: 'Más de $500.000', min: 500000, max: Infinity, count: 23 }
  ];

  const handleFilterChange = (type: string, value: string | number, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      switch (type) {
        case 'category':
          if (checked) {
            newFilters.categories = [...prev.categories, value as string];
          } else {
            newFilters.categories = prev.categories.filter(c => c !== value);
          }
          break;
        case 'brand':
          if (checked) {
            newFilters.brands = [...prev.brands, value as string];
          } else {
            newFilters.brands = prev.brands.filter(b => b !== value);
          }
          break;
        case 'price':
          if (checked) {
            newFilters.priceRanges = [...prev.priceRanges, value as string];
          } else {
            newFilters.priceRanges = prev.priceRanges.filter(p => p !== value);
          }
          break;
        case 'rating':
          if (checked) {
            newFilters.ratings = [...prev.ratings, value as number];
          } else {
            newFilters.ratings = prev.ratings.filter(r => r !== value);
          }
          break;
        case 'special':
          if (checked) {
            newFilters.specialOffers = [...prev.specialOffers, value as string];
          } else {
            newFilters.specialOffers = prev.specialOffers.filter(s => s !== value);
          }
          break;
      }
      
      return newFilters;
    });
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange(selectedFilters);
    }
    alert('Filtros aplicados correctamente!');
    onClose();
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      brands: [],
      priceRanges: [],
      ratings: [],
      specialOffers: []
    });
    if (onFilterChange) {
      onFilterChange({
        categories: [],
        brands: [],
        priceRanges: [],
        ratings: [],
        specialOffers: []
      });
    }
    alert('Todos los filtros han sido limpiados!');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white shadow-lg lg:shadow-none z-50 w-80 lg:w-full transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } overflow-y-auto`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-orange-600" />
            <span className="font-bold text-lg">Filtros</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Category Filter */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              <span>Categorías</span>
              {expandedSections.includes('category') ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </button>
            {expandedSections.includes('category') && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.name} className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                    <input 
                      type="checkbox" 
                      className="accent-orange-600"
                      checked={selectedFilters.categories.includes(category.name)}
                      onChange={(e) => handleFilterChange('category', category.name, e.target.checked)}
                    />
                    <span className="flex-1 text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              <span>Marcas</span>
              {expandedSections.includes('brand') ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </button>
            {expandedSections.includes('brand') && (
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand.name} className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                    <input 
                      type="checkbox" 
                      className="accent-orange-600"
                      checked={selectedFilters.brands.includes(brand.name)}
                      onChange={(e) => handleFilterChange('brand', brand.name, e.target.checked)}
                    />
                    <span className="flex-1 text-gray-700">{brand.name}</span>
                    <span className="text-sm text-gray-500">({brand.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              <span>Precio</span>
              {expandedSections.includes('price') ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </button>
            {expandedSections.includes('price') && (
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                    <input 
                      type="checkbox" 
                      className="accent-orange-600"
                      checked={selectedFilters.priceRanges.includes(range.label)}
                      onChange={(e) => handleFilterChange('price', range.label, e.target.checked)}
                    />
                    <span className="flex-1 text-gray-700">{range.label}</span>
                    <span className="text-sm text-gray-500">({range.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
            >
              <span>Calificación</span>
              {expandedSections.includes('rating') ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </button>
            {expandedSections.includes('rating') && (
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                    <input 
                      type="checkbox" 
                      className="accent-orange-600"
                      checked={selectedFilters.ratings.includes(stars)}
                      onChange={(e) => handleFilterChange('rating', stars, e.target.checked)}
                    />
                    <div className="flex items-center space-x-1">
                      {[...Array(stars)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      {[...Array(5 - stars)].map((_, i) => (
                        <span key={i} className="text-gray-300">★</span>
                      ))}
                      <span className="text-gray-700 ml-2">y más</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Special Offers */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Ofertas Especiales</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  className="accent-orange-600"
                  checked={selectedFilters.specialOffers.includes('sale')}
                  onChange={(e) => handleFilterChange('special', 'sale', e.target.checked)}
                />
                <span className="text-gray-700">En oferta</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  className="accent-orange-600"
                  checked={selectedFilters.specialOffers.includes('free-shipping')}
                  onChange={(e) => handleFilterChange('special', 'free-shipping', e.target.checked)}
                />
                <span className="text-gray-700">Envío gratis</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  className="accent-orange-600"
                  checked={selectedFilters.specialOffers.includes('new')}
                  onChange={(e) => handleFilterChange('special', 'new', e.target.checked)}
                />
                <span className="text-gray-700">Nuevos productos</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t bg-gray-50 space-y-2">
          <button 
            onClick={applyFilters}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition-colors"
          >
            Aplicar Filtros
          </button>
          <button 
            onClick={clearAllFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors"
          >
            Limpiar Todo
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;