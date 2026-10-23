/* ---------- Compliments & Jokes (Personalized for Fasiha) ---------- */
const compliments = [
  "Fasiha, you light up every room you walk into ✨",
  "Your smile is contagious, Fasiha 😊",
  "You're stronger than you know, Fasiha 💪",
  "The world is brighter because you're in it 🌟",
  "You are enough, exactly as you are 💖",
  "I'm so glad you're my friend, Fasiha 🤗",
  "You have the best laugh, Fasiha 😄",
  "You're magic, honestly 🪄",
  "You make people feel seen and loved 🌸",
  "You're a total rockstar 🎸",
  "Fasiha, your kindness makes the world better 🌍",
  "You're absolutely wonderful just being you 💕"
];

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything! 😂",
  "What do you call a fake noodle? An impasta! 🍝",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌽",
  "What do you call a bear with no teeth? A gummy bear! 🐻",
  "Why can't you give Elsa a balloon? Because she'll let it go! ❄️🎈",
  "What do you call cheese that isn't yours? Nacho cheese! 🧀",
  "Why did the bicycle fall over? It was two-tired! 🚲",
  "What do you call a fish wearing a bowtie? Sofishticated! 🐟🎀",
  "Why do seagulls fly over the sea? Because if they flew over the bay, they'd be bagels! 🥯",
  "I told my plants a joke... they didn't laugh, but they grew! 🌱",
  "What do you call a sad strawberry? A blueberry! 🫐",
  "Why did Fasiha bring a ladder to the party? Because the drinks were on the house! 🏠",
  "What's Fasiha's favorite type of music? Anything that makes her dance! 💃"
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------- Confetti ---------- */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ff69b4', '#ffd700', '#ffb7ce', '#ffd1dc', '#ff9aa2', '#b5ead7'];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 12;
    this.vy = (Math.random() - 0.5) * 12 - 5;
    this.size = Math.random() * 8 + 4;
    this.color = randomItem(colors);
    this.rotation = Math.random() * 360;
    this.vRotation = (Math.random() - 0.5) * 20;
    this.life = 100;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.4;
    this.rotation += this.vRotation;
    this.life -= 2;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function spawnConfetti(count, x, y) {
  for (let i = 0; i < count; i++) {
    const p = new Particle();
    if (x != null) p.x = x;
    if (y != null) p.y = y;
    particles.push(p);
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  }
  if (particles.length > 0) requestAnimationFrame(animateConfetti);
}

function burstConfetti(x, y) {
  spawnConfetti(100, x, y);
  animateConfetti();
}

/* ---------- Mood Slider ---------- */
const moodSlider = document.getElementById('mood-slider');
const moodMessage = document.getElementById('mood-message');

const moodTexts = [
  "Sending you a big virtual hug right now, Fasiha 🤗",
  "It's okay to feel down, Fasiha — brighter moments are coming ☀️",
  "You're doing great, one step at a time 🌱",
  "Halfway there — keep going, you've got this! 💪",
  "Feeling good! Let's keep that energy going ✨",
  "You're glowing today! So happy for you, Fasiha 😊",
  "Absolutely radiant! The world needs your light, Fasiha 🌟"
];

function updateMood() {
  const val = parseInt(moodSlider.value, 10);
  const index = Math.min(Math.floor((val / 100) * (moodTexts.length - 1)), moodTexts.length - 1);
  moodMessage.textContent = moodTexts[index];
  const hue = 330 - (val / 100) * 190;
  moodMessage.style.color = `hsl(${Math.max(140, hue)}, 70%, 45%)`;
}

moodSlider.addEventListener('input', updateMood);

/* ---------- Hug Button ---------- */
const hugBtn = document.getElementById('hug-btn');
const hugResponse = document.getElementById('hug-response');

const hugMessages = [
  "Here's a BIG hug just for you, Fasiha 🤗💖",
  "Squeeze! You're amazing, Fasiha 🤗",
  "Hug received and returned with love, Fasiha 💕",
  "You're wrapped in warmth and kindness, Fasiha 🌸",
  "Big bear hug incoming for Fasiha! 🐻🤗"
];

