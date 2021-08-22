import { play } from './utils/audio-utils';
import { int } from './utils/random-utils';

const genderFrequencyMultiplier = {
    "male": 0.8,
    "female": 2.2
};

export const speak = (length, gender, wave, destination) => {
    new Array(length).fill(0).map(_ => int(50, 275)).forEach((freq, i) => {
        setTimeout(() => {
            if(destination){
                play(wave || "sawtooth", freq * genderFrequencyMultiplier[gender || "female"], null, 0.1, destination);
            }
            play(wave || "sawtooth", freq * genderFrequencyMultiplier[gender || "female"], null, 0.1);
        }, 100 * i);
    });
};