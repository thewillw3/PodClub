/**
 * Inclusive random number generator.
 * @param {number} min - Minimum whole number to generate.
 * @param {number} max - Maximum whole number to generate. 
 * @returns {number} - The randomly generated number.
 */
function generateRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}