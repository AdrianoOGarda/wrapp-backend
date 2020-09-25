const User = require("../models/User")

exports.getUsers = async(req, res) => {
    const users = await User.find()
    res.status(200).json({ users })
}

exports.getUser = async(req, res) => {
    const user = await (await User.findById(req.params.userId))
    res.status(200).json({ user })
}

exports.updateUser = async(req, res) => {
    const { image, about, crewTitle } = req.body
    const { userId } = req.params

    const user = await User.findByIdAndUpdate(userId, {
        image,
        about,
        crewTitle
    }, { new: true })
    res.status(200).json({ user })
}

exports.deleteUser = async(req, res) => {
    const { userId } = req.params
    await User.findByIdAndRemove(userId)
    res.status(200).json({ message: "deleted" })
}