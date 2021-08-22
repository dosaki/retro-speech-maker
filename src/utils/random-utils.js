module.exports = {}

/**
 * Generate a random Integer.
 * @param { integer } min Minimum Integer in the range (inclusive)
 * @param { integer } max Maximum Integer in the range (inclusive)
 * @returns { integer }
 */
module.exports.int = (min, max) => {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
};