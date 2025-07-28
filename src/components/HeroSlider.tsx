import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Cpu, Monitor } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "RTX 4090 SÚPER OFERTA",
      subtitle: "La mejor placa de video del mercado",
      description: "Rendimiento extremo para gaming en 4K",
      price: "$899.999",
      discount: "25% OFF",
      bg: "bg-gradient-to-r from-orange-600 via-orange-500 to-red-500",
      icon: <Zap className="h-12 w-12" />,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
    },
    {
      id: 2,
      title: "RYZEN 9 7950X3D",
      subtitle: "Procesador de alta gama",
      description: "El poder que necesitas para gaming extremo",
      price: "$649.999",
      discount: "15% OFF",
      bg: "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500",
      icon: <Cpu className="h-12 w-12" />,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg"
    },
    {
      id: 3,
      title: "MONITOR GAMING 4K",
      subtitle: "240Hz - HDR - G-Sync",
      description: "Experiencia visual incomparable",
      price: "$459.999",
      discount: "30% OFF",
      bg: "bg-gradient-to-r from-orange-600 via-orange-400 to-amber-400",
      icon: <Monitor className="h-12 w-12" />,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`${slide.bg} h-full relative`}>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                <div className="text-white z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    {slide.icon}
                    <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                      {slide.discount}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl mb-4 opacity-90">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg mb-6 opacity-80">
                    {slide.description}
                  </p>
                  <div className="flex items-center space-x-4 mb-8">
                    <span className="text-3xl font-bold">{slide.price}</span>
                    <span className="text-lg line-through opacity-60">
                      ${parseInt(slide.price.replace(/[$.]/g, '')) * 1.3}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors transform hover:scale-105">
                      COMPRAR AHORA
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-orange-600 transition-colors">
                      VER DETALLES
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-80 object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;