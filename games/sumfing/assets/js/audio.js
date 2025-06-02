let audioCtx = null;
let soundMuted = localStorage.getItem('sumfing_audioMuted') === 'true';

function ensureAudioContext() {
  document.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 0;
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.01);

      console.log("AudioContext unlocked");

      if (soundMuted && audioCtx.state === 'running') {
        audioCtx.suspend();
      }
    }
  }, { once: true });
}

function setAudioIcon(muted) {
  const icon = document.getElementById('mute-icon');
  if (icon) icon.textContent = muted ? '🔇' : '🔈';
}

function toggleMute() {
  const current = localStorage.getItem('sumfing_audioMuted') === 'true';
  const newState = !current;
  soundMuted = newState;
  localStorage.setItem('sumfing_audioMuted', newState);
  setAudioIcon(newState);

  if (audioCtx) {
    audioCtx.suspend().catch(() => {});
    if (!newState && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }
}

function playTone(frequency, duration = 100, type = 'sine') {
  if (soundMuted || !audioCtx) return;
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

function playPlaceSound() { playTone(880, 20); }
function playRemoveSound() { playTone(440, 30); }

function playWrongSound() {
  if (!soundMuted) document.getElementById("nope")?.play();
}
function playChimes() {
  if (!soundMuted) document.getElementById("chimes")?.play();
}
function playFanfare() {
  if (!soundMuted) document.getElementById("fanfare")?.play();
}

document.addEventListener('DOMContentLoaded', () => {
  setAudioIcon(soundMuted);
  document.getElementById('mute-icon')?.addEventListener('click', toggleMute);
});
