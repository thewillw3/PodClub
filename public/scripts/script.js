$(function() {
    // Socket.io activities.
    const socket = io();

    // Allow the user to send their name to Mr. Pod.
    $('#sendName').click(() => {
        socket.emit('NameSubmit', $('#nameField').val());
        $('#nameField').val('');
    });

    // Create a letter upon text generation completion from the server.
    socket.on('NameReceive', (data) => {
        createEnvelope(data[0], data[1]);
    });

    // This section of code is dedicated to gags.
    showGoku();

    const EVENT_CHANCE = 0.01, PICCOLOS = 500;

    $('body').click(() => {
        if (Math.random() < EVENT_CHANCE) {
            piccoloEvent(PICCOLOS);
        }
    });
});