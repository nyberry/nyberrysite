---
layout: layout.html
title: Sumfing
description: A simple yet challenging number game. Can you arrange the tiles to solve the sum? Nothing to do with medicine!
image: /games/sumfing/assets/images/demoImage.png
order: 399
---

<link rel="stylesheet" href="/games/sumfing/assets/css/sumfing.css">

<div class="game-container">
  <div class = "info-icon" id="info-icon">ℹ️</div>
  <div class = "sumfing-title" id="headline">Sumfing</div>
  <div class = "footnote" id="date"></div><br>

  <div class="box-container" id="box-container"></div>

  <div class="sumfing-target" id="target-display"></div>
  <div class="sumfing-result" id="result"></div>
  <div class="sumfing-feedback" id="feedback">🤓</div><br>

  <div class="tile-container" id="num-tiles"></div>
  <div class="tile-container" id="op-tiles"></div>
  <div class="tile-container" id="extra-op-tiles" style="display: none;"></div>

  <form onsubmit="return false;">
    <input type="hidden" name="hint_level" id="hint-level-input">
    <button id="next-button">Next</button>
  </form>

<button id="hint1-button">Hint?</button>
<button id="hint2-button">Another hint?</button>
<button id="reveal-button">Show answer</button>

</div>

<div id="completion-page" style="display: none;" class="completion-container">
<div class = "sumfing-title" id="completion-headline">Sumfing</div>
<div class = "footnote" id="completion-date"></div><br>
    <ul id="clue-summary">
        <li>Easy: <span id="clue-easy">0</span></li>
        <li>Medium: <span id="clue-medium">0</span></li>
        <li>Hard: <span id="clue-hard">0</span></li>
        <li id="row-extra">Extra: <span id="clue-extra">0</span></li>
    </ul>
<button id="share-button">Share</button>
<p id="countdown-message">Sumfing else in 00 hours and 00 minutes</p>
<a href="#" id="review-link">Admire your work</a>
</div>

<!-- Admire your work overlay -->
<div id="review-modal" class="sumfing-modal-overlay" style="display: none;">
  <div class="sumfing-modal-content">
    <span id="close-review" class="sumfing-modal-close">&times;</span>
        <div class = "sumfing-title" id="sumfing-modal-headline">Sumfing</div>
        <div class = "footnote" id="sumfing-modal-date"></div><br>
        <h2>How you did:</h2>
    <div id="review-content"></div>
  </div>
</div>

<!-- Info Modal -->
<div id="info-modal" class="sumfing-modal-overlay">
  <div class="sumfing-modal-content">
    <span class="sumfing-modal-close" id = "info-close">&times;</span>
    <h2>How to play</h2>
    <h3>Arrange the tiles to solve the sum</strong></h3>
    <p>2️⃣ ➕ 3️⃣ = 5 ✅</p>

    <p>Work through the <strong>easy</strong>, <strong>medium</strong>, and <strong>hard</strong> sums.<br><br>
    If you solve them all with no hints, enjoy the special <strong>“extra”</strong> sum. 🤓</p>

    <hr>
    <h3>BIDMAS</h3>
    The sums are worked out in a standard order, called BIDMAS or PEMDAS.<br><br>
    Multiplications and divisions are performed <strong>before</strong> additions and subtractions, even if they appear further right in the sum. 🤓<br>

    2️⃣ ➕ 3️⃣ ✖️ 4️⃣ = 14 ✅<br>
    2️⃣ ➕ 3️⃣ ✖️ 4️⃣ = 20 ❌

    <hr>

    <h3>Advanced: the EXTRA sum</h3>
    This bonus sum may use the exponent operator.<br>
    <code>a ^ b</code> means <code>a</code> raised to the power of <code>b</code>.<br><br>
    2️⃣ ^ 5️⃣ = 32 ✅<br><br>
    In BIDMAS, exponent operations are performed before any others.<br><br>
    It may also use the factorial operator.<br><br>
    4️⃣❗ = 4 × 3 × 2 × 1 = 24 ✅<br>
    <hr>
    There's a new Sumfing every day.<br><br>
    Enjoy! 🤓
    <br><br>
        <div class = "footnote">©2025 <a href="https://www.nyberry.com">NYBerry</a></div>

  </div>
</div>

<script>

