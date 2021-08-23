import { int } from './utils/random-utils';
import { speakText } from './speech';

const downloadSpeech = () => {
    if (!window.audioContext) {
        window.audioContext = new AudioContext();
        defaultDestination = window.audioContext.destination;
    }
    const text = document.querySelector("[text]").value;
    const gender = document.querySelector("[gender_select]").value;
    const wave = document.querySelector("[wave_select]").value;

    const destination = window.audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(destination.stream);

    const chunks = [];
    mediaRecorder.ondataavailable = function (evt) {
        chunks.push(evt.data);
    };

    mediaRecorder.onstop = function (evt) {
        const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        const link = document.createElement('a');
        const filename = `${gender}-${text.length}-${wave}.ogg`;
        link.innerText = `Download ${filename}`;
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        const linkHolder = document.querySelector("[interactables]");
        linkHolder.innerHTML = "";
        linkHolder.append(link);
    };

    mediaRecorder.start();
    const totalTime = speakText(text, gender, wave, destination);
    setTimeout(() => {
        mediaRecorder.stop();
    }, totalTime);
};


document.querySelector("[speak_btn]").addEventListener('click', () => {
    downloadSpeech();
});


let last = 0;
const makeBackground = (t) => {
    const now = t || 0;
    if (!last || now - last >= 5 * 1000) {
        last = now;
        const colour = int(0, parseInt("ffffff", 16)).toString(16);
        document.body.style = `background: #${colour};`;
    }
    window.requestAnimationFrame(makeBackground);
};

makeBackground();