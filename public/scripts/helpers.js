/**
 * Inclusive random number generator.
 * @param {number} min - Minimum whole number to generate.
 * @param {number} max - Maximum whole number to generate. 
 * @returns {number} - The randomly generated number.
 */
function generateRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Darken the screen and prevent the user from interacting with the elements.
 */
function coverPage() {
    let pageCover = $('<div id="pageCover"></div>');
    $('body').append(pageCover);
}

/**
 * Remove the dark cover from the screen and return control to user.
 */
function uncoverPage() {
    $('#pageCover').remove();
}