// global variables //
let progress;
let currentPuzzle;
let selectedTiles = [];
let hint_level = 0;
let unsolved = true;
let expressions = [];
let hint_answer = [];
const standardDelay = 5000;
const STAGES = ['Easy', 'Medium', 'Hard', 'Extra'];
const today = new Date().toISOString().split('T')[0];
const dayNumber = getSumfingDayNumber(today);


// main function on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {

  const infoIcon = document.getElementById('info-icon');
  const infoModal = document.getElementById('info-modal');
  const infoClose = document.getElementById('info-close');

  infoClose.addEventListener('click', () => {
    infoModal.style.display = 'none';
  });
   
  infoIcon.addEventListener('click', () => {
    infoModal.style.display = 'flex';
  });

  // Optional: close modal when clicking outside content
  window.addEventListener('click', function (event) {
    if (event.target === infoModal) {
      infoModal.style.display = 'none';
    }
  }); 

  document.getElementById('date').textContent = `${today}`;

  const storageKey = 'sumfing_progress';
  const saved = JSON.parse(localStorage.getItem(storageKey));

  if (saved?.date === today) {
    progress = saved;
    console.log('progress (in browser local storage):', progress);
  } else {
    progress = {
      date: today,
      stage: 'Easy',
      clues: { Easy: 0, Medium: 0, Hard: 0, Extra: 0 }
    };
    localStorage.setItem(storageKey, JSON.stringify(progress));
    console.log('No data in local storage, progress initialised to:', progress);
    }


  fetch('/games/sumfing/assets/puzzles.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      const puzzle = data[today];
      if (puzzle) {
        currentPuzzle = puzzle;
        console.log('Todays puzzle:', puzzle);
        if (progress?.stage === 'Completed') {
            console.log('Puzzle already completed, showing summary...');
            showCompletionPage(); // 👈 Show summary immediately
            return; // 👈 Stop further game logic
        } else {
            initPuzzleUI(currentPuzzle, progress); 
        }
      } else {
        console.error('No puzzle found for today:', today);
        return;
      }
    })
    .catch(error => {
      console.error('Failed to fetch puzzle:', error);
    });

    // ADD EVENT listeners once only
    document.getElementById('hint1-button').addEventListener('click', revealHint1);
    document.getElementById('hint2-button').addEventListener('click', revealHint2);
    document.getElementById('reveal-button').addEventListener('click', revealAnswer);
    document.getElementById('next-button').addEventListener('click', () => {
        advanceStage();          
        saveProgress();          
        initPuzzleUI(currentPuzzle, progress); 
    });

});


// Function to initialise puzzle UI
function initPuzzleUI(puzzle) {
    const stage = progress.stage;

    if (stage === 'Completed') {
      showCompletionPage();
      return;
    }

    const headline = document.getElementById('headline');
    headline.textContent = `Sumfing ${stage}`;
    tiles=puzzle.Tiles;
    expressions = puzzle[stage][1];
    hint_answer = expressions[0];
    headline.textContent = `Sumfing ${stage}`;
    console.log('puzzle', puzzle, 'stage', stage)
    console.log('expressions', expressions)
    unsolved = true;
    hint_level = 0;
    selectedTiles = [];
    
    document.getElementById('next-button').style.display = 'none';
    renderTiles(tiles, puzzle[stage]);
    bindTileEvents();
    bindBoxEvents();
    document.getElementById('feedback').textContent = '🤓';  // clear immediately

    // Delay hint reveal
    setTimeout(() => {
        if (document.getElementById('next-button').style.display === 'none') {
            document.getElementById('hint1-button').style.display = 'block';
        }
    }, standardDelay);  
}