hugBtn.addEventListener('click', () => {
  const msg = randomItem(hugMessages);
  hugResponse.textContent = msg;
  hugResponse.classList.remove('hidden');
  const rect = hugBtn.getBoundingClientRect();
  burstConfetti(rect.left + rect.width / 2, rect.top);
  hugBtn.classList.add('float');
  setTimeout(() => hugBtn.classList.remove('float'), 4000);
});

/* ---------- Surprise Button ---------- */
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseText = document.getElementById('surprise-text');

let useCompliment = true;
surpriseBtn.addEventListener('click', () => {
  useCompliment = !useCompliment;
  const content = useCompliment ? randomItem(compliments) : randomItem(jokes);
  surpriseText.textContent = content;
  surpriseText.classList.remove('hidden');
  burstConfetti(window.innerWidth / 2, 150);
});

/* ---------- Pop the Sad Clouds Game ---------- */
const gameArea = document.getElementById('game-area');
const scoreVal = document.getElementById('score-val');
const startBtn = document.getElementById('start-game');
const gameWin = document.getElementById('game-win');

const TOTAL_CLOUDS = 10;
let score = 0;
let gameActive = false;

function createCloud() {
  const cloud = document.createElement('div');
  cloud.className = 'cloud';
  cloud.style.left = Math.random() * 85 + 'vw';
  cloud.style.top = Math.random() * 40 + 20 + 'vh';
  cloud.style.setProperty('--dx', (Math.random() - 0.5) * 1.5);
  cloud.style.setProperty('--dy', (Math.random() - 0.5) * 1.5);

  cloud.addEventListener('click', (e) => {
    if (!gameActive) return;
    e.stopPropagation();
    cloud.classList.add('clicked');
    score++;
    scoreVal.textContent = score;
    const rect = cloud.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setTimeout(() => cloud.remove(), 200);
    const remaining = document.querySelectorAll('.cloud:not(.clicked)').length;
    if (remaining === 0) {
      gameActive = false;
      gameWin.classList.remove('hidden');
      burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 180);
    }
  });

  let x = parseFloat(cloud.style.left);
  let y = parseFloat(cloud.style.top);
  let dx = parseFloat(cloud.style.getPropertyValue('--dx'));
  let dy = parseFloat(cloud.style.getPropertyValue('--dy'));

  function float() {
    if (!cloud.isConnected) return;
    x += dx;
    y += dy;
    if (x < 0 || x > 90) { dx = -dx; cloud.style.setProperty('--dx', dx); }
    if (y < 15 || y > 60) { dy = -dy; cloud.style.setProperty('--dy', dy); }
    cloud.style.left = Math.max(0, Math.min(90, x)) + 'vw';
    cloud.style.top = Math.max(15, Math.min(60, y)) + 'vh';
    requestAnimationFrame(float);
  }
  requestAnimationFrame(float);
  gameArea.appendChild(cloud);
}

function startGame() {
  gameArea.innerHTML = '';
  score = 0;
  scoreVal.textContent = '0';
  gameWin.classList.add('hidden');
  gameActive = true;
  for (let i = 0; i < TOTAL_CLOUDS; i++) {
    setTimeout(createCloud, i * 150);
  }
}

startBtn.addEventListener('click', startGame);

/* ---------- Breathing Exercise ---------- */
const breathingBtn = document.getElementById('breathing-btn');
const breathingCircle = document.getElementById('breathing-circle');
const breathingText = document.getElementById('breathing-text');

let breathingInterval = null;

breathingBtn.addEventListener('click', () => {
  if (breathingInterval) {
    clearInterval(breathingInterval);
    breathingInterval = null;
    breathingCircle.classList.remove('inhale', 'exhale');
    breathingText.textContent = "Ready when you are";
    breathingBtn.textContent = "Start Breathing";
    return;
  }

  breathingBtn.textContent = "Stop Breathing";
  let phase = 'inhale';

  function cycle() {
    if (phase === 'inhale') {
      breathingCircle.classList.add('inhale');
      breathingCircle.classList.remove('exhale');
      breathingText.textContent = "Breathe in... 🌬️";
      phase = 'exhale';
    } else {
      breathingCircle.classList.add('exhale');
      breathingCircle.classList.remove('inhale');
      breathingText.textContent = "Breathe out... 🌿";
      phase = 'inhale';
    }
  }

  cycle();
  breathingInterval = setInterval(cycle, 6000);
});

