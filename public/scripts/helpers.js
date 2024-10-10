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

/**
 * A function that will create a letter from Mr. Pod addressed to the user.
 * @param {string} name - The string containing the user's name.
 * @param {string} data - The contents of the letter itself.
 */
function createLetter(name, data) {
    let letter = $('<div class="fixed-centered" id="letter"></div>');

    let intro = $('<p id="intro"></p>').text('Dear ' + name + ',');
    let body = $('<p id="body"></p>').text(data);
    let end = $('<p id="end"></p>').text('Mr. Pod');

    letter.append([intro, body, end]);

    $('body').append(letter);
}

/**
 * Create an element that displays an envelope. Once clicked it will display the generated letter.
 * @param {string} name - The string containing the user's name.
 * @param {string} data - The contents of the letter itself.
 */
function createEnvelope(name, data) {
    let envelope = $('<img src="../imgs/envelope/envelope.svg" class="fixed-centered" id="envelope">');

    // "Opening" the envelope.
    envelope.click(() => {
        // Put line of code to change the image of the envelope once asset is created.

        createLetter(name, data);
    });

    // Making the envelope slide upwards towards the center of the screen.
    envelope.css({'top': '300%'});

    setTimeout(() => {
        envelope.css({'top': '50%'});
    }, 100);

    $('body').append(envelope);
}