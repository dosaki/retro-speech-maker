import {expect} from 'chai';
import {splitSentences} from '../src/utils/string-utils.js';

describe('string utils', () => {
    describe('splitSentences', () => {
        it('should split the text into multiple sentences', () => {
            expect(splitSentences('Hello! How are you?')).to.deep.equal(['Hello!', 'How are you?']);
            expect(splitSentences('Sentence 1. Sentence 2. Sentence 3.')).to.deep.equal(['Sentence 1.', 'Sentence 2.', 'Sentence 3.']);
            expect(splitSentences('Sentence 1! Sentence 2! Sentence 3!')).to.deep.equal(['Sentence 1!', 'Sentence 2!', 'Sentence 3!']);
            expect(splitSentences('Sentence 1? Sentence 2? Sentence 3?')).to.deep.equal(['Sentence 1?', 'Sentence 2?', 'Sentence 3?']);
        });
    });
});