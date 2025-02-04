document.addEventListener("DOMContentLoaded", function () {
    // Cambiar el modelo 3D al hacer clic en un botón
    const button = document.getElementById('changeModelButton');
    if (button) {
        button.addEventListener('click', function () {
            const marker = document.querySelector('a-marker');
            const box = marker.querySelector('a-box');
            box.setAttribute('color', '#FF5733');
            box.setAttribute('position', '0 1 0');
        });
    }

    // Detectar cuando un marcador es encontrado
    const marker = document.querySelector('a-marker');
    if (marker) {
        marker.addEventListener('markerFound', function () {
            console.log('¡Marcador detectado!');
            const box = marker.querySelector('a-box');
            box.setAttribute('color', '#FFC300'); // Cambio de color
        });

        // Detectar cuando un marcador es perdido
        marker.addEventListener('markerLost', function () {
            console.log('¡Marcador perdido!');
            const box = marker.querySelector('a-box');
            box.setAttribute('color', '#FF5733'); // Restablecer color
        });
    }
});
