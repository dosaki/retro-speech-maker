window.audioContext = null;
let defaultDestination = null;
const AudioContext = window.AudioContext || window.webkitAudioContext;

export const play = (type, frequency, duration, trail, destination) => {
    if (!window.audioContext) {
        window.audioContext = new AudioContext();
        defaultDestination = window.audioContext.destination;
    }
    const _destination = destination || window.audioContext.destination;
    const _duration = duration || null;
    const _trail = trail || 0.1;
    const _frequency = frequency || 440.0;

    const gain = window.audioContext.createGain();
    const oscilator = window.audioContext.createOscillator();
    oscilator.connect(gain);
    gain.connect(_destination);

    gain.gain.exponentialRampToValueAtTime(0.00001, window.audioContext.currentTime + _trail);
    oscilator.type = type || "sine";
    oscilator.frequency.value = _frequency;
    oscilator.start();
    if (_duration) {
        setTimeout(() => {
            oscilator.stop();
        }, duration);
    }
};