document.addEventListener('DOMContentLoaded', () => {
    // Lógica para las tarjetas de la agenda
    const cards = document.querySelectorAll('.card-inner');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        cardObserver.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.product-stream-track');
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const totalUniqueCards = 60; // **CAMBIO:** Ahora son 30 imágenes únicas
    let cardWidth;

    const scrollDuration = 1000;
    const scanDuration = 2000;
    const pauseAfterScan = 1000;

    let currentCardIndex = 0;

    const updateCardWidth = () => {
        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth;
        }
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    function startNextAnimation() {
        if (currentCardIndex >= totalUniqueCards) {
            currentCardIndex = 0;
        }

        const currentCard = cards[currentCardIndex];
        const digitalImage = currentCard.querySelector('.product-image.digital');
        const scanner = currentCard.querySelector('.scan-effect');

        cards.forEach(card => card.classList.remove('active-hologram'));

        const scrollPosition = currentCardIndex * cardWidth;
        track.style.transition = `transform ${scrollDuration}ms linear`;
        track.style.transform = `translateX(-${scrollPosition}px)`;

        setTimeout(() => {
            currentCard.classList.add('active-hologram');
            digitalImage.style.transition = `clip-path ${scanDuration}ms linear`;
            digitalImage.style.clipPath = 'inset(0 0% 0 0)';

            scanner.style.transition = `transform ${scanDuration}ms linear, opacity ${scanDuration / 5}ms linear`;
            scanner.style.opacity = '1';
            scanner.style.transform = `translateX(100%)`;

            scanner.addEventListener('transitionend', function handler() {
                scanner.style.opacity = '0';
                scanner.style.transform = `translateX(0%)`;
                scanner.removeEventListener('transitionend', handler);

                setTimeout(() => {
                    digitalImage.style.transition = 'none';
                    digitalImage.style.clipPath = 'inset(0 100% 0 0)';
                    currentCard.classList.remove('active-hologram');
                    currentCardIndex++;
                    startNextAnimation();
                }, pauseAfterScan);
            }, { once: true });

        }, scrollDuration);
    }
    startNextAnimation();
});

