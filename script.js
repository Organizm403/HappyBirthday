const card = document.getElementById('card');
const music = document.getElementById('music');
const volumeControl = document.getElementById('volume');
const slides = document.querySelectorAll('.slide');
let isCardOpen = false;
let currentSlide = 0;
const totalSlides = slides.length;

// Параллакс-эффект
let isParallaxEnabled = true;

const handleMove = (e) => {
    if (!isCardOpen && isParallaxEnabled) {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 5;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
};

document.addEventListener('mousemove', handleMove);

// Конфетти-эффект
function createConfetti() {
    const colors = ['#ff6f91', '#4a90e2', '#6c5ce7', '#2ecc71'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    
    for(let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(confetti);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 3000);
}

// Обработчик открытия
function openCard() {
    if (!isCardOpen) {
        isCardOpen = true;
        card.classList.add('open');
        createConfetti();
        music.play().catch(() => {});
        startSlider();
        
        // Отключаем параллакс после открытия
        isParallaxEnabled = false;
        card.style.transform = 'rotateY(180deg)';
    }
}

// Обработчики событий
card.addEventListener('click', openCard);
card.addEventListener('touchstart', (e) => {
    e.preventDefault();
    openCard();
});

// Управление громкостью
volumeControl.addEventListener('input', () => {
    music.volume = volumeControl.value;
});

// Слайдер
function startSlider() {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }, 4000);
}

// Адаптивность
window.addEventListener('resize', () => {
    if (window.innerWidth < 850) {
        isParallaxEnabled = false;
        card.style.transform = 'rotateY(180deg)';
    }
});