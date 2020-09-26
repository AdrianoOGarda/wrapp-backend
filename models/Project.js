const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: String,
    premise: String,
    location: String,
    date: Date,
    image: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'CrewPost'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    crew: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true,
});


module.exports = model('Project', projectSchema);