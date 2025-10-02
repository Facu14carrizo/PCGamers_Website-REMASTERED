import React, { useState, useEffect } from 'react';
import { Grid, List, Filter, SortAsc, Search, Sparkles, TrendingUp, Zap, Award } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useCart } from '../hooks/useCart';

// Importar imágenes locales
import rtx4090 from '../assets/NVIDIA GeForce RTX 4090 Gaming X Trio 24GB GDDR6X.webp';
import rtx4090Super from '../assets/RTX 4090 SÚPER OFERTA.jpg';
import amdRx7800xt from '../assets/AMD Radeon RX 7800 XT 16GB GDDR6.png';
import amdRx7900xtx from '../assets/AMD Radeon RX 7900 XTX 24GB GDDR6.jpg';
import ryzen7950x3d from '../assets/RYZEN 9 7950X3D.webp';
import intelI7_13700k from '../assets/Intel Core i7-13700K 16-Core 13th Gen.webp';
import intelI9_13900k from '../assets/Intel Core i9-13900K 24-Core 13th Gen.jpg';
import msiB550 from '../assets/MSI MAG B550 Tomahawk Motherboard AM4.jpg';
import gskillRam from '../assets/G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6000.webp';
import corsairRam from '../assets/Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600.webp';
import wdSSD from '../assets/Western Digital Black SN850X 2TB NVMe SSD.jpg';
import monitorGaming from '../assets/Monitor Gaming ASUS ROG Swift PG279QM 27 240Hz 4K.avif';
import monitor4k from '../assets/MONITOR GAMING 4K.webp';
import mouseLogitech from '../assets/Mouse Gaming Logitech G Pro X Superlight Wireless.jpg';
import tecladoHyperX from '../assets/Teclado Mecánico HyperX Alloy Origins RGB.jpg';
import { useFavorites } from '../hooks/useFavorites';

const ProductCatalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['ofertas', 'gaming']);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [productsToShow, setProductsToShow] = useState(12);
  
  const { addToCart, getCartItemsCount } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const products = [
    {
      id: 1,
      name: "NVIDIA GeForce RTX 4090 Gaming X Trio 24GB GDDR6X",
      brand: "MSI",
      price: 899999,
      originalPrice: 1199999,
      image: rtx4090,
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
      image: ryzen7950x3d,
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
      image: gskillRam,
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
      image: monitorGaming,
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
      image: mouseLogitech,
      rating: 4.7,
      reviews: 245,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['25K DPI', 'Wireless', '63g Weight', 'HERO Sensor']
    },
    {
      id: 9,
      name: "NVIDIA GeForce RTX 4070 Ti 12GB GDDR6X",
      brand: "Gigabyte",
      price: 699999,
      originalPrice: 799999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.7,
      reviews: 98,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'gpu',
      specs: ['12GB GDDR6X', 'Ray Tracing', 'DLSS 3.0', 'PCIe 4.0']
    },
    {
      id: 10,
      name: "AMD Radeon RX 7900 XTX 24GB GDDR6",
      brand: "AMD",
      price: 799999,
      originalPrice: 899999,
      image: amdRx7900xtx,
      rating: 4.6,
      reviews: 110,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'gpu',
      specs: ['24GB GDDR6', 'Ray Tracing', 'Infinity Cache', 'PCIe 4.0']
    },
    {
      id: 11,
      name: "Intel Core i9-13900K 24-Core 13th Gen",
      brand: "Intel",
      price: 599999,
      originalPrice: 699999,
      image: intelI9_13900k,
      rating: 4.8,
      reviews: 120,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'cpu',
      specs: ['24 Cores', '32 Threads', '5.8GHz Turbo', 'Unlocked']
    },
    {
      id: 12,
      name: "AMD Ryzen 7 7800X3D Procesador Gaming 8-Core",
      brand: "AMD",
      price: 399999,
      originalPrice: 499999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.7,
      reviews: 80,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'cpu',
      specs: ['8 Cores', '16 Threads', '5.0GHz Boost', '3D V-Cache']
    },
    {
      id: 13,
      name: "ASUS PRIME Z790-A WiFi Motherboard LGA1700",
      brand: "ASUS",
      price: 249999,
      originalPrice: 299999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.5,
      reviews: 90,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['LGA1700', 'WiFi 6', 'PCIe 5.0', 'DDR5 Support']
    },
    {
      id: 14,
      name: "MSI MAG B550 Tomahawk Motherboard AM4",
      brand: "MSI",
      price: 179999,
      originalPrice: 219999,
      image: msiB550,
      rating: 4.6,
      reviews: 75,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'motherboard',
      specs: ['AM4 Socket', 'PCIe 4.0', 'DDR4', '2.5G LAN']
    },
    {
      id: 15,
      name: "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600",
      brand: "Corsair",
      price: 99999,
      originalPrice: 129999,
      image: corsairRam,
      rating: 4.7,
      reviews: 140,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'ram',
      specs: ['32GB Kit', 'DDR4-3600', 'RGB Lighting', 'Low Latency']
    },
    {
      id: 16,
      name: "Kingston Fury Beast 16GB (2x8GB) DDR5-6000",
      brand: "Kingston",
      price: 79999,
      originalPrice: 99999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.5,
      reviews: 60,
      isNew: true,
      isBestSeller: false,
      freeShipping: false,
      category: 'ram',
      specs: ['16GB Kit', 'DDR5-6000', 'Low Profile', 'Intel XMP 3.0']
    },
    {
      id: 17,
      name: "Crucial P5 Plus 1TB NVMe SSD PCIe 4.0 M.2",
      brand: "Crucial",
      price: 89999,
      originalPrice: 119999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.6,
      reviews: 70,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'storage',
      specs: ['1TB Capacity', 'PCIe 4.0', '6600MB/s Read', 'M.2 2280']
    },
    {
      id: 18,
      name: "Western Digital Black SN850X 2TB NVMe SSD",
      brand: "WD",
      price: 139999,
      originalPrice: 179999,
      image: wdSSD,
      rating: 4.8,
      reviews: 95,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['2TB Capacity', 'PCIe 4.0', '7300MB/s Read', 'M.2 2280']
    },
    {
      id: 19,
      name: "Monitor LG UltraGear 32\" QHD 165Hz HDR10",
      brand: "LG",
      price: 249999,
      originalPrice: 299999,
      image: monitor4k,
      rating: 4.7,
      reviews: 88,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['32" QHD', '165Hz', 'HDR10', '1ms Response']
    },
    {
      id: 20,
      name: "Teclado Mecánico HyperX Alloy Origins RGB",
      brand: "HyperX",
      price: 89999,
      originalPrice: 119999,
      image: tecladoHyperX,
      rating: 4.6,
      reviews: 110,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'peripheral',
      specs: ['Red Switches', 'RGB Lighting', 'Full Anti-Ghosting', 'Aluminum Body']
    },
    {
      id: 21,
      name: "NVIDIA GeForce RTX 4060 Ti 8GB GDDR6",
      brand: "MSI",
      price: 399999,
      originalPrice: 499999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.5,
      reviews: 85,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'gpu',
      specs: ['8GB GDDR6', 'Ray Tracing', 'DLSS 3.0', 'PCIe 4.0']
    },
    {
      id: 22,
      name: "AMD Radeon RX 7800 XT 16GB GDDR6",
      brand: "Sapphire",
      price: 549999,
      originalPrice: 649999,
      image: amdRx7800xt,
      rating: 4.7,
      reviews: 92,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'gpu',
      specs: ['16GB GDDR6', 'Ray Tracing', 'Infinity Cache', 'PCIe 4.0']
    },
    {
      id: 23,
      name: "Intel Core i7-13700K 16-Core 13th Gen",
      brand: "Intel",
      price: 449999,
      originalPrice: 549999,
      image: intelI7_13700k,
      rating: 4.6,
      reviews: 105,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'cpu',
      specs: ['16 Cores', '24 Threads', '5.4GHz Turbo', 'Unlocked']
    },
    {
      id: 24,
      name: "AMD Ryzen 5 7600X Procesador Gaming 6-Core",
      brand: "AMD",
      price: 299999,
      originalPrice: 399999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.5,
      reviews: 75,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'cpu',
      specs: ['6 Cores', '12 Threads', '5.3GHz Boost', 'AM5 Socket']
    },
    {
      id: 25,
      name: "Gigabyte B760 AORUS Elite AX Motherboard",
      brand: "Gigabyte",
      price: 199999,
      originalPrice: 249999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.4,
      reviews: 65,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['LGA1700', 'WiFi 6E', 'PCIe 4.0', 'DDR5 Support']
    },
    {
      id: 26,
      name: "ASRock B650M Pro RS WiFi Motherboard",
      brand: "ASRock",
      price: 159999,
      originalPrice: 199999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.3,
      reviews: 45,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'motherboard',
      specs: ['AM5 Socket', 'WiFi 6', 'PCIe 4.0', 'DDR5 Support']
    },
    {
      id: 27,
      name: "TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR5-6400",
      brand: "TeamGroup",
      price: 119999,
      originalPrice: 149999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.6,
      reviews: 55,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'ram',
      specs: ['32GB Kit', 'DDR5-6400', 'RGB Lighting', 'Intel XMP 3.0']
    },
    {
      id: 28,
      name: "Patriot Viper Steel 16GB (2x8GB) DDR4-4000",
      brand: "Patriot",
      price: 69999,
      originalPrice: 89999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.4,
      reviews: 40,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'ram',
      specs: ['16GB Kit', 'DDR4-4000', 'Low Profile', 'Intel XMP 2.0']
    },
    {
      id: 29,
      name: "Seagate FireCuda 530 1TB NVMe SSD PCIe 4.0",
      brand: "Seagate",
      price: 99999,
      originalPrice: 129999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.7,
      reviews: 80,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['1TB Capacity', 'PCIe 4.0', '7300MB/s Read', 'M.2 2280']
    },
    {
      id: 30,
      name: "ADATA XPG S70 Blade 2TB NVMe SSD",
      brand: "ADATA",
      price: 129999,
      originalPrice: 169999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.5,
      reviews: 70,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'storage',
      specs: ['2TB Capacity', 'PCIe 4.0', '7400MB/s Read', 'M.2 2280']
    },
    {
      id: 31,
      name: "Monitor Samsung Odyssey G7 32\" QHD 240Hz",
      brand: "Samsung",
      price: 399999,
      originalPrice: 499999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.8,
      reviews: 120,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['32\" QHD', '240Hz', '1000R Curved', '1ms Response']
    },
    {
      id: 32,
      name: "Mouse Gaming Razer DeathAdder V3 Pro",
      brand: "Razer",
      price: 129999,
      originalPrice: 159999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.7,
      reviews: 95,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['30K DPI', 'Wireless', '59g Weight', 'Focus Pro 30K']
    },
    {
      id: 33,
      name: "Teclado Mecánico SteelSeries Apex Pro TKL",
      brand: "SteelSeries",
      price: 149999,
      originalPrice: 189999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.6,
      reviews: 85,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['OmniPoint 2.0', 'RGB Lighting', 'OLED Display', 'TKL Layout']
    },
    {
      id: 34,
      name: "Auriculares Gaming Beyerdynamic DT 900 Pro X",
      brand: "Beyerdynamic",
      price: 199999,
      originalPrice: 249999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.9,
      reviews: 65,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['Open Back', 'Studio Quality', 'Detachable Cable', 'Comfortable']
    },
    {
      id: 35,
      name: "NVIDIA GeForce RTX 4080 16GB GDDR6X",
      brand: "EVGA",
      price: 799999,
      originalPrice: 899999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.8,
      reviews: 110,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'gpu',
      specs: ['16GB GDDR6X', 'Ray Tracing', 'DLSS 3.0', 'PCIe 4.0']
    },
    {
      id: 36,
      name: "AMD Radeon RX 7700 XT 12GB GDDR6",
      brand: "PowerColor",
      price: 449999,
      originalPrice: 549999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.5,
      reviews: 78,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'gpu',
      specs: ['12GB GDDR6', 'Ray Tracing', 'Infinity Cache', 'PCIe 4.0']
    },
    {
      id: 37,
      name: "Intel Core i5-13600K 14-Core 13th Gen",
      brand: "Intel",
      price: 349999,
      originalPrice: 449999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.7,
      reviews: 130,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'cpu',
      specs: ['14 Cores', '20 Threads', '5.1GHz Turbo', 'Unlocked']
    },
    {
      id: 38,
      name: "AMD Ryzen 9 7900X Procesador Gaming 12-Core",
      brand: "AMD",
      price: 549999,
      originalPrice: 649999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.8,
      reviews: 95,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'cpu',
      specs: ['12 Cores', '24 Threads', '5.6GHz Boost', 'AM5 Socket']
    },
    {
      id: 39,
      name: "MSI MPG B650 Carbon WiFi Motherboard",
      brand: "MSI",
      price: 229999,
      originalPrice: 279999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.6,
      reviews: 70,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['AM5 Socket', 'WiFi 6E', 'PCIe 5.0', 'DDR5 Support']
    },
    {
      id: 40,
      name: "ASUS TUF Gaming B760M-Plus WiFi",
      brand: "ASUS",
      price: 189999,
      originalPrice: 239999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.5,
      reviews: 60,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['LGA1700', 'WiFi 6', 'PCIe 4.0', 'DDR5 Support']
    },
    {
      id: 41,
      name: "G.Skill Ripjaws V 64GB (2x32GB) DDR4-3200",
      brand: "G.Skill",
      price: 149999,
      originalPrice: 189999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.4,
      reviews: 45,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'ram',
      specs: ['64GB Kit', 'DDR4-3200', 'Low Profile', 'Intel XMP 2.0']
    },
    {
      id: 42,
      name: "Corsair Dominator Platinum RGB 32GB (2x16GB) DDR5-7200",
      brand: "Corsair",
      price: 179999,
      originalPrice: 229999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.7,
      reviews: 55,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'ram',
      specs: ['32GB Kit', 'DDR5-7200', 'RGB Lighting', 'Intel XMP 3.0']
    },
    {
      id: 43,
      name: "Samsung 990 PRO 4TB NVMe SSD PCIe 4.0",
      brand: "Samsung",
      price: 299999,
      originalPrice: 399999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.8,
      reviews: 85,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['4TB Capacity', 'PCIe 4.0', '7450MB/s Read', 'M.2 2280']
    },
    {
      id: 44,
      name: "Kingston KC3000 2TB NVMe SSD PCIe 4.0",
      brand: "Kingston",
      price: 159999,
      originalPrice: 199999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.6,
      reviews: 75,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'storage',
      specs: ['2TB Capacity', 'PCIe 4.0', '7000MB/s Read', 'M.2 2280']
    },
    {
      id: 45,
      name: "Monitor Alienware AW3423DW 34\" QD-OLED 175Hz",
      brand: "Alienware",
      price: 599999,
      originalPrice: 699999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.9,
      reviews: 95,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['34\" QD-OLED', '175Hz', 'Ultrawide', '0.1ms Response']
    },
    {
      id: 46,
      name: "Teclado Mecánico Ducky One 3 RGB TKL",
      brand: "Ducky",
      price: 99999,
      originalPrice: 129999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.7,
      reviews: 80,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'peripheral',
      specs: ['Cherry MX', 'RGB Lighting', 'PBT Keycaps', 'TKL Layout']
    },
    {
      id: 47,
      name: "Mouse Gaming Glorious Model O Wireless",
      brand: "Glorious",
      price: 79999,
      originalPrice: 99999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.6,
      reviews: 120,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['19K DPI', 'Wireless', '69g Weight', 'Honeycomb Design']
    },
    {
      id: 48,
      name: "Auriculares Gaming Sennheiser HD 660S",
      brand: "Sennheiser",
      price: 179999,
      originalPrice: 229999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.8,
      reviews: 70,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['Open Back', 'Studio Quality', '150Ω Impedance', 'Comfortable']
    },
    {
      id: 49,
      name: "Fuente de Poder Corsair RM850x 850W 80+ Gold",
      brand: "Corsair",
      price: 129999,
      originalPrice: 159999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.7,
      reviews: 110,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['850W', '80+ Gold', 'Modular', 'Silent Operation']
    },
    {
      id: 50,
      name: "Gabinete Lian Li O11 Dynamic EVO",
      brand: "Lian Li",
      price: 149999,
      originalPrice: 189999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.8,
      reviews: 95,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['Mid Tower', 'Tempered Glass', 'Modular Design', 'Excellent Airflow']
    },
    {
      id: 51,
      name: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      brand: "Zotac",
      price: 299999,
      originalPrice: 399999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.4,
      reviews: 75,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'gpu',
      specs: ['8GB GDDR6', 'Ray Tracing', 'DLSS 3.0', 'PCIe 4.0']
    },
    {
      id: 52,
      name: "AMD Radeon RX 7600 8GB GDDR6",
      brand: "XFX",
      price: 249999,
      originalPrice: 349999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.3,
      reviews: 65,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'gpu',
      specs: ['8GB GDDR6', 'Ray Tracing', 'Infinity Cache', 'PCIe 4.0']
    },
    {
      id: 53,
      name: "Intel Core i3-13100F 4-Core 13th Gen",
      brand: "Intel",
      price: 149999,
      originalPrice: 199999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.2,
      reviews: 85,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'cpu',
      specs: ['4 Cores', '8 Threads', '4.5GHz Turbo', 'Budget Gaming']
    },
    {
      id: 54,
      name: "AMD Ryzen 3 7300X Procesador Gaming 4-Core",
      brand: "AMD",
      price: 129999,
      originalPrice: 179999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.1,
      reviews: 70,
      isNew: true,
      isBestSeller: false,
      freeShipping: false,
      category: 'cpu',
      specs: ['4 Cores', '8 Threads', '4.8GHz Boost', 'AM5 Socket']
    },
    {
      id: 55,
      name: "Gigabyte H610M S2H DDR4 Motherboard",
      brand: "Gigabyte",
      price: 89999,
      originalPrice: 129999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.0,
      reviews: 55,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'motherboard',
      specs: ['LGA1700', 'DDR4', 'PCIe 4.0', 'Budget Friendly']
    },
    {
      id: 56,
      name: "ASRock A620M Pro RS WiFi Motherboard",
      brand: "ASRock",
      price: 99999,
      originalPrice: 139999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.1,
      reviews: 45,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['AM5 Socket', 'WiFi 6', 'PCIe 4.0', 'DDR5 Support']
    },
    {
      id: 57,
      name: "Crucial Ballistix 8GB (1x8GB) DDR4-3200",
      brand: "Crucial",
      price: 39999,
      originalPrice: 59999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.0,
      reviews: 120,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'ram',
      specs: ['8GB Single', 'DDR4-3200', 'Low Profile', 'Budget Option']
    },
    {
      id: 58,
      name: "TeamGroup Vulcan Z 16GB (2x8GB) DDR4-3600",
      brand: "TeamGroup",
      price: 59999,
      originalPrice: 79999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.2,
      reviews: 90,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'ram',
      specs: ['16GB Kit', 'DDR4-3600', 'Heat Spreader', 'Intel XMP 2.0']
    },
    {
      id: 59,
      name: "Kingston A2000 500GB NVMe SSD PCIe 3.0",
      brand: "Kingston",
      price: 49999,
      originalPrice: 79999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.3,
      reviews: 150,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['500GB Capacity', 'PCIe 3.0', '2200MB/s Read', 'M.2 2280']
    },
    {
      id: 60,
      name: "Western Digital Blue 1TB SATA SSD",
      brand: "WD",
      price: 69999,
      originalPrice: 99999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.4,
      reviews: 200,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['1TB Capacity', 'SATA III', '560MB/s Read', '2.5\" Form Factor']
    },
    {
      id: 61,
      name: "Monitor AOC CQ27G2 27\" QHD 144Hz",
      brand: "AOC",
      price: 179999,
      originalPrice: 229999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.5,
      reviews: 180,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['27\" QHD', '144Hz', '1ms Response', 'FreeSync']
    },
    {
      id: 62,
      name: "Teclado Mecánico Redragon K552 RGB",
      brand: "Redragon",
      price: 49999,
      originalPrice: 79999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.3,
      reviews: 250,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'peripheral',
      specs: ['Blue Switches', 'RGB Lighting', 'TKL Layout', 'Budget Gaming']
    },
    {
      id: 63,
      name: "Mouse Gaming Logitech G502 HERO",
      brand: "Logitech",
      price: 59999,
      originalPrice: 89999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.6,
      reviews: 300,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['25K DPI', '11 Programmable Buttons', 'Adjustable Weights', 'HERO Sensor']
    },
    {
      id: 64,
      name: "Auriculares Gaming HyperX Cloud II",
      brand: "HyperX",
      price: 79999,
      originalPrice: 119999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.7,
      reviews: 400,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['Closed Back', '7.1 Surround', 'Detachable Mic', 'Comfortable']
    },
    {
      id: 65,
      name: "NVIDIA GeForce GTX 1660 Super 6GB GDDR6",
      brand: "Palit",
      price: 199999,
      originalPrice: 299999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.2,
      reviews: 150,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'gpu',
      specs: ['6GB GDDR6', '1080p Gaming', 'Turing Architecture', 'PCIe 3.0']
    },
    {
      id: 66,
      name: "AMD Radeon RX 6600 8GB GDDR6",
      brand: "ASRock",
      price: 179999,
      originalPrice: 279999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.3,
      reviews: 120,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'gpu',
      specs: ['8GB GDDR6', '1080p Gaming', 'RDNA 2', 'PCIe 4.0']
    },
    {
      id: 67,
      name: "Intel Core i5-12400F 6-Core 12th Gen",
      brand: "Intel",
      price: 199999,
      originalPrice: 299999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.4,
      reviews: 200,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'cpu',
      specs: ['6 Cores', '12 Threads', '4.4GHz Turbo', 'LGA1700']
    },
    {
      id: 68,
      name: "AMD Ryzen 5 5600X Procesador Gaming 6-Core",
      brand: "AMD",
      price: 179999,
      originalPrice: 279999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.5,
      reviews: 180,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'cpu',
      specs: ['6 Cores', '12 Threads', '4.6GHz Boost', 'AM4 Socket']
    },
    {
      id: 69,
      name: "MSI B660M-A WiFi DDR4 Motherboard",
      brand: "MSI",
      price: 149999,
      originalPrice: 199999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.3,
      reviews: 100,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['LGA1700', 'WiFi 6', 'DDR4', 'PCIe 4.0']
    },
    {
      id: 70,
      name: "ASUS Prime B550M-A WiFi Motherboard",
      brand: "ASUS",
      price: 129999,
      originalPrice: 179999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.2,
      reviews: 90,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['AM4 Socket', 'WiFi 6', 'DDR4', 'PCIe 4.0']
    },
    {
      id: 71,
      name: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-2666",
      brand: "Corsair",
      price: 89999,
      originalPrice: 129999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.1,
      reviews: 160,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'ram',
      specs: ['32GB Kit', 'DDR4-2666', 'Low Profile', 'Intel XMP 2.0']
    },
    {
      id: 72,
      name: "G.Skill Aegis 16GB (2x8GB) DDR4-3000",
      brand: "G.Skill",
      price: 69999,
      originalPrice: 99999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.0,
      reviews: 140,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'ram',
      specs: ['16GB Kit', 'DDR4-3000', 'Heat Spreader', 'Intel XMP 2.0']
    },
    {
      id: 73,
      name: "Samsung 870 EVO 2TB SATA SSD",
      brand: "Samsung",
      price: 129999,
      originalPrice: 179999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.6,
      reviews: 180,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['2TB Capacity', 'SATA III', '560MB/s Read', '2.5\" Form Factor']
    },
    {
      id: 74,
      name: "Crucial MX500 1TB SATA SSD",
      brand: "Crucial",
      price: 79999,
      originalPrice: 119999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.5,
      reviews: 220,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['1TB Capacity', 'SATA III', '560MB/s Read', '2.5\" Form Factor']
    },
    {
      id: 75,
      name: "Monitor BenQ ZOWIE XL2546K 24.5\" 240Hz",
      brand: "BenQ",
      price: 299999,
      originalPrice: 399999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.7,
      reviews: 95,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['24.5\" FHD', '240Hz', '0.5ms Response', 'DyAc+']
    },
    {
      id: 76,
      name: "Teclado Mecánico Cooler Master CK552",
      brand: "Cooler Master",
      price: 69999,
      originalPrice: 99999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.4,
      reviews: 130,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['Red Switches', 'RGB Lighting', 'Full Size', 'Aluminum Frame']
    },
    {
      id: 77,
      name: "Mouse Gaming Razer Viper Mini",
      brand: "Razer",
      price: 39999,
      originalPrice: 69999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.5,
      reviews: 280,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'peripheral',
      specs: ['8.5K DPI', '61g Weight', 'Optical Switches', 'Razer Chroma']
    },
    {
      id: 78,
      name: "Auriculares Gaming SteelSeries Arctis 5",
      brand: "SteelSeries",
      price: 99999,
      originalPrice: 149999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.6,
      reviews: 190,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['7.1 Surround', 'Retractable Mic', 'RGB Lighting', 'Comfortable']
    },
    {
      id: 79,
      name: "Fuente de Poder EVGA 600W 80+ Bronze",
      brand: "EVGA",
      price: 59999,
      originalPrice: 89999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.3,
      reviews: 250,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['600W', '80+ Bronze', 'Non-Modular', 'Reliable']
    },
    {
      id: 80,
      name: "Gabinete NZXT H510 Flow",
      brand: "NZXT",
      price: 89999,
      originalPrice: 129999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.5,
      reviews: 160,
      isNew: true,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['Mid Tower', 'Tempered Glass', 'Mesh Front', 'Excellent Airflow']
    },
    {
      id: 81,
      name: "NVIDIA GeForce GTX 1650 4GB GDDR6",
      brand: "Gigabyte",
      price: 149999,
      originalPrice: 249999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.1,
      reviews: 180,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'gpu',
      specs: ['4GB GDDR6', '1080p Gaming', 'Turing Architecture', 'PCIe 3.0']
    },
    {
      id: 82,
      name: "AMD Radeon RX 6500 XT 4GB GDDR6",
      brand: "Sapphire",
      price: 129999,
      originalPrice: 229999,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      rating: 4.0,
      reviews: 120,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'gpu',
      specs: ['4GB GDDR6', '1080p Gaming', 'RDNA 2', 'PCIe 4.0']
    },
    {
      id: 83,
      name: "Intel Core i3-12100F 4-Core 12th Gen",
      brand: "Intel",
      price: 119999,
      originalPrice: 179999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.2,
      reviews: 150,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'cpu',
      specs: ['4 Cores', '8 Threads', '4.3GHz Turbo', 'LGA1700']
    },
    {
      id: 84,
      name: "AMD Ryzen 3 4100 Procesador Gaming 4-Core",
      brand: "AMD",
      price: 99999,
      originalPrice: 159999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.1,
      reviews: 100,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'cpu',
      specs: ['4 Cores', '8 Threads', '4.0GHz Boost', 'AM4 Socket']
    },
    {
      id: 85,
      name: "Gigabyte B560M DS3H AC Motherboard",
      brand: "Gigabyte",
      price: 99999,
      originalPrice: 149999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.0,
      reviews: 80,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'motherboard',
      specs: ['LGA1200', 'WiFi 5', 'DDR4', 'PCIe 4.0']
    },
    {
      id: 86,
      name: "ASRock B450M Pro4 Motherboard",
      brand: "ASRock",
      price: 79999,
      originalPrice: 129999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.1,
      reviews: 110,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'motherboard',
      specs: ['AM4 Socket', 'DDR4', 'PCIe 3.0', 'Budget Friendly']
    },
    {
      id: 87,
      name: "Kingston Fury Beast 8GB (1x8GB) DDR4-3200",
      brand: "Kingston",
      price: 39999,
      originalPrice: 69999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.0,
      reviews: 200,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'ram',
      specs: ['8GB Single', 'DDR4-3200', 'Heat Spreader', 'Intel XMP 2.0']
    },
    {
      id: 88,
      name: "Patriot Signature Line 16GB (2x8GB) DDR4-2666",
      brand: "Patriot",
      price: 59999,
      originalPrice: 89999,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      rating: 4.0,
      reviews: 90,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'ram',
      specs: ['16GB Kit', 'DDR4-2666', 'Low Profile', 'Intel XMP 2.0']
    },
    {
      id: 89,
      name: "Seagate Barracuda 2TB HDD 7200RPM",
      brand: "Seagate",
      price: 49999,
      originalPrice: 79999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.2,
      reviews: 300,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['2TB Capacity', '7200RPM', 'SATA III', '3.5\" Form Factor']
    },
    {
      id: 90,
      name: "Western Digital Caviar Blue 1TB HDD",
      brand: "WD",
      price: 39999,
      originalPrice: 69999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.1,
      reviews: 400,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'storage',
      specs: ['1TB Capacity', '7200RPM', 'SATA III', '3.5\" Form Factor']
    },
    {
      id: 91,
      name: "Monitor ViewSonic XG2405 24\" FHD 144Hz",
      brand: "ViewSonic",
      price: 129999,
      originalPrice: 179999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.4,
      reviews: 140,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['24\" FHD', '144Hz', '1ms Response', 'FreeSync']
    },
    {
      id: 92,
      name: "Teclado Mecánico Tecware Phantom 87",
      brand: "Tecware",
      price: 39999,
      originalPrice: 69999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.2,
      reviews: 180,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'peripheral',
      specs: ['Outemu Switches', 'RGB Lighting', 'TKL Layout', 'Budget Gaming']
    },
    {
      id: 93,
      name: "Mouse Gaming SteelSeries Rival 3",
      brand: "SteelSeries",
      price: 29999,
      originalPrice: 59999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.3,
      reviews: 220,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'peripheral',
      specs: ['8.5K DPI', '77g Weight', 'Optical Sensor', 'SteelSeries Engine']
    },
    {
      id: 94,
      name: "Auriculares Gaming Turtle Beach Recon 200",
      brand: "Turtle Beach",
      price: 49999,
      originalPrice: 79999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.1,
      reviews: 160,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      category: 'peripheral',
      specs: ['Closed Back', '40mm Speakers', 'Flip-up Mic', 'Comfortable']
    },
    {
      id: 95,
      name: "Fuente de Poder Thermaltake Smart 500W",
      brand: "Thermaltake",
      price: 49999,
      originalPrice: 79999,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
      rating: 4.0,
      reviews: 180,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['500W', '80+ White', 'Non-Modular', 'Budget Option']
    },
    {
      id: 96,
      name: "Gabinete Cooler Master MasterBox Q300L",
      brand: "Cooler Master",
      price: 59999,
      originalPrice: 99999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.2,
      reviews: 120,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      category: 'peripheral',
      specs: ['Micro ATX', 'Acrylic Side Panel', 'Mesh Front', 'Compact Design']
    },
    {
      id: 97,
      name: "Webcam Logitech C920 HD Pro",
      brand: "Logitech",
      price: 69999,
      originalPrice: 119999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.5,
      reviews: 250,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['1080p HD', '30fps', 'Autofocus', 'Built-in Mic']
    },
    {
      id: 98,
      name: "Micrófono Blue Yeti USB",
      brand: "Blue",
      price: 99999,
      originalPrice: 159999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.7,
      reviews: 180,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['USB Condenser', '4 Polar Patterns', 'Studio Quality', 'Plug & Play']
    },
    {
      id: 99,
      name: "Mousepad Gaming SteelSeries QcK Heavy",
      brand: "SteelSeries",
      price: 19999,
      originalPrice: 39999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.4,
      reviews: 300,
      isNew: false,
      isBestSeller: true,
      freeShipping: false,
      category: 'peripheral',
      specs: ['900x400mm', '6mm Thick', 'Non-slip Base', 'Premium Surface']
    },
    {
      id: 100,
      name: "Cable HDMI 2.1 Ultra High Speed 3m",
      brand: "Cable Matters",
      price: 9999,
      originalPrice: 19999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      rating: 4.3,
      reviews: 400,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      category: 'peripheral',
      specs: ['48Gbps', '4K@120Hz', '8K@60Hz', 'VRR Support']
    },
    {
      id: 999,
      name: "RTX 4090 SÚPER OFERTA",
      brand: "NVIDIA",
      price: 999999,
      originalPrice: 1299999,
      image: rtx4090Super,
      rating: 5.0,
      reviews: 200,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      category: 'gpu',
      specs: ['24GB GDDR6X', '4K Gaming', 'Ray Tracing', 'DLSS 3.0']
    }
  ];

  // Calcular categorías dinámicamente basado en los productos reales
  const categories = [
    { 
      id: 'all', 
      name: 'Todos', 
      icon: <Sparkles className="h-5 w-5" />, 
      count: products.length 
    },
    { 
      id: 'gpu', 
      name: 'Placas de Video', 
      icon: <Zap className="h-5 w-5" />, 
      count: products.filter(p => p.category === 'gpu').length 
    },
    { 
      id: 'cpu', 
      name: 'Procesadores', 
      icon: <TrendingUp className="h-5 w-5" />, 
      count: products.filter(p => p.category === 'cpu').length 
    },
    { 
      id: 'motherboard', 
      name: 'Motherboards', 
      icon: <Award className="h-5 w-5" />, 
      count: products.filter(p => p.category === 'motherboard').length 
    },
    { 
      id: 'ram', 
      name: 'Memorias', 
      icon: <Grid className="h-5 w-5" />, 
      count: products.filter(p => p.category === 'ram').length 
    },
    { 
      id: 'storage', 
      name: 'Almacenamiento', 
      icon: <List className="h-5 w-5" />, 
      count: products.filter(p => p.category === 'storage').length 
    },
  ];

  // Filtrar productos basado en categoría activa y término de búsqueda
  useEffect(() => {
    console.log('Filtrando productos - Categoría activa:', activeCategory, 'Término de búsqueda:', searchTerm);
    let filtered = products;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
      console.log('Productos filtrados por categoría:', filtered.length);
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
    setProductsToShow(12); // Resetear a 12 productos cuando cambian los filtros
  }, [activeCategory, searchTerm, sortBy, products]);

  
  const handleLoadMore = () => {
    setProductsToShow(prev => prev + 12);
  };

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (product: any) => {
    console.log('🛒 Agregando producto al carrito:', product.name);
    console.log('📦 Producto completo:', product);
    addToCart(product);
    console.log('✅ Producto agregado al carrito');
    
    // Crear notificación visual moderna
    const notification = document.createElement('div');
    notification.className = `
      fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 
      text-white px-6 py-4 rounded-2xl shadow-2xl z-50 
      transform translate-x-full scale-95 opacity-0 transition-all duration-500 
      border border-green-400/30 backdrop-blur-sm max-w-sm
    `;
    
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="bg-white/20 p-2 rounded-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="flex-1">
          <div class="font-bold text-sm">¡Producto agregado!</div>
          <div class="text-xs opacity-90">${product.name}</div>
          <div class="text-xs opacity-75 mt-1">Carrito: ${currentCount} items</div>
        </div>
        <button class="text-white/70 hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0) scale(1)';
      notification.style.opacity = '1';
    }, 100);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.transform = 'translateX(100%) scale(0.95)';
        notification.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 500);
      }
    }, 4000);
  };

  const handleCategoryChange = (categoryId: string) => {
    console.log('Cambiando categoría a:', categoryId);
    setActiveCategory(categoryId);
    setSearchTerm(''); // Limpiar búsqueda al cambiar categoría
    
    // Mostrar notificación visual
    const categoryName = categories.find(c => c.id === categoryId)?.name || categoryId;
    const notification = document.createElement('div');
    notification.className = `
      fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 
      text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm font-semibold
    `;
    notification.textContent = `Filtrando por: ${categoryName}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Escuchar eventos de búsqueda desde el header
  useEffect(() => {
    const handleSearchProducts = (event: any) => {
      setSearchTerm(event.detail.searchTerm);
      setActiveCategory('all'); // Mostrar todos los productos cuando se busca
    };

    const handleFilterByCategory = (event: any) => {
      setActiveCategory(event.detail.category);
      setSearchTerm(''); // Limpiar búsqueda al filtrar por categoría
    };

    window.addEventListener('searchProducts', handleSearchProducts);
    window.addEventListener('filterByCategory', handleFilterByCategory);

    return () => {
      window.removeEventListener('searchProducts', handleSearchProducts);
      window.removeEventListener('filterByCategory', handleFilterByCategory);
    };
  }, []);

  // Manejar filtros del sidebar
  const handleSidebarFilterChange = (filters: any) => {
    // Aquí se implementaría la lógica de filtrado del sidebar
    console.log('Filtros del sidebar:', filters);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent dark:from-gray-100 dark:via-orange-300 dark:to-orange-400">
              Gaming Catalog
            </h1>
            <p className="text-xl text-gray-300 mb-6">Descubre el futuro del gaming con nuestra selección premium</p>
            
          </div>

        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Simplified Controls Bar for Mobile */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-8 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Products Count - Simplified for mobile */}
                <div className="flex items-center justify-between">
                  <div className="text-gray-900 dark:text-white">
                    <span className="text-lg sm:text-2xl font-bold text-orange-600">{filteredProducts.length}</span>
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 ml-2">productos</span>
                  </div>
                  
                  
                  {/* View Mode Toggle - Moved to top right on mobile */}
                  <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-gray-900 shadow-md text-orange-600'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-gray-900 shadow-md text-orange-600'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sort Dropdown - Full width on mobile */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-700 dark:text-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300 appearance-none cursor-pointer pr-10 text-sm"
                  >
                    <option value="popularity">Más Popular</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="rating">Mejor Calificación</option>
                    <option value="newest">Más Nuevos</option>
                    <option value="discount">Mayor Descuento</option>
                  </select>
                  <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Floating Control Panel - Hidden on mobile */}
            <div className="hidden lg:block fixed top-1/2 right-6 transform -translate-y-1/2 z-40 space-y-4">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-orange-200">
                <div className="space-y-3">
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {viewMode === 'grid' ? <List className="h-5 w-5 mx-auto" /> : <Grid className="h-5 w-5 mx-auto" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills - Always visible and responsive */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      console.log('Botón de categoría clickeado:', category.id);
                      handleCategoryChange(category.id);
                    }}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm lg:text-base ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                        : 'bg-white/10 dark:bg-gray-800 backdrop-blur-sm text-white hover:bg-white/20 dark:hover:bg-gray-700 border border-white/20 dark:border-gray-700'
                    }`}
                  >
                    <div className="scale-75 sm:scale-90 lg:scale-100">{category.icon}</div>
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden text-xs font-medium">
                      {category.name.split(' ')[0]}
                    </span>
                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeCategory === category.id 
                        ? 'bg-white/30 text-white' 
                        : 'bg-white/20 dark:bg-gray-700 text-white'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simplified Product Section - Hidden on mobile for better UX */}
            <div className="mb-6 sm:mb-12">
              <div className="hidden sm:block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-700 relative overflow-hidden">
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
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="text-white text-center lg:text-left">
                      <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">
                        Explorar Productos
                      </h2>
                      <div className="flex items-center justify-center lg:justify-start space-x-4">
                        <span className="text-3xl lg:text-4xl font-bold text-orange-400">{filteredProducts.length}</span>
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

              <div className={`relative z-10 grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.slice(0, productsToShow).length > 0 ? (
                  filteredProducts.slice(0, productsToShow).map((product, index) => (
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

            {/* Load More Section - Always show for debugging */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 sm:mt-12 lg:mt-20">
                <div className="bg-gradient-to-r from-gray-900 via-orange-900 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
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
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                        Descubre Más Gaming
                      </h3>
                      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-orange-300 mb-4 sm:mb-6">
                        <div className="hidden sm:block h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-16 lg:w-32" />
                        <span className="text-sm sm:text-base lg:text-lg font-semibold">
                          Mostrando {productsToShow} de {filteredProducts.length} productos
                        </span>
                        <div className="hidden sm:block h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-16 lg:w-32" />
                      </div>
                      
                      {/* Progress Visualization */}
                      <div className="max-w-md mx-auto mb-8">
                        <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-1000 relative"
                            style={{ width: `${(productsToShow / filteredProducts.length) * 100}%` }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-orange-300 mt-2">
                          <span>Inicio</span>
                          <span>{Math.round((productsToShow / filteredProducts.length) * 100)}% explorado</span>
                          <span>Completo</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botón Principal Simplificado */}
                    <button 
                      onClick={handleLoadMore}
                      className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-6 rounded-xl sm:rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/25 relative overflow-hidden text-sm sm:text-base lg:text-lg"
                    >
                      <div className="relative flex items-center justify-center space-x-2 sm:space-x-4">
                        <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 group-hover:animate-bounce" />
                        <span className="text-sm sm:text-base lg:text-xl">
                          Cargar Más 12
                        </span>
                        <div className="bg-white/20 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                          +12
                        </div>
                      </div>
                    </button>


                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-12 text-center">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">{filteredProducts.length}</div>
                              <div className="text-white/80 text-xs sm:text-sm">Productos Encontrados</div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">{productsToShow}</div>
                              <div className="text-white/80 text-xs sm:text-sm">Productos Mostrados</div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">
                          {filteredProducts.length > 0 ? Math.round((productsToShow / filteredProducts.length) * 100) : 0}%
                        </div>
                        <div className="text-white/80 text-xs sm:text-sm">Progreso</div>
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
      <style>{`
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