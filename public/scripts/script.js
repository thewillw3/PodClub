$(function() {
    showGoku();

    const EVENT_CHANCE = 0.99, PICCOLOS = 500;

    $('body').click(() => {
        if (Math.random() > EVENT_CHANCE) {
            piccoloEvent(PICCOLOS);
        }
    });
});