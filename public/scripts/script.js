$(function() {
    // Socket.io activities.
    const socket = io();

    // Allow the user to send their name to Mr. Pod.
    $('#sendName').click(() => {
        socket.emit('NameSubmit', $('#nameField').val());
        $('#nameField').val('');
    });

    socket.on('NameReceive', (data) => {
        createEnvelope(data[0], data[1]);
    });

    // This section of code is dedicated to gags.
    showGoku();

    const EVENT_CHANCE = 0.99, PICCOLOS = 500;

    $('body').click(() => {
        if (Math.random() > EVENT_CHANCE) {
            piccoloEvent(PICCOLOS);
        }
    });
});