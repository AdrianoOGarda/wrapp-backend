const Message = require("../models/Message")
const User = require("../models/User")

exports.createMessage = async(req, res) => {
    const { description } = req.body
    const { recipientId } = req.params
    const message = await Message.create({
        description,
        owner: req.user.id,
        recipient: recipientId
    })

    await User.findByIdAndUpdate(recipientId, { $push: { messages: message } })

    res.status(201).json({ message })
}

exports.getMessages = async(req, res) => {
    const { ownerId } = req.params
    const messages = await Message.find({ owner: ownerId })
    res.status(200).json({ messages })
}