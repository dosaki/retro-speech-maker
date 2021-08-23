const splitKeepSplit = (text, split) => {
    const splitText = text.split(split);
    return [...(splitText.slice(0, -1).map(t => `${t}${split}`)), ...splitText.slice(-1)];
};

const splitSentences = (text) => {
    return splitKeepSplit(text, "?")
        .map(t => splitKeepSplit(t, "!")).flat()
        .map(t => splitKeepSplit(t, ".")).flat()
        .map(t => t.trim())
        .filter(t => !!t);
};

module.exports = {
    splitSentences
}