// Function to render the puzzle
function renderTiles(tiles, puzzlestage) {
    const [target, expressions] = puzzlestage;
    document.getElementById('target-display').textContent = `= ${target}`;

    const firstExpression = expressions[0]; // eg. "7-5"

    const boxes = document.getElementById('box-container');
    boxes.innerHTML = '';

    for (let i = 0; i < firstExpression.length; i++) {
        const div = document.createElement('div');
        div.className = 'box';
        div.dataset.index = i;
        boxes.appendChild(div);
    }

    const numTiles = document.getElementById('num-tiles');
    numTiles.innerHTML = '';
    tiles.forEach((num, i) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.value = num;
        tile.dataset.id = `num${i + 1}`;
        tile.textContent = num;
        numTiles.appendChild(tile);
    });

    const opTiles = document.getElementById('op-tiles');
    opTiles.innerHTML = '';
    ['+', '-', '*', '/'].forEach((op, i) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.value = op;
        tile.dataset.id = `op${i + 1}`;
        tile.textContent = { '*': '×', '/': '÷' }[op] || op;
        opTiles.appendChild(tile);
    });

    const extraOpTiles = document.getElementById('extra-op-tiles');
    if (progress.stage === 'Extra') {
        extraOpTiles.style.display = 'flex';
        extraOpTiles.innerHTML = '';
        ['!', '^'].forEach((op, i) => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.value = op;
            tile.dataset.id = `ex${i + 1}`;
            tile.textContent = op;
            extraOpTiles.appendChild(tile);
        });
    } else {
        extraOpTiles.style.display = 'none';
    }
}


/* Gameplay functions */

function bindTileEvents() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const emptyBox = [...document.querySelectorAll('.box')].find(b => !b.dataset.value);
            if (emptyBox) {
                emptyBox.textContent = tile.textContent;
                emptyBox.dataset.value = tile.dataset.value;
                emptyBox.dataset.id = tile.dataset.id;
                tile.style.visibility = 'hidden';
                applyTileStyle(tile, emptyBox);
                selectedTiles.push(tile.dataset.value);
                if (selectedTiles.length === document.querySelectorAll('.box').length) {
                    checkExpression();
                }
            }
        });
    });
}

function bindBoxEvents() {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', () => {
            if (box.dataset.value) {
                const tile = [...document.querySelectorAll('.tile')].find(t => t.dataset.id === box.dataset.id);
                if (tile) tile.style.visibility = 'visible';
                selectedTiles.pop();
                box.textContent = '';
                delete box.dataset.value;
                delete box.dataset.id;
                box.style.backgroundColor = '';
                box.style.color = '';
                if (hint_level >= 1) setLightBackgroundColors();
                if (hint_level === 2) showOperators();
                if (hint_level === 3) showAnswers();
                if (selectedTiles.length < document.querySelectorAll('.box').length) {
                    document.getElementById('feedback').textContent = '🤓';
                    document.getElementById('next-button').style.display = 'none';
                }
            }
        });
    });
}

function checkExpression() {
    const expression = [...document.querySelectorAll('.box')].map(b => b.dataset.value || '').join('');
    if (expressions.includes(expression)) {
        document.getElementById('feedback').textContent = 'Correct ✅';
        unsolved = false;
        document.getElementById('hint1-button').style.display = 'none';
        document.getElementById('hint2-button').style.display = 'none';
        document.getElementById('reveal-button').style.display = 'none';
        document.getElementById('hint-level-input').value = hint_level;
        document.getElementById('next-button').style.display = 'block';
    } else {
        document.getElementById('feedback').textContent = 'Not quite';
    }
}

function applyTileStyle(tile, box) {
    box.style.backgroundColor = getComputedStyle(tile).backgroundColor;
    box.style.color = getComputedStyle(tile).color;
}

function revealHint1() {
    hint_level = 1;
    progress.clues[progress.stage] = Math.max(progress.clues[progress.stage], 1);
    saveProgress();
    clearBoxesAndTiles();
    setTimeout(() => {
        if (unsolved) document.getElementById('hint2-button').style.display = 'block';
    }, standardDelay);
}

function revealHint2() {
    hint_level = 2;
    progress.clues[progress.stage] = Math.max(progress.clues[progress.stage], 2);
    saveProgress();
    clearBoxesAndTiles();
    setTimeout(() => {
        if (unsolved) document.getElementById('reveal-button').style.display = 'block';
    }, standardDelay);
}

function revealAnswer() {
    hint_level = 3;
    progress.clues[progress.stage] = 3;
    saveProgress();
    clearBoxesAndTiles();
    disableEventListeners();
    setTimeout(() => {
        document.getElementById('hint-level-input').value = hint_level;
        document.getElementById('next-button').style.display = 'block';
    }, 2000);
}

function disableEventListeners() {
    document.querySelectorAll('.tile').forEach(tile => {
        const newTile = tile.cloneNode(true);
        tile.replaceWith(newTile); // disables old listeners
    });
}

