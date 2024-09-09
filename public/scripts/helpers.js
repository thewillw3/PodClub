/**
 * Random number helper function.
 */
function generateRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}