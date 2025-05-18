/**
 * Script principal del sitio web
 * Gestiona las funcionalidades generales y la inicialización de componentes
 * 
 * @author Claude
 * @version 1.0
 */

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar biblioteca de animaciones AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mostrar y ocultar el preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(function () {
        preloader.classList.add('hide');
    }, 1000);

    // Gestión de tabs en el menú
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Quitar clase activa de todas las pestañas
            menuTabs.forEach(t => t.classList.remove('active'));

            // Agregar clase activa a la pestaña seleccionada
            tab.classList.add('active');

            // Ocultar todos los contenidos
            menuContents.forEach(content => {
                content.classList.remove('active');
            });

            // Mostrar el contenido correspondiente
            const target = tab.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });

    // Filtrado de la galería
    const filterButtons = document.querySelectorAll('.galeria-filter');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Agregar clase activa al botón seleccionado
            button.classList.add('active');

            const filter = button.dataset.filter;

            galeriaItems.forEach(item => {
                if (filter === 'all' || item.dataset.filter === filter) {
                    item.style.display = 'block';

                    // Animación de aparición
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';

                    // Ocultar después de la animación
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Validación del formulario de reserva
    const reservaForm = document.getElementById('formulario-reserva');

    if (reservaForm) {
        reservaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefon').value;
            const personas = document.getElementById('persones').value;
            const fecha = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;

            // Validación básica
            if (!nombre || !email || !telefono || !personas || !fecha || !hora) {
                alert('Por favor, completa todos los campos obligatorios.');
                return false;
            }

            // Validar email con expresión regular
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, introduce un email válido.');
                return false;
            }

            // Validar teléfono (solo números, mínimo 9 dígitos)
            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                alert('Por favor, introduce un número de teléfono válido (mínimo 9 dígitos).');
                return false;
            }

            // Validar fecha (que no sea anterior a hoy)
            const fechaSeleccionada = new Date(fecha);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            if (fechaSeleccionada < hoy) {
                alert('La fecha de reserva no puede ser anterior a hoy.');
                return false;
            }

            // Si todo es válido, mostrar mensaje de éxito
            alert('¡Reserva realizada con éxito! Nos pondremos en contacto contigo pronto para confirmarla.');
            reservaForm.reset();
        });
    }

    // Animación de números en estadísticas
    // Animación de números en estadísticas
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const targetNumber = parseInt(stat.textContent);
            const duration = 2000; // Duración de la animación en ms
            const frameDuration = 1000 / 60; // duración de cada frame (60fps)
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            // Valor inicial
            let initialValue = 0;

            // Función de animación
            const animateCounter = () => {
                frame++;
                // Calcular progreso de la animación
                const progress = frame / totalFrames;
                // Calcular valor actual con easing
                const currentValue = Math.round(initialValue + (targetNumber - initialValue) * easeOutQuad(progress));

                // Actualizar el texto
                stat.textContent = currentValue;

                // Continuar la animación si no ha terminado
                if (frame < totalFrames) {
                    requestAnimationFrame(animateCounter);
                }
            };

            // Función de easing para suavizar la animación
            function easeOutQuad(t) {
                return t * (2 - t);
            }

            // Comenzar la animación
            requestAnimationFrame(animateCounter);
        });
    }

    // Iniciar la animación cuando la sección es visible
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statSection = document.querySelector('.nosaltres-stats');
    if (statSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(statSection);
    }

    // Suavizar el desplazamiento a las secciones
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Solo procesar enlaces internos
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                // Si es solo "#", ir al inicio de la página
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Calcular posición considerando el menú fijo
                    const navbarHeight = document.getElementById('menu-principal').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animación de entrada para elementos cuando son visibles
    function setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');

        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    setupScrollReveal();

    // Mensaje de cookies (opcional)
    function setupCookieConsent() {
        const cookieConsent = document.createElement('div');
        cookieConsent.className = 'cookie-consent';
        cookieConsent.innerHTML = `
            <div class="cookie-text">
                <p>Aquest lloc web utilitza cookies per millorar la seva experiència. En continuar navegant, accepta l'ús de cookies.</p>
            </div>
            <div class="cookie-buttons">
                <button class="btn-accept">Acceptar</button>
                <button class="btn-more">Més informació</button>
            </div>
        `;

        // Comprobar si el usuario ya ha aceptado las cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            document.body.appendChild(cookieConsent);

            // Evento para aceptar cookies
            cookieConsent.querySelector('.btn-accept').addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieConsent.classList.add('hiding');
                setTimeout(() => {
                    cookieConsent.remove();
                }, 500);
            });

            // Evento para más información
            cookieConsent.querySelector('.btn-more').addEventListener('click', () => {
                // Redirigir a la página de política de cookies
                // window.location.href = 'politica-cookies.html';
                alert('Aquí se mostraría la información sobre la política de cookies');
            });
        }
    }

    // Iniciar aviso de cookies
    setTimeout(setupCookieConsent, 2000);
});