# GamerTech - Pro Gaming Store

¡Bienvenido a **GamerTech**! Esta es una tienda web ultra moderna de hardware y periféricos gamer, desarrollada con las mejores tecnologías frontend para ofrecer una experiencia profesional, rápida y totalmente responsive.

---

## 🚀 Tecnologías Utilizadas

- **React** (Vite)
- **TypeScript**
- **Tailwind CSS** (con breakpoints personalizados y animaciones)
- **LocalStorage** (persistencia de carrito y favoritos)
- **SVG Icons** (Lucide)
- **Imágenes locales optimizadas**

---

## 🎮 Características Principales

- **Catálogo de productos** con imágenes locales y detalles completos
- **Carrito de compras** funcional y persistente
- **Favoritos** (wishlist) con persistencia
- **Búsqueda avanzada** y filtrado por categorías
- **Animaciones modernas** y microinteracciones
- **Diseño 100% responsive** (mobile, tablet, desktop)
- **Modales de producto** y carrito
- **Botón "Cargar más"** para paginación progresiva
- **Newsletter** y footer profesional
- **Soporte para dark mode**

---

## 📦 Instalación y Ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/gamertech-store.git
   cd gamertech-store
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador:**
   - Normalmente en [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Estructura de Carpetas

```
PCGamers_Website-REMASTERED/
├── public/
├── src/
│   ├── assets/           # Imágenes locales de productos
│   ├── components/       # Componentes React (Header, ProductCard, etc)
│   ├── hooks/            # Custom hooks (useCart, useFavorites)
│   ├── App.tsx           # Composición principal
│   └── index.css         # Estilos globales y Tailwind
├── tailwind.config.js    # Configuración de breakpoints y animaciones
├── index.html            # Favicon y metadatos
└── README.md
```

---

## ✨ Experiencia de Usuario

- **Mobile First:** Navegación y compra optimizadas para celulares y tablets.
- **Animaciones suaves:** Transiciones, hover, feedback visual y microinteracciones.
- **Accesibilidad:** Contrastes, foco y navegación por teclado.
- **Carga rápida:** Imágenes locales y optimización de recursos.

---

## 🛠️ Personalización

- **Agrega tus productos** editando el array en `ProductCatalog.tsx` y colocando imágenes en `src/assets`.
- **Edita los breakpoints** en `tailwind.config.js` para adaptar el diseño a tus necesidades.
- **Cambia el favicon** en `index.html` (SVG gamepad por defecto).

---

## 📢 Créditos y Licencia

- **Desarrollado por:** [Tu Nombre o Equipo]
- **Icons:** [Lucide](https://lucide.dev/)
- **Framework:** [Vite](https://vitejs.dev/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)

Este proyecto es open source. ¡Siéntete libre de mejorarlo y compartirlo!