/* ---------- Gratitude Journal ---------- */
const gratitudeInput = document.getElementById('gratitude-input');
const gratitudeBtn = document.getElementById('gratitude-btn');
const gratitudeList = document.getElementById('gratitude-list');
const clearGratitude = document.getElementById('clear-gratitude');

gratitudeBtn.addEventListener('click', addGratitude);
gratitudeInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addGratitude();
});

function addGratitude() {
  const text = gratitudeInput.value.trim();
  if (!text) return;
  const item = document.createElement('div');
  item.className = 'gratitude-item';
  item.textContent = text;
  gratitudeList.appendChild(item);
  gratitudeInput.value = '';
  burstConfetti(window.innerWidth / 2, 200);
}

clearGratitude.addEventListener('click', () => {
  gratitudeList.innerHTML = '';
});

/* ---------- Affirmations ---------- */
const affirmationBtn = document.getElementById('affirmation-btn');
const affirmationText = document.getElementById('affirmation-text');

const affirmations = [
  "Fasiha, you are worthy of love and happiness 💖",
  "You are enough, exactly as you are ✨",
  "Fasiha, your presence makes the world better 🌟",
  "You are brave, kind, and wonderful 🤗",
  "Every day, you're growing stronger 💪",
  "Fasiha, you deserve all the good things 🌸",
  "You are loved more than you know 💕",
  "Your smile lights up everyone's day ☀️"
];

affirmationBtn.addEventListener('click', () => {
  affirmationText.textContent = randomItem(affirmations);
  affirmationText.classList.remove('hidden');
  burstConfetti(window.innerWidth / 2, 200);
});

/* ---------- Self-care Ideas ---------- */
const selfcareBtn = document.getElementById('selfcare-btn');
const selfcareText = document.getElementById('selfcare-text');

const selfcareIdeas = [
  "Wrap yourself in a cozy blanket and sip warm tea ☕",
  "Take a 5-minute break and just breathe deeply 🌿",
  "Listen to your favorite song and dance a little 💃",
  "Drink a glass of water — your body will thank you 💧",
  "Wrap up warm and watch a comforting movie 🎬",
  "Write down 3 things you're grateful for 🙏",
  "Step outside for fresh air, even for just 2 minutes 🍃",
  "Be gentle with yourself today, Fasiha 💖",
  "Take a warm shower or bath 🛁",
  "Text a friend and say hi 💬"
];

selfcareBtn.addEventListener('click', () => {
  selfcareText.textContent = randomItem(selfcareIdeas);
  selfcareText.classList.remove('hidden');
  burstConfetti(window.innerWidth / 2, 200);
});

/* ---------- Interactive Cat ---------- */
const cat = document.getElementById('cat');
const catContainer = document.getElementById('cat-container');
const catPurr = document.getElementById('cat-purr');
const catMessage = document.getElementById('cat-message');

const catMessages = [
  "Meow! You're awesome, Fasiha 🐱",
  "Purr... you're doing great 💖",
  "Cats love you, Fasiha 🐾",
  "Best kitty hugs for you 🤗",
  "You're purr-fect just as you are ✨",
  "Fasiha + cats = pure happiness 💕",
  "Purrr... everything will be okay 🌟",
  "The cat says: you're loved 💕"
];

let catX = 100;
let catY = 100;
let isDragging = false;
let startX, startY, initialX, initialY;

function clampCatPosition(x, y) {
  const rect = cat.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width;
  const maxY = window.innerHeight - rect.height;
  return {
    x: Math.max(0, Math.min(maxX, x)),
    y: Math.max(0, Math.min(maxY, y))
  };
}

function updateCatPosition() {
  cat.style.left = catX + 'px';
  cat.style.top = catY + 'px';
}

