/**
 * Generate a random Integer.
 * @param { number } min Minimum Integer in the range (inclusive)
 * @param { number } max Maximum Integer in the range (inclusive)
 * @returns { number }
 */
export const int = (min, max) => {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
};