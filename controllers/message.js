const Message = require("../models/Message")
const Chat = require("../models/Chat")
const User = require("../models/User")

exports.createChat = async(req, res) => {
    //const { recipientId } = req.params
    const { person1, person2 } = req.body


    const chat = await Chat.create({ person1, person2 })

    await User.findByIdAndUpdate(person1, { $push: { chats: chat } })
    await User.findByIdAndUpdate(person2, { $push: { chats: chat } })

    res.status(201).json({ chat })
}

exports.getAllChats = async(req, res) => {
    const chats = await Chat.find()
    res.status(200).json({ chats })
}

exports.getChat = async(req, res) => {
    const chat = await Chat.findById(req.params.chatId)
    res.status(200).json({ chat })
}

exports.createMessage = async(req, res) => {
    const { body } = req.body
    const { chatId } = req.params
    const message = await Message.create({
        body,
        chat: chatId
    })

    await Chat.findByIdAndUpdate(chatId, { $push: { messages: message } })

    res.status(201).json({ message })
}




// exports.createMessage = async(req, res) => {
//     const { description } = req.body
//     const { recipientId } = req.params
//     const message = await Message.create({
//         description,
//         owner: req.user.id,
//         recipient: recipientId
//     })

//     await User.findByIdAndUpdate(recipientId, { $push: { messages: message } })

//     res.status(201).json({ message })
// }

// exports.getMessages = async(req, res) => {
//     const { ownerId } = req.params
//     const messages = await Message.find({ owner: ownerId })
//     res.status(200).json({ messages })
// }