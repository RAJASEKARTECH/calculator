let display = document.getElementById("display");
let history = document.getElementById("history");
let currentTheme = 'dark';
let calculationHistory = [];

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

function append(value) {
  if (display.innerText === "0" && value !== '.') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = "0";
  history.innerText = "";
}

function deleteLast() {
  if (display.innerText.length === 1 || display.innerText === "Error") {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculate() {
  try {
    const expression = display.innerText.replace('÷','/').replace('×','*');
    const result = eval(expression);
    
    // Store calculation in history
    calculationHistory.push(`${expression} = ${result}`);
    if (calculationHistory.length > 3) {
      calculationHistory.shift();
    }
    history.innerText = calculationHistory.join('; ');
    
    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
}

function toggleTheme() {
  const body = document.body;
  const calculator = document.querySelector('.calculator');
  const title = document.querySelector('.title');
  
  if (currentTheme === 'dark') {
    // Light theme
    body.style.background = 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';
    calculator.style.background = 'rgba(255, 255, 255, 0.9)';
    calculator.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.2)';
    title.style.color = '#4a6baf';
    title.style.textShadow = '0 0 10px rgba(74, 107, 175, 0.5)';
    currentTheme = 'light';
  } else {
    // Dark theme
    body.style.background = 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
    calculator.style.background = 'rgba(20, 20, 40, 0.8)';
    calculator.style.boxShadow = '0 0 30px rgba(0, 255, 231, 0.3), 0 0 60px rgba(0, 255, 231, 0.1)';
    title.style.color = '#00ffe7';
    title.style.textShadow = '0 0 10px rgba(0, 255, 231, 0.5)';
    currentTheme = 'dark';
  }
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    append(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});