/**
 * Animación de navbar con scroll - Ejercicio 5
 * Este script implementa una animación en la barra de navegación al hacer scroll
 */

// Cuando el documento está listo
document.addEventListener("DOMContentLoaded", function() {
    // Referencia al menú principal
    const navbar = document.getElementById("menu-principal");
    
    // Función que se ejecuta al hacer scroll
    window.onscroll = function() {
        scrollFunction();
    };
    
    // Función para cambiar el tamaño del navbar al hacer scroll
    function scrollFunction() {
        // Si hemos bajado más de 50px desde la parte superior
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            // Reducir tamaño del navbar
            navbar.style.padding = "5px 10px";
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
            navbar.style.transition = "all 0.4s ease";
            
            // También podemos reducir el tamaño del texto de los enlaces
            const links = navbar.getElementsByTagName("a");
            for (let i = 0; i < links.length; i++) {
                links[i].style.fontSize = "0.9rem";
                links[i].style.transition = "all 0.4s ease";
            }
        } else {
            // Restaurar tamaño original del navbar
            navbar.style.padding = "1rem 0";
            navbar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
            
            // Restaurar tamaño original del texto
            const links = navbar.getElementsByTagName("a");
            for (let i = 0; i < links.length; i++) {
                links[i].style.fontSize = "1rem";
            }
        }
    }
});