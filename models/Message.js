const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});


module.exports = model('Message', messageSchema);