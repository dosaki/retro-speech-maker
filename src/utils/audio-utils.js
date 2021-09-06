window.audioContext = null;
let defaultDestination = null;
const AudioContext = window.AudioContext || window.webkitAudioContext;

const isFirefox = typeof InstallTrigger !== 'undefined'; // This is because firefox has a bug with exponentialRampToValueAtTime

export const play = (type, frequency, duration, trail, initialVolume, destination) => {
    if (!window.audioContext) {
        window.audioContext = new AudioContext();
        defaultDestination = window.audioContext.destination;
    }
    const _destination = destination || window.audioContext.destination;
    const _trail = trail || 0.1;
    const _duration = isFirefox ? _trail * 1000 : (duration || _trail * 1000);
    const _frequency = frequency || 440.0;

    const volume = window.audioContext.createGain();
    const oscillator = window.audioContext.createOscillator();
    oscillator.connect(volume);
    volume.connect(_destination);
    volume.gain.value = initialVolume || 1;

    if(isFirefox){
        volume.gain.setValueCurveAtTime([volume.gain.value, volume.gain.value/2, volume.gain.value/4, volume.gain.value/8, 0.00001, 0], window.audioContext.currentTime, _trail);
    } else {
        volume.gain.exponentialRampToValueAtTime(0.00001, window.audioContext.currentTime + _trail);
    }
    
    oscillator.type = type || "sine";
    oscillator.frequency.value = _frequency;
    oscillator.start();
    if (_duration) {
        setTimeout(() => {
            oscillator.stop();
        }, _duration);
    }
};