// Mouse/touch drag for moving cat
cat.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  initialX = catX;
  initialY = catY;
  catPurr.classList.remove('hidden');
  catPurr.textContent = '😻 Purr...';
  setTimeout(() => catPurr.classList.add('hidden'), 1500);
  showCatMessage(randomItem(catMessages));
  burstConfetti(e.clientX, e.clientY, 60);
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const clamped = clampCatPosition(initialX + (e.clientX - startX), initialY + (e.clientY - startY));
  catX = clamped.x;
  catY = clamped.y;
  updateCatPosition();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

cat.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isDragging = true;
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  initialX = catX;
  initialY = catY;
  catPurr.classList.remove('hidden');
  catPurr.textContent = '😻 Purr...';
  setTimeout(() => catPurr.classList.add('hidden'), 1500);
  showCatMessage(randomItem(catMessages));
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const touch = e.touches[0];
  const clamped = clampCatPosition(initialX + (touch.clientX - startX), initialY + (touch.clientY - startY));
  catX = clamped.x;
  catY = clamped.y;
  updateCatPosition();
}, { passive: false });

window.addEventListener('touchend', () => {
  isDragging = false;
});

// Click cat to pet (if not dragging)
cat.addEventListener('click', (e) => {
  if (isDragging) return;
  catPurr.classList.remove('hidden');
  catPurr.textContent = '😻 Purr...';
  setTimeout(() => catPurr.classList.add('hidden'), 1500);
  showCatMessage(randomItem(catMessages));
  burstConfetti(e.clientX, e.clientY, 60);
});

function showCatMessage(msg) {
  catMessage.textContent = msg;
  catMessage.classList.remove('hidden');
  setTimeout(() => catMessage.classList.add('hidden'), 3000);
}

/* ---------- Write It Out Journal ---------- */
const journalInput = document.getElementById('journal-input');
const journalHugBtn = document.getElementById('journal-hug-btn');
const journalClearBtn = document.getElementById('journal-clear-btn');
const journalResponse = document.getElementById('journal-response');

const journalResponses = [
  "I hear you, Fasiha. Your feelings are valid 💖",
  "Thank you for sharing that with me 🤗",
  "You're not alone in this, Fasiha 🌸",
  "Whatever you're feeling is okay. Be gentle with yourself ✨",
  "I'm listening, Fasiha. You matter 🌟",
  "Thank you for trusting me with your thoughts 💕"
];

journalHugBtn.addEventListener('click', () => {
  const text = journalInput.value.trim();
  journalResponse.textContent = text ? randomItem(journalResponses) : randomItem(journalResponses);
  journalResponse.classList.remove('hidden');
  journalInput.value = '';
  burstConfetti(window.innerWidth / 2, 400);
});

journalClearBtn.addEventListener('click', () => {
  journalInput.value = '';
  journalResponse.classList.add('hidden');
});

/* ---------- Comfort Mode ---------- */
const comfortToggle = document.getElementById('comfort-toggle');
const starsEl = document.getElementById('stars');
let comfortMode = false;

function createStars() {
  starsEl.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.width = Math.random() * 3 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 3 + 's';
    starsEl.appendChild(star);
  }
}

comfortToggle.addEventListener('click', () => {
  comfortMode = !comfortMode;
  document.body.classList.toggle('comfort-mode', comfortMode);
  comfortToggle.textContent = comfortMode ? '☀️ Sunny Mode' : '✨ Comfort Mode';
  if (comfortMode) {
    createStars();
    starsEl.classList.remove('hidden');
  } else {
    starsEl.classList.add('hidden');
  }
});

/* ---------- Rotating Title ---------- */
const title = document.getElementById('main-title');
const titles = [
  "Hey Fasiha, you're awesome 💖",
  "You're doing great, Fasiha 🌟",
  "Sending you smiles, Fasiha 😊",
  "You're loved, Fasiha 💕",
  "Keep shining, Fasiha ✨"
];
let titleIndex = 0;
setInterval(() => {
  titleIndex = (titleIndex + 1) % titles.length;
  title.style.opacity = 0;
  setTimeout(() => {
    title.textContent = titles[titleIndex];
    title.style.opacity = 1;
  }, 300);
}, 5000);

