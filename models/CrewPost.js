const { Schema, model } = require('mongoose');

const crewPostSchema = new Schema({
    name: String,
    description: String,
    location: String,
    image: String,
    contactInfo: String,
    budget: Number,
    lookingFor: {
        type: String,
        enum: [
            "Art Director",
            "Assistant Food Stylist",  
            "Assistant Director / 1st AD",
            "Assistant Director / 2nd AD",
            "Best Boy",
            "Boom Operator",
            "Camera Assistant (1st AC)",
            "Camera Assistant (2nd AC)",
            "Camera Operator",
            "Camera Operator (Aerial)",
            "Camera Operator (Jib Arm / Crane)",
            "Craft Service",
            "Costume Designer",
            "Captains / Gang Boss",
            "Composer (film score)",
            "Data Wrangling",
            "Digital Imaging Technician",
            "Director of Photography",
            "Director",
            "Editor",
            "Electrician",
            "Food Stylist",
            "Foley Artist",
            "Gaffer",
            "Grip",
            "Hair Stylist",
            "Key Grip",
            "Location Manager",
            "Location Scout",
            "Line Producer",
            "Makeup Artist",
            "Other (specified in the description)",
            "Prop Maker",
            "Prop Master",
            "Photographer / Production Stills",
            "Producer",
            "Production Assistant",
            "Production Coordinator",
            "Production Designer",
            "Production Manager",
            "Production Secretary",  
            "Pyro Technician / Explosives",
            "Scenic Artist / Painter",
            "Screenwriter",
            "Set Construction Coordinator / Builder",
            "Set Decorator / Dresser",
            "Storyboard Artist",
            "Steadicam Owner / Operator",  
            "Script Supervisor / Continuity",
            "Sound Mixer",
            "Special Effects Coordinator",
            "Special Effects Technician",
            "Stunt Coordinator",
            "Teleprompter Operator",
            "Transportation Driver",
            "Videographer",
            "Video Assist Operator",
            "Wardrobe Stylist"
        ]
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true,
});


module.exports = model('CrewPost', crewPostSchema);