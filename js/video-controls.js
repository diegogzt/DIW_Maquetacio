/**
 * Controles personalizados para vídeo - Avanzado
 * Este script implementa controles personalizados mejorados para los vídeos
 * con opciones de reproducción, pausa, silencio, y barra de progreso.
 * 
 * @author dgtovar (mejorado por Claude)
 * @version 2.0
 */

document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos del DOM
    const video = document.getElementById('custom-video');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const unmuteBtn = document.getElementById('unmute-btn');
    const progressBar = document.querySelector('.video-progress-bar');
    const progressIndicator = document.querySelector('.video-progress-indicator');
    const videoContainer = document.querySelector('.custom-video-container');
    const controls = document.querySelector('.custom-controls');

    // Variables para mantener el estado
    let isPlaying = false;
    let isMuted = true;
    let hideControlsTimeout;

    // Función para mostrar/ocultar controles automáticamente
    function handleControlsVisibility() {
        // Mostrar controles
        controls.style.opacity = '1';

        // Limpiar cualquier temporizador anterior
        clearTimeout(hideControlsTimeout);

        // Configurar temporizador para ocultar controles después de 3 segundos
        hideControlsTimeout = setTimeout(() => {
            if (isPlaying) {
                controls.style.opacity = '0.3';
            }
        }, 3000);
    }

    // Función para reproducir el vídeo
    function playVideo() {
        // Validación de que el vídeo está disponible
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
            video.play().then(() => {
                isPlaying = true;
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';

                // Actualizar barra de progreso mientras se reproduce
                updateProgressBar();

                // Ocultar controles después de un tiempo
                handleControlsVisibility();

            }).catch(error => {
                console.error('Error al reproducir el vídeo:', error);
                // Intentar reproducir nuevamente después de un evento de interacción
                videoContainer.addEventListener('click', function retryPlay() {
                    video.play().catch(console.error);
                    videoContainer.removeEventListener('click', retryPlay);
                });
            });
        } else {
            // Si el vídeo no está listo, esperar un evento de datos disponibles
            video.addEventListener('canplay', playVideo, { once: true });
        }
    }

    // Función para pausar el vídeo
    function pauseVideo() {
        video.pause();
        isPlaying = false;
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';

        // Mostrar controles siempre cuando está pausado
        controls.style.opacity = '1';
        clearTimeout(hideControlsTimeout);
    }

    // Función para activar el sonido
    function unmuteVideo() {
        video.muted = false;
        isMuted = false;
        muteBtn.style.display = 'none';
        unmuteBtn.style.display = 'inline-block';
    }

    // Función para silenciar el vídeo
    function muteVideo() {
        video.muted = true;
        isMuted = true;
        unmuteBtn.style.display = 'none';
        muteBtn.style.display = 'inline-block';
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        if (video.duration) {
            const percentage = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${percentage}%`;

            // Actualizar posición del indicador
            progressIndicator.style.left = `${percentage}%`;

            // Mostrar indicador durante la reproducción
            if (isPlaying && video.currentTime > 0) {
                progressIndicator.style.display = 'block';
            }

            // Solicitar siguiente fotograma para animación suave
            if (isPlaying) {
                requestAnimationFrame(updateProgressBar);
            }
        }
    }

    // Función para saltar a una posición en el vídeo al hacer clic en la barra de progreso
    function skipToPosition(e) {
        const progressContainer = document.querySelector('.video-progress-container');
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;

        if (video.duration) {
            video.currentTime = pos * video.duration;
            updateProgressBar();
        }
    }

    // Event listeners para los botones de control
    playBtn.addEventListener('click', playVideo);
    pauseBtn.addEventListener('click', pauseVideo);
    muteBtn.addEventListener('click', unmuteVideo);
    unmuteBtn.addEventListener('click', muteVideo);

    // Event listener para clic en el vídeo (reproducir/pausar)
    videoContainer.addEventListener('click', function (e) {
        // Evitar que el clic en los controles dispare este evento
        if (e.target.closest('.custom-controls') === null) {
            if (isPlaying) {
                pauseVideo();
            } else {
                playVideo();
            }
        }
    });

    // Event listener para la barra de progreso
    document.querySelector('.video-progress-container').addEventListener('click', skipToPosition);

    // Mostrar controles al mover el ratón sobre el vídeo
    videoContainer.addEventListener('mousemove', handleControlsVisibility);

    // Ocultar controles al salir del vídeo
    videoContainer.addEventListener('mouseleave', function () {
        if (isPlaying) {
            controls.style.opacity = '0.3';
        }
    });

    // Detectar cuando el vídeo termina
    video.addEventListener('ended', function () {
        pauseVideo();
        // Opcional: Reiniciar el vídeo
        video.currentTime = 0;
        updateProgressBar();
    });

    // Gestionar cambios en los controles nativos del vídeo
    video.addEventListener('play', function () {
        isPlaying = true;
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    });

    video.addEventListener('pause', function () {
        isPlaying = false;
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    });

    video.addEventListener('volumechange', function () {
        if (video.muted) {
            unmuteBtn.style.display = 'none';
            muteBtn.style.display = 'inline-block';
        } else {
            muteBtn.style.display = 'none';
            unmuteBtn.style.display = 'inline-block';
        }
    });

    // Event listeners para teclado
    document.addEventListener('keydown', function (e) {
        // Solo actuar si el vídeo está en el viewport
        const rect = videoContainer.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (isInViewport) {
            switch (e.key) {
                case ' ':
                case 'k':
                    // Espacio o K: reproducir/pausar
                    e.preventDefault();
                    isPlaying ? pauseVideo() : playVideo();
                    break;
                case 'm':
                    // M: silenciar/activar sonido
                    e.preventDefault();
                    isMuted ? unmuteVideo() : muteVideo();
                    break;
                case 'ArrowRight':
                    // Flecha derecha: avanzar 5 segundos
                    e.preventDefault();
                    video.currentTime = Math.min(video.duration, video.currentTime + 5);
                    updateProgressBar();
                    break;
                case 'ArrowLeft':
                    // Flecha izquierda: retroceder 5 segundos
                    e.preventDefault();
                    video.currentTime = Math.max(0, video.currentTime - 5);
                    updateProgressBar();
                    break;
                case '0':
                case 'Home':
                    // 0 o Inicio: ir al principio
                    e.preventDefault();
                    video.currentTime = 0;
                    updateProgressBar();
                    break;
                case 'End':
                    // Fin: ir al final
                    e.preventDefault();
                    video.currentTime = video.duration;
                    updateProgressBar();
                    break;
            }
        }
    });

    // Inicialización
    updateProgressBar();
});