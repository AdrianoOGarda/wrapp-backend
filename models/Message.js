const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    body: String,
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: true,
});


module.exports = model('Message', messageSchema);