const mongoose = require('mongoose');

const user = mongoose.model('user', {
    name: {
        type: String
    },
    comment: {
        type: String
    }
});

module.exports = user;