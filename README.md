# Restaurant Els Coberts - Proyecto Multimedia

Implementación de transiciones, animaciones y elementos multimedia para el sitio web del Restaurant Els Coberts.

## 🌟 Características Implementadas

### 1️⃣ Transiciones CSS
- **Galería de imágenes**: Transición con `scale`, `rotate` y `grayscale` en las imágenes al hacer hover.
  - Ubicación: `.galeria-item img` en `styles.css` (líneas 186-196)
- **Menú de navegación**: Transición personalizada con 3 propiedades (color, letter-spacing y text-shadow).
  - Ubicación: `.menu-container a` en `styles.css` (líneas 228-242)

### 2️⃣ Animaciones CSS
- **Texto de cabecera**: Animación que hace aparecer el texto gradualmente, moviéndolo hacia arriba y cambiando el color de naranja a blanco.
  - Ubicación: `@keyframes titleAnimation` y `.header-content h1` en `styles.css` (líneas 107-133)
- **Texto secundario**: Animación con 4 frames que modifica 3 propiedades (scale, translateX y opacity).
  - Ubicación: `@keyframes textAnimation` y `.header-content p` en `styles.css` (líneas 136-168)

### 3️⃣ Integración de Video
- **Video con controles nativos**: Implementación básica con controles HTML5 nativos.
  - Ubicación: `#restaurant-video` en la sección "videos" de `index.html` y estilos asociados en `styles.css`
- **Video con controles personalizados**: Implementación avanzada con controles creados manualmente usando iconos de Google.
  - Ubicación: `.custom-video-container` en `index.html` y estilos en `styles.css`, funcionalidad en `js/video-controls.js`

### 4️⃣ Animación con JavaScript
- **Menú responsive con scroll**: Animación del menú que cambia de tamaño al hacer scroll.
  - Ubicación: Funcionalidad en `js/navbar-scroll.js`

## 📁 Estructura de Archivos

```
DIW_Maquetacio/
├── index.html                  # Estructura HTML principal
├── styles.css                  # Estilos CSS incluyendo transiciones y animaciones
├── js/
│   ├── video-controls.js       # Controles personalizados para el video
│   └── navbar-scroll.js        # Animación del menú con scroll
├── img/                        # Imágenes del sitio
└── video.mp4                   # Video del restaurante
```

## 🚀 Cómo Funciona

1. **Transiciones de Galería**: Al pasar el ratón sobre las imágenes, éstas se agrandan, rotan ligeramente y adquieren un efecto de escala de grises.

2. **Animación de Cabecera**: Al cargar la página, el título aparece gradualmente desde abajo, cambiando de color naranja a blanco.

3. **Video con Controles**: Los controles personalizados permiten:
   - Reproducir/pausar el video
   - Activar/desactivar el sonido
   - También se puede hacer clic directamente en el video para reproducir/pausar

4. **Menú Responsive**: Al hacer scroll, el menú se hace más pequeño para ocupar menos espacio en la pantalla.

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Transiciones, Animaciones, Flexbox, Grid)
- JavaScript (Vanilla JS)
- Material Icons de Google

---

Desarrollado por Diego Gómez Tovar
