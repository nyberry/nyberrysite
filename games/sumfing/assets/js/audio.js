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