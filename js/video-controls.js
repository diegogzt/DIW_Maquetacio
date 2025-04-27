/**
 * Controles personalizados para vídeo - Ejercicio 4
 * Este script implementa controles personalizados para el vídeo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const video = document.getElementById('custom-video');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const unmuteBtn = document.getElementById('unmute-btn');

    // Función para reproducir el vídeo
    function playVideo() {
        video.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }

    // Función para pausar el vídeo
    function pauseVideo() {
        video.pause();
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    }

    // Función para activar el sonido
    function unmuteVideo() {
        video.muted = false;
        muteBtn.style.display = 'none';
        unmuteBtn.style.display = 'inline-block';
    }

    // Función para silenciar el vídeo
    function muteVideo() {
        video.muted = true;
        unmuteBtn.style.display = 'none';
        muteBtn.style.display = 'inline-block';
    }

    // Evento click para reproducir
    playBtn.addEventListener('click', playVideo);

    // Evento click para pausar
    pauseBtn.addEventListener('click', pauseVideo);

    // Evento click para activar sonido
    muteBtn.addEventListener('click', unmuteVideo);

    // Evento click para silenciar
    unmuteBtn.addEventListener('click', muteVideo);

    // También permitir clic en el vídeo para reproducir/pausar
    video.addEventListener('click', function() {
        if (video.paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    });

    // Si el vídeo termina, mostrar botón de reproducción
    video.addEventListener('ended', function() {
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    });
});