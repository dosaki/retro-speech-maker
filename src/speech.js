import { play } from './utils/audio-utils';
import { int } from './utils/random-utils';
import { splitSentences } from './utils/string-utils';

const genderFrequencyMultiplier = {
    "male": 0.85,
    "female": 2.2
};

const sentenceTypes = {
    question: { start:[250], ending: [125, 140, 250, 100, 1, 1], rate: 1 },
    exclamation: { start:[], ending: [125, 150, 175, 1, 1], rate: 0.9 },
    calm: { start:[], ending: [1, 1], rate: 1.2 },
    normal: { start:[], ending: [1, 1], rate: 1 }
};

const resolveType = (text) => {
    if (text.includes("?")) return "question";
    if (text.includes("!")) return "exclamation";
    return "normal";
};

export const speak = (length, gender, wave, type, volume, destination) => {
    const sentenceProperties = sentenceTypes[type.toLowerCase()] || senteceTypes["normal"];
    const sequence = [...sentenceProperties.start.map(f=>f*int(0.8, 1.3)), ...new Array(Math.max(length - sentenceProperties.ending.length, 0)).fill(0).map(_ => int(80, 200)), ...sentenceProperties.ending.map(f=>f*int(0.8, 1))];
    sequence.forEach((freq, i) => {
        setTimeout(() => {
            if (destination) {
                play(wave || "sawtooth", freq * genderFrequencyMultiplier[gender || "female"], 100 * sentenceProperties.rate, 0.1 * sentenceProperties.rate, volume, destination);
            }
            play(wave || "sawtooth", freq * genderFrequencyMultiplier[gender || "female"], 100 * sentenceProperties.rate, 0.1 * sentenceProperties.rate, volume);
        }, 100 * sentenceProperties.rate * i);
    });
};
export const speakText = (text, gender, wave, volume, destination) => {
    const sentences = splitSentences(text);
    let totalTime = 0;
    sentences.forEach(t => {
        const type = resolveType(t);
        const delayUntilNext = 100 + (100 * Math.max(t.length, sentenceTypes[type].ending.length+1+sentenceTypes[type].start.length)) * sentenceTypes[type].rate;
        setTimeout(() => {
            speak(t.length, gender, wave, type, volume, destination);
        }, totalTime);
        totalTime += delayUntilNext;
    });
    return totalTime;
};
