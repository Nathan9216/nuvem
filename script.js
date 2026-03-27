const sky = document.querySelector('.sky');
const cloud = document.querySelector('.cloud');
const ground = document.querySelector('.ground');

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%*";

function createSplash(x, y) {
  for (let i = 0; i < 4; i++) { // Aumentei para 4 gotas
    const splash = document.createElement('div');
    splash.classList.add('splash');
    
    splash.style.left = x + 'px';
    splash.style.top = y + 'px';
    
    const randomX = (Math.random() - 0.5) * 50;
    splash.style.marginLeft = `${randomX}px`;
    
    sky.appendChild(splash);
    setTimeout(() => splash.remove(), 400);
  }
}

function createRainLetter() {
  const letter = document.createElement('div');
  letter.classList.add('letter');
  letter.textContent = letters[Math.floor(Math.random() * letters.length)];

  const cloudRect = cloud.getBoundingClientRect();
  const groundRect = ground.getBoundingClientRect();

  const startX = cloudRect.left + (Math.random() * cloudRect.width);
  const startY = cloudRect.top + 80;
  
  const fallDistance = groundRect.top - startY;

  letter.style.left = `${startX}px`;
  letter.style.top = `${startY}px`;
  letter.style.fontSize = `${Math.random() * 10 + 15}px`;
  
  const duration = Math.random() * 0.8 + 1.2; // Chuva um pouco mais veloz
  letter.style.setProperty('--fall-dist', `${fallDistance}px`);
  letter.style.animation = `fallToGround ${duration}s linear forwards`;

  sky.appendChild(letter);

  setTimeout(() => {
    createSplash(startX, groundRect.top);
    letter.remove();
  }, duration * 1000);
}

function startRain() {
  setInterval(() => {
    createRainLetter();
  }, 80); // Frequência da chuva
}

window.onload = startRain;