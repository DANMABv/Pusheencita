document.addEventListener('DOMContentLoaded', () => {
    const pusheenImages = document.querySelectorAll('.pusheen-float');
    const messagePopup = document.getElementById('message-popup');
    const heartButton = document.getElementById('heart-button');
    const heartsContainer = document.getElementById('hearts-container');
    const mewSounds = [
        document.getElementById('mew1-sound'),
        document.getElementById('mew2-sound'),
        document.getElementById('mew3-sound')
    ];
    const backgroundMusic = document.getElementById('background-music');
    const heartsSound = document.getElementById('hearts-sound');

    // Intentar reproducir música de fondo al cargar
    const playBackgroundMusic = () => {
        backgroundMusic.play().catch(error => {
            console.log('Error al reproducir música de fondo:', error);
            // Intentar reproducir tras interacción del usuario
            document.body.addEventListener('click', () => {
                backgroundMusic.play().catch(err => console.log('Error tras interacción:', err));
            }, { once: true });
        });
    };
    playBackgroundMusic();

    // Manejar clics en imágenes de Pusheen
    pusheenImages.forEach(image => {
        image.addEventListener('click', () => {
            const message = image.getAttribute('data-message');
            if (message) {
                messagePopup.textContent = message;
                messagePopup.classList.add('show');
                setTimeout(() => {
                    messagePopup.classList.remove('show');
                }, 3000); // Desaparece después de 3 segundos

                // Reproducir un sonido "mew" aleatorio
                const randomMew = mewSounds[Math.floor(Math.random() * mewSounds.length)];
                randomMew.currentTime = 0;
                randomMew.play().catch(error => console.log('Error al reproducir sonido mew:', error));
            }
        });
    });

    // Manejar clics en el botón de corazón
    heartButton.addEventListener('click', () => {
        heartButton.disabled = true;
        heartsSound.currentTime = 0; // Reinicia el sonido
        heartsSound.play().catch(error => console.log('Error al reproducir sonido de corazones:', error));

        // Crear 10 corazones
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = '💖';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animation = `floatHeart ${1 + Math.random()}s linear`;
            heartsContainer.appendChild(heart);

            // Eliminar corazón después de la animación
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }

        // Reactivar botón después de 3 segundos
        setTimeout(() => {
            heartButton.disabled = false;
        }, 3000);
    });
});