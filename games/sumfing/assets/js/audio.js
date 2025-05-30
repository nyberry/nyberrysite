function ensureAudioContext() {
  document.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      // must actually *use* the context — even silently — to unlock
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.frequency.value = 0;
      gain.gain.setValueAtTime(0, audioCtx.currentTime); // silent
      osc.start();
      osc.stop(audioCtx.currentTime + 0.01);

      console.log("AudioContext unlocked");
    }
  }, { once: true });
}


function playTone(frequency, duration = 100, type = 'sine') {
  if (soundMuted) return;
  //ensureAudioContext();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, duration);
}

function playPlaceSound() {
  playTone(880, 20); // blip
}

function playRemoveSound() {
  playTone(440, 30); // blop
}

function playWrongSound() {
  playTone(220, 300, 'square'); // Buzz
}

function playCorrectSound() {
  playTone(1760, 300, 'triangle'); // beep
}

function playChimes() {
  if (soundMuted) return;
  document.getElementById("chimes").play(); // kerching
}

function playArpeggio() {
  if (soundMuted || !audioCtx) return;

  const notes = [440, 554, 659, 880]; // A4, C#5, E5, A5
  const duration = 150; // ms
  const gap = 120; // delay between notes in ms

  notes.forEach((freq, i) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    const startTime = audioCtx.currentTime + (i * gap) / 1000;
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);
    gainNode.gain.setValueAtTime(0.2, startTime);
  });
}


let soundMuted = false;

const muteIcon = document.getElementById('mute-icon');
muteIcon.addEventListener('click', toggleMute);
muteIcon.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMute();
  }
});

function toggleMute() {
  soundMuted = !soundMuted;
  muteIcon.textContent = soundMuted ? '🔇' : '🔈';
}