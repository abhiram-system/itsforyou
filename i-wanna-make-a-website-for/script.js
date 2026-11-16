const proposalArtwork = document.getElementById('proposalArtwork');
const sceneArtworkPlaceholder = document.getElementById('sceneArtworkPlaceholder');
const cursorFlower = document.getElementById('cursorFlower');
const sceneArtSlot = document.querySelector('.scene-art-slot');
const fallingFlowers = document.getElementById('fallingFlowers');
const pageFlowerRain = document.getElementById('pageFlowerRain');

if (pageFlowerRain) {
  const petals = ['✿', '❀', '✽'];
  const colors = ['#cf8db8', '#b69ad2', '#f1c0d2'];
  for (let i = 0; i < 7; i += 1) {
    const flower = document.createElement('span');
    flower.className = 'page-falling-flower';
    flower.textContent = petals[i % petals.length];
    flower.style.setProperty('--flower-left', (2 + Math.random() * 96) + '%');
    flower.style.setProperty('--flower-color', colors[i % colors.length]);
    flower.style.setProperty('--flower-size', (10 + Math.random() * 9) + 'px');
    flower.style.setProperty('--flower-duration', (12 + Math.random() * 10) + 's');
    flower.style.setProperty('--flower-delay', (-Math.random() * 22) + 's');
    pageFlowerRain.appendChild(flower);
  }
}

if (fallingFlowers) {
  const petals = ['✿', '❀', '✽'];
  const colors = ['#cf8db8', '#b69ad2', '#f1c0d2'];
  for (let i = 0; i < 9; i += 1) {
    const flower = document.createElement('span');
    flower.className = 'falling-flower';
    flower.textContent = petals[i % petals.length];
    flower.style.setProperty('--flower-left', (5 + Math.random() * 90) + '%');
    flower.style.setProperty('--flower-color', colors[i % colors.length]);
    flower.style.setProperty('--flower-size', (12 + Math.random() * 8) + 'px');
    flower.style.setProperty('--flower-duration', (9 + Math.random() * 6) + 's');
    flower.style.setProperty('--flower-delay', (-Math.random() * 12) + 's');
    fallingFlowers.appendChild(flower);
  }
  fallingFlowers.classList.add('is-active');
}

proposalArtwork.addEventListener('error', function () {
  sceneArtworkPlaceholder.hidden = false;
});

function prepareLetterWords() {
  let wordIndex = 0;
  document.querySelectorAll('#letterPaper .paper-greeting, #letterPaper .phrase-list p').forEach(function (paragraph) {
    const originalNodes = Array.from(paragraph.childNodes);
    paragraph.textContent = '';
    originalNodes.forEach(function (node) {
      if (node.nodeType !== Node.TEXT_NODE) return;
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          paragraph.appendChild(document.createTextNode(part));
          return;
        }
        const word = document.createElement('span');
        word.className = 'typewriter-word';
        word.style.setProperty('--word-delay', (wordIndex * 180) + 'ms');
        word.textContent = part;
        paragraph.appendChild(word);
        wordIndex += 1;
      });
    });
  });
}

document.getElementById('openLetter').addEventListener('click', function () {
  const paper = document.getElementById('letterPaper');
  if (paper.hidden) prepareLetterWords();
  paper.hidden = false;
  requestAnimationFrame(function () { paper.classList.add('is-open'); });
  this.textContent = 'Your letter is open';
});

const shootArrow = document.getElementById('shootArrow');
if (shootArrow) {
  const loveArrow = document.getElementById('loveArrow');
  const heartTarget = document.getElementById('heartTarget');
  const archeryResponse = document.getElementById('archeryResponse');
  let arrowIsFlying = false;

  shootArrow.addEventListener('click', function () {
    if (arrowIsFlying) return;
    arrowIsFlying = true;
    shootArrow.hidden = true;
    archeryResponse.textContent = '';
    requestAnimationFrame(function () { loveArrow.classList.add('is-shot'); });
    window.setTimeout(function () { heartTarget.classList.add('is-hit'); }, 900);
  });
}

