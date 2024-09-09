/**
 * Randomly display Goku on the main banner of the site.
 */
function showGoku() {
    const GOKU_CHANCE = 0.9;

    if (Math.random() > GOKU_CHANCE) {
        $('#goku').css({'display': 'inline'});
    }
}

/**
 * Generate a picture of Piccolo sacrificing himself. Placed randomly on the screen.
 * @param {number} time - How long it will take before the picture of Piccolo is appended to the body. 
 * @param {number} designation - Number that will serve as the ID for any given Piccolo image.
 * @returns {Promise} - Whether or not the picture is generated.
 */
function genPiccoloImg(time, designation) {
    const MAX_LEFT = 80, MAX_TOP = 70, MIN = 0;
    const LEFT = generateRandInt(MIN, MAX_LEFT), TOP = generateRandInt(MIN, MAX_TOP);

    let img = $('<img>').attr('src', '../imgs/piccolo.jpg').addClass('piccolo');
    img.attr('id', designation);
    img.css({'top': TOP + 'vh', 'left': LEFT + 'vw'});

    return new Promise((resolve) => {    
        setTimeout(() => {
            $('body').append(img);

            resolve('Resolved!');
        }, time);
    });
}

/**
 * Make a given Piccolo fade out and get deleted.
 * @param {number} time - Amount of time before Piccolo fades out.
 * @param {number} designation - The ID of a designated Piccolo.
 */
function fadeOut(time, designation) {
    const FADE_TIME = 1000;

    setTimeout(() => {
        $('#' + designation).addClass('fade-out');

        setTimeout(() => {
            $('#' + designation).remove();
        }, FADE_TIME);
    }, time);
}

/**
 * This function continually generates Piccolo images.
 * @param {number} num - Number of Piccolo images to generate. 
 */
async function piccoloEvent(num) {
    const MIN_TIME = 0, MAX_TIME = 2000;
    const MIN_LIFE = 3000, MAX_LIFE = 5000;

    const STREET_SPIRIT = new Audio('../sounds/streetspirit.mp3');
    STREET_SPIRIT.play();

    for (let i = 0; i < num; i++) {
        let randTime = generateRandInt(MIN_TIME, MAX_TIME);
        let timeToLive = generateRandInt(MIN_LIFE, MAX_LIFE);

        await genPiccoloImg(randTime, i).then(() => {
            fadeOut(timeToLive, i);
        });
    }
}