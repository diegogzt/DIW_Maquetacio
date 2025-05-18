/**
 * Slider automático para la cabecera
 * Implementa un slider de imágenes con transiciones suaves y controles
 * 
 * @author Claude
 * @version 1.0
 */

document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos del slider
    const sliderContainer = document.querySelector('.slider-container');

    // No continuar si no hay slider en la página
    if (!sliderContainer) return;

    const slides = document.querySelectorAll('.slide');

    // Variables de control
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Tiempo entre transiciones (ms)
    let isSliding = false;

    // Crear indicadores (puntos) para las diapositivas
    function createSlideIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'slider-indicators';

        // Crear un indicador para cada diapositiva
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'slider-indicator';
            if (index === 0) indicator.classList.add('active');

            // Event listener para cambiar a la diapositiva seleccionada
            indicator.addEventListener('click', () => {
                if (isSliding || currentSlide === index) return;
                clearInterval(slideInterval);
                goToSlide(index);
                startSlideInterval();
            });

            indicatorsContainer.appendChild(indicator);
        });

        // Añadir indicadores al DOM
        sliderContainer.appendChild(indicatorsContainer);
    }

    // Crear botones de navegación
    function createNavigationButtons() {
        // Si hay menos de 2 diapositivas, no se necesitan botones
        if (slides.length < 2) return;

        // Botón anterior
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-nav slider-prev';
        prevButton.innerHTML = '<span class="material-icons-round">chevron_left</span>';
        prevButton.setAttribute('aria-label', 'Diapositiva anterior');

        // Botón siguiente
        const nextButton = document.createElement('button');
        nextButton.className = 'slider-nav slider-next';
        nextButton.innerHTML = '<span class="material-icons-round">chevron_right</span>';
        nextButton.setAttribute('aria-label', 'Diapositiva siguiente');

        // Event listeners
        prevButton.addEventListener('click', () => {
            if (isSliding) return;
            clearInterval(slideInterval);
            prevSlide();
            startSlideInterval();
        });

        nextButton.addEventListener('click', () => {
            if (isSliding) return;
            clearInterval(slideInterval);
            nextSlide();
            startSlideInterval();
        });

        // Añadir botones al DOM
        sliderContainer.appendChild(prevButton);
        sliderContainer.appendChild(nextButton);
    }

    // Ir a la diapositiva anterior
    function prevSlide() {
        goToSlide(currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1);
    }

    // Ir a la diapositiva siguiente
    function nextSlide() {
        goToSlide(currentSlide + 1 >= slides.length ? 0 : currentSlide + 1);
    }

    // Ir a una diapositiva específica
    function goToSlide(index) {
        if (isSliding) return;
        isSliding = true;

        // Actualizar indicadores
        const indicators = document.querySelectorAll('.slider-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        // Quitar clase active de la diapositiva actual
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('fade-out');

        // Después de un breve retraso, añadir clase active a la nueva diapositiva
        setTimeout(() => {
            slides[currentSlide].classList.remove('fade-out');
            currentSlide = index;
            slides[currentSlide].classList.add('active');

            // Permitir la próxima transición después de completar la actual
            setTimeout(() => {
                isSliding = false;
            }, 500); // Tiempo de transición
        }, 500); // Tiempo de transición
    }

    // Iniciar intervalo para cambio automático de diapositivas
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, intervalTime);
    }

    // Pausar el slider al pasar el ratón sobre él
    function setupPauseOnHover() {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }

    // Función de inicialización
    function initSlider() {
        // Si hay más de una diapositiva, configurar controles
        if (slides.length > 1) {
            createSlideIndicators();
            createNavigationButtons();
            setupPauseOnHover();
            startSlideInterval();
        }

        // Añadir classes para animaciones
        slides.forEach(slide => {
            slide.classList.add('with-transition');
        });
    }

    // Iniciar slider
    initSlider();
});