const ringBoxWrap = document.getElementById('ringBoxWrap');
const proposalQuestion = document.getElementById('proposalQuestion');
if ('IntersectionObserver' in window) {
  const ringBoxObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!ringBoxWrap.classList.contains('is-open')) {
          ringBoxWrap.classList.add('is-open');
          window.setTimeout(function () {
            proposalQuestion.hidden = false;
            proposalQuestion.classList.add('is-revealed');
          }, 1050);
        }
      } else {
        ringBoxWrap.classList.remove('is-open');
        proposalQuestion.hidden = true;
        proposalQuestion.classList.remove('is-revealed');
      }
    });
  }, { threshold: 0.42 });
  ringBoxObserver.observe(document.getElementById('question'));
} else {
  ringBoxWrap.classList.add('is-open');
  window.setTimeout(function () {
    proposalQuestion.hidden = false;
    proposalQuestion.classList.add('is-revealed');
  }, 1050);
}

const answerZone = document.getElementById('answerZone');
const answerYes = document.getElementById('answerYes');
const answerNo = document.getElementById('answerNo');
const answerResponse = document.getElementById('answerResponse');

function moveNoButton() {
  const maxLeft = Math.max(0, answerZone.clientWidth - answerNo.offsetWidth);
  const maxTop = Math.max(0, answerZone.clientHeight - answerNo.offsetHeight);
  let nextLeft = maxLeft;
  let nextTop = maxTop;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    nextLeft = Math.random() * maxLeft;
    nextTop = Math.random() * maxTop;
    const overlapsYes = nextLeft < answerYes.offsetWidth + 10 && nextTop < answerYes.offsetHeight + 10;
    if (!overlapsYes) break;
  }

  answerNo.style.left = Math.round(nextLeft) + 'px';
  answerNo.style.top = Math.round(nextTop) + 'px';
}

answerNo.addEventListener('click', function () {
  answerResponse.innerHTML = 'Anjne parayalleyy, nee ente shuttuman<em>i</em> alleyy?';
  moveNoButton();
});

function launchHeartBurst(button) {
  const bounds = button.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  const colors = ['#d97ba5', '#a37ac0', '#e6a1b8', '#8664a8'];
  const hearts = ['♥', '♡', '💜', '💗', '✦'];

  for (let index = 0; index < 20; index += 1) {
    const heart = document.createElement('span');
    const angle = (Math.PI * 2 * index) / 20 + (Math.random() - 0.5) * 0.35;
    const distance = 45 + Math.random() * 90;
    heart.className = 'heart-burst';
    heart.textContent = hearts[index % hearts.length];
    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';
    heart.style.setProperty('--heart-x', Math.cos(angle) * distance + 'px');
    heart.style.setProperty('--heart-y', Math.sin(angle) * distance - 18 + 'px');
    heart.style.setProperty('--heart-color', colors[index % colors.length]);
    heart.style.setProperty('--heart-size', 14 + Math.random() * 17 + 'px');
    heart.style.setProperty('--heart-rotate', Math.round(Math.random() * 80 - 40) + 'deg');
    heart.addEventListener('animationend', function () { heart.remove(); }, { once: true });
    document.body.appendChild(heart);
  }
}

answerYes.addEventListener('click', function () {
  launchHeartBurst(answerYes);
  answerResponse.textContent = 'luv uhh soo much';
  answerZone.hidden = true;
  sceneArtSlot?.classList.add('is-curtained');
  const scene = document.getElementById('proposalScene');
  scene.hidden = false;
  window.setTimeout(function () {
    scene.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 220);
});

window.addEventListener('pointermove', function (event) {
  if (event.pointerType === 'touch') return;
  cursorFlower.style.setProperty('--cursor-x', event.clientX + 'px');
  cursorFlower.style.setProperty('--cursor-y', event.clientY + 'px');
  cursorFlower.classList.add('is-visible');
});

window.addEventListener('pointerdown', function () {
  cursorFlower.classList.add('is-clicking');
  window.setTimeout(function () { cursorFlower.classList.remove('is-clicking'); }, 220);
});
