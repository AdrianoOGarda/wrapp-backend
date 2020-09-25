const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    person1: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    person2: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
}, {
    timestamps: true,
});


module.exports = model('Chat', chatSchema);