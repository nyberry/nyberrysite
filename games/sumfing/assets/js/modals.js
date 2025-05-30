
// Modals Content //
const welcomeHTML = `
    <div class = "sumfing-modal-title">Sumfing</div>
    <h3>Arrange the tiles to solve the sum</h3>
    2️⃣ ➕ 3️⃣ = 5 ✅<br><br>
    Work through the <strong>easy</strong>, <strong>medium</strong>, and <strong>hard</strong> sums.<br><br>
    How many can you solve?<br>
    <img src="/games/sumfing/assets/images/degu.png" alt="degu" style="width: 200px;">
    <button id="play-button">Play</button>
    `

const infoHTML = `
    <div class = "sumfing-modal-title">How to play</div>
    <h3>Arrange the tiles to solve the sum</strong></h3>
    2️⃣ ➕ 3️⃣ = 5 ✅<br><br>
    Work through the <strong>easy</strong>, <strong>medium</strong>, and <strong>hard</strong> sums.<br>
    <hr>
    The sums are worked out in a standard order, called BIDMAS (or PEMDAS).<br><br>
    Multiplications and divisions are performed <strong>before</strong> additions and subtractions, even if they appear further right in the sum.<br><br>
    2️⃣ ➕ 3️⃣ ✖️ 4️⃣ = 14 ✅<br><br>
    2️⃣ ➕ 3️⃣ ✖️ 4️⃣ = 20 ❌
    <hr>
    <h3>Build your streak</h3>
    There's a new Sumfing every day.<br>
    <img src="/games/sumfing/assets/images/degu.png" alt="degu" style="width: 200px;">
    `

const operatorsHTML = `
    <h2>Advanced tiles</h2>
    The <strong>hard</strong> sum may use the exponent or factorial tiles.<br>
    <hr>
    <h3>Exponent</h3>
    <code>a ^ b</code> means <code>a</code> raised to the power of <code>b</code>.<br><br>
    2️⃣ ^ 4️⃣ = 2 x 2 x 2 x 2<br><br>
    Exponent operations are performed before any others.<br><br>
    4️⃣ x 3️⃣ ^ 2️⃣ = 36 ✅<br><br>
    4️⃣ x 3️⃣ ^ 2️⃣ = 144 ❌
    <hr>
    <h3>Factorial</h3>
    4️⃣❗means 4 × 3 × 2 × 1 <br><br>
    <div class="center-table">
    <table class="grid-table">
      <thead style="background: #c8c8c8">
        <tr><td>Factorial</td><td>Value</td><td class="spacer" style="background: #ffffff"></td><td>Factorial</td><td>Value</td></tr
      </thead>
      <tbody>
        <tr><td>2!</td><td>2</td><td class="spacer"></td><td>6!</td><td>720</td></tr>
        <tr><td>3!</td><td>6</td><td class="spacer"></td><td>7!</td><td>5040</td></tr>
        <tr><td>4!</td><td>24</td><td class="spacer"></td><td>8!</td><td>40320</td></tr>
        <tr><td>5!</td><td>120</td><td class="spacer"></td><td>9!</td><td>362880</td></tr>
      </tbody>
    </table>
    </div>
    `

const reviewHTML = `
    <div class = "sumfing-modal-title" id="sumfing-modal-headline">Sumfing</div>
    <div class = "footnote" id="sumfing-modal-date"></div><br>
    <div id="review-content"></div>
    `


function showReviewModal() {
  const container = document.createElement('div');
  container.id = 'review-content';

  const header = document.createElement('div');
  header.innerHTML = `
    <div class="sumfing-modal-title">Sumfing ${dayNumber}</div>
    <div class="footnote">${today}</div>
    <br>
  `;
  container.appendChild(header);

  const stages = ['Easy', 'Medium', 'Hard'];
  const { Easy, Medium, Hard } = progress.clues;
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

      const clues = progress.clues[stage];
      const stageHeader = document.createElement('p');
      stageHeader.innerHTML = `<strong>${stage}:</strong> ${emojiSummary(clues)}`;

      const tilesDiv = document.createElement('div');
      tilesDiv.className = 'sumfing-modal-review-tiles';

      [...expression].forEach(char => {
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

      const textAnswer = document.createElement('span');
      textAnswer.textContent = ` = ${target}`;
      textAnswer.className = 'text-answer'; // optional class for styling
      textAnswer.style.fontSize = '1.7rem';
      textAnswer.style.marginLeft = '0.5rem';
      textAnswer.style.verticalAlign = 'middle';

      tilesDiv.appendChild(textAnswer);

      row.appendChild(stageHeader);
      row.appendChild(tilesDiv);
      container.appendChild(row);
    }, index * 1000);
  });

  // Final message
  setTimeout(() => {
    const allClues = stages.map(stage => progress.clues[stage]);
    const totalClues = allClues.reduce((sum, clues) => sum + clues, 0);

    const message = document.createElement('div');
    message.className = 'sumfing-modal-final-message';

    if (totalClues === 0) {
      message.textContent = 'Perfect!';
    } else if (totalClues === 1) {
      message.textContent = 'Nice work!';
    } else if (totalClues === 2) {
      message.textContent = 'Not bad!';
    } else if (totalClues === 3) {
      message.textContent = 'Keep at it!';
    } else {
      message.textContent = 'Keep trying!';
    }

    message.style.marginTop = '1rem';
    message.style.fontSize = '1.2rem';
    message.style.fontWeight = 'bold';
    message.style.textAlign = 'center';

    // 👇 Add degu image
    const deguImg = document.createElement('img');
    deguImg.src = '/games/sumfing/assets/images/degutrophy.png';
    deguImg.alt = 'degu';
    deguImg.style.width = '200px';
    deguImg.style.marginTop = '0';
    deguImg.style.display = 'block';
    deguImg.style.marginLeft = 'auto';
    deguImg.style.marginRight = 'auto';

    container.appendChild(deguImg);
    container.appendChild(message);
  }, stages.length * 1000 + 200);

  

  // Use shared modal
  showModal(container, 'review'); 
}
