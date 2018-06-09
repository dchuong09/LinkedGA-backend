const Chatroom = require('../models/Chatroom');

Chatroom.remove({}, function (err, res) {
    if (err) {
        console.log('Error removing Charoom: ', err);
        return;
    }
    console.log('Removing all Chatroom');
})