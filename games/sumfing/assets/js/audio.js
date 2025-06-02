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
  if (soundMuted) return;
  document.getElementById("nope").play(); // nope
}

function playChimes() {
  if (soundMuted) return;
  document.getElementById("chimes").play(); // kerching
}

function playFanfare() {
   if (soundMuted) return;
   document.getElementById("fanfare").play(); // kerching
}


function setAudioIcon(muted) {
  const icon = document.getElementById('mute-icon');
  icon.textContent = muted ? '🔇' : '🔈';
}

function toggleMute() {
  const current = localStorage.getItem('sumfing_audioMuted') === 'true';
  const newState = !current;
  soundMuted = newState; // ✅ update global state
  localStorage.setItem('sumfing_audioMuted', newState);
  setAudioIcon(newState);
  // optional: mute/unmute audio context if you're using Web Audio
  if (audioCtx) {
    audioCtx.suspend().catch(() => {}); // fallback
    if (!newState && audioCtx.state === 'suspended') audioCtx.resume();
  }
}

let soundMuted = localStorage.getItem('sumfing_audioMuted') === 'true';
setAudioIcon(soundMuted);