/**
 * Animación de navbar con scroll 
 * Este script implementa animaciones avanzadas en la barra de navegación
 * al hacer scroll y gestiona el menú móvil
 * 
 * @author dgtovar (mejorado por Claude)
 * @version 2.0
 */

// Esperamos a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Referencias a elementos del DOM
    const navbar = document.getElementById("menu-principal");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const menuContainer = document.querySelector(".menu-container");
    const btnFlotante = document.getElementById("btn-flotante");
    const backToTopBtn = document.getElementById("back-to-top");
    const logoNav = document.querySelector(".logo-nav");

    // Variables para detectar dirección del scroll
    let lastScrollTop = 0;
    let scrollDirection = 'down';

    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        // Cambiamos el estado de las barras (animación)
        mobileMenuBtn.classList.toggle('active');
        menuContainer.classList.toggle('active');

        // Si el menú está abierto, bloqueamos el scroll
        if (menuContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';

            // Transformamos las barras en una X
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            document.body.style.overflow = '';

            // Restauramos las barras
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (menuContainer.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Event listener para el botón del menú móvil
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Función que se ejecuta al hacer scroll
    function scrollFunction() {
        // Detectamos la posición actual del scroll
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        // Determinamos la dirección del scroll
        scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';

        // Guardamos la posición actual para la próxima comparación
        lastScrollTop = currentScrollTop;

        // Si hemos bajado más de 100px desde la parte superior
        if (currentScrollTop > 100) {
            // Aplicamos clase 'scrolled' al navbar
            navbar.classList.add("scrolled");

            // Modificamos estilos del navbar cuando hacemos scroll hacia abajo
            navLinks.forEach(link => {
                link.style.fontSize = "0.6rem";
                link.style.transition = "all 0.3s ease";
            });

            // Mostrar el botón "volver arriba" cuando bajamos lo suficiente
            if (currentScrollTop > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        } else {
            // Restauramos el navbar a su estado original
            navbar.classList.remove("scrolled");

            // Restauramos tamaño de texto
            navLinks.forEach(link => {
                link.style.fontSize = "";
            });

            // Ocultamos el botón "volver arriba"
            backToTopBtn.classList.remove('visible');
        }

        // Gestión del botón flotante de reserva
        if (currentScrollTop > 300) {
            btnFlotante.style.transform = "translateY(0)";
            btnFlotante.style.opacity = "1";
        } else {
            btnFlotante.style.transform = "translateY(100px)";
            btnFlotante.style.opacity = "0";
        }

        // Ocultamos el botón flotante cerca del footer
        const footerPosition = document.querySelector('footer').offsetTop;
        if (currentScrollTop > (footerPosition - 1000)) {
            btnFlotante.style.transform = "translateY(100px)";
            btnFlotante.style.opacity = "0";
        }

        // Efecto parallax en la cabecera
        const headerImage = document.querySelector('.slider-container .active img');
        if (headerImage && currentScrollTop < window.innerHeight) {
            headerImage.style.transform = `translateY(${currentScrollTop * 0.4}px)`;
        }
    }

    // Llamamos a la función al cargar la página
    scrollFunction();

    // Evento scroll para toda la ventana
    window.addEventListener('scroll', scrollFunction);

    // Evento click para el botón "volver arriba"
    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gestión de las secciones activas en el menú
    function highlightNavLinks() {
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
                } else {
                    document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('active');
                }
            });
        });
    }

    // Inicializar resaltado de enlaces de navegación
    highlightNavLinks();
});