(function () {
  const CONFIG = {
    clickVolume: 0.3,
    clickSoundPath: "./Portfolio/Sound/click-sound.mp3",
  };

  let audioCtx = null;
  let clickBuffer = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
        loadClickSound();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  async function loadClickSound() {
    try {
      const response = await fetch(CONFIG.clickSoundPath);
      const arrayBuffer = await response.arrayBuffer();
      audioCtx.decodeAudioData(arrayBuffer, (decodedBuffer) => {
        clickBuffer = decodedBuffer;
      });
    } catch (error) {
      console.error("Error loading click sound:", error);
    }
  }

  function playClickSound() {
    if (!audioCtx || !clickBuffer) return;

    const source = audioCtx.createBufferSource();
    source.buffer = clickBuffer;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = CONFIG.clickVolume;

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    source.start(0);
  }

  function attachListeners() {
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .interactive, .nav-link, .project-card",
    );

    interactiveElements.forEach((el) => {
      if (el.dataset.soundAttached) return;
      el.dataset.soundAttached = "true";

      el.addEventListener("click", () => {
        initAudio();
        playClickSound();
      });
    });

    document.addEventListener("mousedown", initAudio, { once: true });
    document.addEventListener("keydown", initAudio, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachListeners);
  } else {
    attachListeners();
  }

  const observer = new MutationObserver((mutations) => {
    attachListeners();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
