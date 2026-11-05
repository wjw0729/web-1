const gameArea = document.getElementById('game-area');
const fish = document.getElementById('fish');
const mouth = document.getElementById('fish-mouth');
const attemptCountText = document.getElementById('attempt-count');
const statusText = document.getElementById('game-status');
const winText = document.getElementById('win-text');
const restartBtn = document.getElementById('restart-btn');

let attempts = 0;
let isCaught = false;
let currentX = gameArea.offsetWidth / 2;
let currentY = gameArea.offsetHeight / 2;

fish.style.left = currentX + 'px';
fish.style.top = currentY + 'px';

gameArea.addEventListener('mousemove', (e) => {
    if (isCaught) return;
    const rect = gameArea.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const fleeDistance = 200;
    if (distance < fleeDistance) {
        const speedMultiplier = 1 + (1 - distance / fleeDistance) * 2;
        const angle = Math.atan2(-dy, -dx);
        let newX = currentX + Math.cos(angle) * 150 * speedMultiplier + (Math.random() - 0.5) * 100;
        let newY = currentY + Math.sin(angle) * 150 * speedMultiplier + (Math.random() - 0.5) * 100;
        newX = Math.max(50, Math.min(newX, gameArea.offsetWidth - 50));
        newY = Math.max(50, Math.min(newY, gameArea.offsetHeight - 50));
        currentX = newX;
        currentY = newY;
        const flip = dx > 0 ? 1 : -1;
        fish.style.left = currentX + 'px';
        fish.style.top = currentY + 'px';
        fish.style.transform = `translate(-50%, -50%) scaleX(${flip})`;
        attempts++;
        attemptCountText.innerText = attempts;
        statusText.innerText = "Too slow!";
    }
});

mouth.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isCaught) return;
    isCaught = true;
    statusText.innerText = "Caught!";
    statusText.style.color = "#4CAF50";
    fish.style.transform = 'translate(-50%, -50%) scale(1.2)';
    fish.style.transition = 'transform 0.3s ease';
    winText.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
    createConfetti();
});

restartBtn.addEventListener('click', () => {
    isCaught = false;
    attempts = 0;
    currentX = gameArea.offsetWidth / 2;
    currentY = gameArea.offsetHeight / 2;
    attemptCountText.innerText = 0;
    statusText.innerText = "Ready to hunt";
    statusText.style.color = "#1a73e8";
    winText.classList.add('hidden');
    restartBtn.classList.add('hidden');
    fish.style.left = currentX + 'px';
    fish.style.top = currentY + 'px';
    fish.style.transform = 'translate(-50%, -50%) scaleX(1)';
});

function createConfetti() {
    const colors = ['#d93025', '#1a73e8', '#fbbc04', '#34a853'];
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.transition = `transform ${Math.random() * 2 + 1.5}s linear, opacity ${Math.random() * 2 + 1.5}s`;
        confetti.style.zIndex = '100';
        gameArea.appendChild(confetti);
        setTimeout(() => {
            confetti.style.transform = `translateY(${gameArea.offsetHeight + 50}px) rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 10);
        setTimeout(() => confetti.remove(), 3000);
    }
}