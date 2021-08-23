import { play } from './utils/audio-utils';
import { int } from './utils/random-utils';

const genderFrequencyMultiplier = {
    "male": 0.8,
    "female": 2.2
};

const sentenceTypes = {
    exclamatedQuestion: {ending:[], rate:0.9},
    question: {ending:[], rate:1},
    exclamation: {ending:[], rate:0.9},
    calm: {ending:[], rate:1.2},
    normal: {ending:[], rate:1}
}

export const speak = (length, gender, wave, type, destination) => {
    const sentenceProperties = sentenceTypes[type.toLowerCase()] || senteceTypes["normal"];
    new Array(length).fill(0).map(_ => int(50, 275)).forEach((freq, i) => {
        setTimeout(() => {
            if(destination){
                play(wave || "sawtooth", freq * genderFrequencyMultiplier[gender || "female"], 100*sentenceProperties.rate, 0.1*sentenceProperties.rate, destination);
            }
            play(wave || "sawtooth", freq * genderFrequencyMultiplier[gender || "female"], 100*sentenceProperties.rate, 0.1*sentenceProperties.rate);
        }, 100 * sentenceProperties.rate * i);
    });
};

const splitKeepSplit = (text, split) => {
    const splitText = text.split(split);
    return [...(splitText.slice(0,-1).map(t => `${t}${split}`)), ...splitText.slice(-1)];
}

const resolveType = (text) => {
    if(text.includes("?!")) return "exclamatedQuestion";
    if(text.includes("?")) return "question";
    if(text.includes("!")) return "exclamation";
    return "calm";
}

export const speakText = (text, gender, wave, destination) => {
    const splitSentences = splitKeepSplit(text, "?!")
        .map(t => splitKeepSplit(t, "?")).flat()
        .map(t => splitKeepSplit(t, "!")).flat()
        .map(t => splitKeepSplit(t, ".")).flat()
        .map(t => t.trim());
    let totalTime = 0;
    splitSentences.forEach((t, i) => {
        const type = resolveType(t);
        setTimeout(() => {
            speak(t.length, gender, wave, type, destination);
        }, (300 + 100 * type.rate * t.length) * i);
        totalTime += 300 + 100 * t.length;
    });
    return totalTime;
};