/* ---------- Fun Quiz for Fasiha ---------- */
const quizQuestions = [
  {
    q: "What's the best thing about Fasiha?",
    options: ["Her smile", "Her kindness", "Everything!", "All of the above"],
    correct: 3,
    feedback: "Absolutely! Fasiha is amazing in every way 🌟"
  },
  {
    q: "When Fasiha walks into a room, what happens?",
    options: ["It gets brighter", "Nothing", "Everyone yawns", "It gets quieter"],
    correct: 0,
    feedback: "Yes! She lights up the whole place ✨"
  },
  {
    q: "Fasiha's superpower is:",
    options: ["Being awesome", "Flying", "Invisibility", "Time travel"],
    correct: 0,
    feedback: "Correct! Her superpower is being wonderfully herself 💖"
  },
  {
    q: "How does Fasiha make her friends feel?",
    options: ["Bored", "Special and loved", "Confused", "Tired"],
    correct: 1,
    feedback: "Exactly! Everyone feels lucky to know her 🤗"
  },
  {
    q: "What should Fasiha do right now?",
    options: ["Smile big", "Dance a little", "Know she's awesome", "All of the above"],
    correct: 3,
    feedback: "Yes! Especially the last one 😊"
  }
];

let currentQ = 0;
let quizScore = 0;
let quizAnswered = false;

const quizContainer = document.getElementById('quiz-container');
const quizStart = document.getElementById('quiz-start');
const quizResult = document.getElementById('quiz-result');
const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options');
const quizFeedback = document.getElementById('quiz-feedback');
const quizProgress = document.getElementById('quiz-progress');
const nextBtn = document.getElementById('next-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizIntro = document.getElementById('quiz-intro');

quizIntro.textContent = "Ready for a fun little quiz, Fasiha? Let's celebrate how awesome you are!";

startQuizBtn.addEventListener('click', () => {
  quizStart.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  currentQ = 0;
  quizScore = 0;
  renderQuestion();
});

function renderQuestion() {
  quizAnswered = false;
  nextBtn.classList.add('hidden');
  quizFeedback.textContent = '';
  optionsDiv.innerHTML = '';
  const q = quizQuestions[currentQ];
  questionText.textContent = q.q;
  quizProgress.textContent = `Question ${currentQ + 1} of ${quizQuestions.length}`;
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => checkAnswer(i));
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizQuestions[currentQ];
  const buttons = optionsDiv.querySelectorAll('.option-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === selected && i !== q.correct) btn.classList.add('wrong');
  });

  if (selected === q.correct) {
    quizScore++;
    quizFeedback.textContent = q.feedback;
    quizFeedback.className = 'quiz-feedback correct';
  } else {
    quizFeedback.textContent = `Not quite! ${q.feedback}`;
    quizFeedback.className = 'quiz-feedback wrong';
  }

  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentQ++;
  if (currentQ < quizQuestions.length) {
    renderQuestion();
  } else {
    showQuizResult();
  }
});

function showQuizResult() {
  quizContainer.classList.add('hidden');
  quizResult.classList.remove('hidden');
  let message = '';
  if (quizScore === quizQuestions.length) {
    message = `Perfect score, Fasiha! You're absolutely brilliant 🌟`;
  } else if (quizScore >= 3) {
    message = `Great job, Fasiha! You're doing amazing 💖`;
  } else {
    message = `You're awesome no matter what, Fasiha! 🤗`;
  }
  quizResult.innerHTML = `${message}<br><br>Score: ${quizScore} / ${quizQuestions.length}`;
  burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 150);
}

/* ---------- Orientation & Resize Handling ---------- */
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Re-clamp cat position in case screen shrunk
  const clamped = clampCatPosition(catX, catY);
  catX = clamped.x;
  catY = clamped.y;
  updateCatPosition();
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const clamped = clampCatPosition(catX, catY);
    catX = clamped.x;
    catY = clamped.y;
    updateCatPosition();
  }, 100);
});