function clearBoxesAndTiles() {
    document.querySelectorAll('.box').forEach(box => {
        if (box.dataset.value) {
            const tile = [...document.querySelectorAll('.tile')].find(t => t.dataset.id === box.dataset.id);
            if (tile) tile.style.visibility = 'visible';
            box.textContent = '';
            delete box.dataset.value;
            delete box.dataset.id;
            box.style.backgroundColor = '';
            box.style.color = '';
        }
    });
    selectedTiles = [];
    document.getElementById('feedback').textContent = '🤓';
    document.getElementById('hint1-button').style.display = 'none';
    document.getElementById('hint2-button').style.display = 'none';
    document.getElementById('reveal-button').style.display = 'none';

    if (hint_level >= 1) setLightBackgroundColors();
    if (hint_level === 2) showOperators();
    if (hint_level === 3) showAnswers();
}

function setLightBackgroundColors() {
    [...hint_answer].forEach((char, index) => {
        const box = document.querySelectorAll('.box')[index];
        const tile = [...document.querySelectorAll('.tile')].find(t => t.dataset.value === char);
        if (tile && !box.dataset.value) {
            const color = getComputedStyle(tile).backgroundColor;
            box.style.backgroundColor = lightenColor(color, 75);
        }
    });
}

function showOperators() {
    [...hint_answer].forEach((char, i) => {
        const box = document.querySelectorAll('.box')[i];
        const tile = [...document.querySelectorAll('.tile')].find(t => t.dataset.value === char);
        if (tile && !box.dataset.value && isNaN(char)) {
            revealBox(box, tile);
        }
    });
}

function showAnswers() {
    [...hint_answer].forEach((char, i) => {
        const box = document.querySelectorAll('.box')[i];
        const tile = [...document.querySelectorAll('.tile')].find(t => t.dataset.value === char);
        if (tile && !box.dataset.value) {
            revealBox(box, tile);
        }
    });
}

function revealBox(box, tile) {
    box.textContent = tile.textContent;
    box.dataset.value = tile.dataset.value;
    box.dataset.id = tile.dataset.id;
    tile.style.visibility = 'hidden';
    applyTileStyle(tile, box);
    selectedTiles.push(tile.dataset.value);
}

function lightenColor(rgb, percent) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    let [r, g, b] = match.slice(1).map(Number);
    r = Math.min(255, Math.round(r + (255 - r) * percent / 100));
    g = Math.min(255, Math.round(g + (255 - g) * percent / 100));
    b = Math.min(255, Math.round(b + (255 - b) * percent / 100));
    return `rgb(${r}, ${g}, ${b})`;
}

function advanceStage() {
  const currentIndex = STAGES.indexOf(progress.stage);
  console.log('Completed stage', currentIndex, progress.stage);

  if (progress.stage === 'Easy' || progress.stage === 'Medium') {
    // Move to next stage
    progress.stage = STAGES[currentIndex + 1];
    saveProgress();
    return;
  }

  if (progress.stage === 'Extra') {
    // Puzzle fully complete
    progress.stage = 'Completed';
    saveProgress();
    return;
  }

  if (progress.stage === 'Hard') {
    // Check if ANY clues were used in any stage
    const anyCluesUsed = Object.values(progress.clues).some(count => count > 0);
    if (!anyCluesUsed) {
      // No clues used — bonus stage!
      progress.stage = 'Extra';
    } else {
      // Otherwise, you're done
      progress.stage = 'Completed';
    }
    saveProgress();
    return;
  }

  // Fallback
  console.log("Logic Error in stage advance function")
  progress.stage = 'Completed';
  saveProgress();
}


function saveProgress() {
  localStorage.setItem('sumfing_progress', JSON.stringify(progress));
}


// Completion page //

// Helper function to return emoji summary
const emojiSummary = (n) => {
  if (n === 0) return '✅';
  if (n >= 3) return '❌';
  return '💡'.repeat(n)+'✅';
};


// Update Completion Page
function showCompletionPage() {
  document.querySelector('.game-container').style.display = 'none';
  document.getElementById('completion-page').style.display = 'block';
  document.getElementById('completion-headline').textContent = `Sumfing ${dayNumber}`;
  document.getElementById('completion-date').textContent = `${today}`;

  const { Easy, Medium, Hard, Extra } = progress.clues;

  document.getElementById('clue-easy').textContent = emojiSummary(Easy);
  document.getElementById('clue-medium').textContent = emojiSummary(Medium);
  document.getElementById('clue-hard').textContent = emojiSummary(Hard);

  const extraAllowed = Easy === 0 && Medium === 0 && Hard === 0;
  if (progress.stage === 'Completed' && extraAllowed) {
    document.getElementById('row-extra').style.display = 'list-item';
    document.getElementById('clue-extra').textContent = emojiSummary(Extra);
  } else {
    document.getElementById('row-extra').style.display = 'none';
  }

  updateCountdownToMidnight();

  document.getElementById('review-link').addEventListener('click', (e) => {
    e.preventDefault();
    showReviewModal();
  });
}


// Share button handler
const shareButton = document.getElementById('share-button');
if (shareButton) {
  shareButton.addEventListener('click', () => {
    const { Easy, Medium, Hard, Extra } = progress.clues;
    const showExtra = progress.stage === 'Completed' && Easy === 0 && Medium === 0 && Hard === 0;

    let shareText = `Sumfing ${dayNumber}\n` +
                    `Easy: ${emojiSummary(Easy)}\n` +
                    `Medium: ${emojiSummary(Medium)}\n` +
                    `Hard: ${emojiSummary(Hard)}`;
    if (showExtra) {
      shareText += `\nExtra: ${emojiSummary(Extra)}`;
    }
    shareText += `\nsumfing.com`;

    if (navigator.share) {
      navigator.share({ text: shareText });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Clue summary copied to clipboard!");
      });
    }
  });
}

function updateCountdownToMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diffMs = midnight - now;
  const diffHrs = Math.floor(diffMs / 1000 / 60 / 60);
  const diffMins = Math.floor((diffMs / 1000 / 60) % 60);

  document.getElementById('countdown-message').textContent =
    `Sumfing else in ${String(diffHrs).padStart(2, '0')} hours and ${String(diffMins).padStart(2, '0')} minutes`;
}


function getSumfingDayNumber(dateStr) {
  const start = new Date('2024-07-26'); // Day 1
  const today = new Date(dateStr); // e.g., '2025-05-27'
  
  const msPerDay = 1000 * 60 * 60 * 24;
  const dayNumber = Math.floor((today - start) / msPerDay) + 1;
  
  return `#${dayNumber}`;
}


// Modified showReviewModal with staggered row appearance
function showReviewModal() {
  const container = document.getElementById('review-content');
  container.innerHTML = '';
  document.getElementById('sumfing-modal-headline').textContent = `Sumfing ${dayNumber}`;
  document.getElementById('sumfing-modal-date').textContent = today;

  const stages = ['Easy', 'Medium', 'Hard'];
  const { Easy, Medium, Hard, Extra } = progress.clues;
  const extraAllowed = Easy === 0 && Medium === 0 && Hard === 0;
  if (progress.stage === 'Completed' && extraAllowed) {
    stages.push('Extra');
  }

  stages.forEach((stage, index) => {
    setTimeout(() => {
      const [target, expressions] = currentPuzzle[stage];
      const expression = expressions[0];

      const row = document.createElement('div');
      row.className = 'sumfing-modal-review-row';

      const tilesDiv = document.createElement('div');
      tilesDiv.className = 'sumfing-modal-review-tiles';

      const fullExpression = `${expression}=${target}`;
      [...fullExpression].forEach(char => {
        const tile = document.createElement('div');
        tile.className = 'tile';

        if (!isNaN(char)) {
          tile.classList.add('number');
        } else if (['+', '-', '*', '/'].includes(char)) {
          tile.classList.add('operator');
        } else if (['!', '^'].includes(char)) {
          tile.classList.add('special');
        } else if (char === '=') {
          tile.classList.add('equals');
        }

        tile.textContent = char === '*' ? '×' : char === '/' ? '÷' : char;
        tilesDiv.appendChild(tile);
      });

      const clues = progress.clues[stage];
      const emojiP = document.createElement('p');
      emojiP.textContent = emojiSummary(stage)
      row.appendChild(tilesDiv);
      row.appendChild(emojiP);
      container.appendChild(row);
    }, index * 1000); // stagger each stage by 1 second
  });

  document.getElementById('review-modal').style.display = 'flex';
}



// Close modal
document.getElementById('close-review').addEventListener('click', () => {
  document.getElementById('review-modal').style.display = 'none';
});


</script>
