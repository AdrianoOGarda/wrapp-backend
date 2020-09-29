const User = require("../models/User")

exports.getUsers = async(req, res) => {
    const users = await User.find()
    res.status(200).json({ users })
}

exports.getUser = async(req, res) => {
    const user = await User.findById(req.params.userId).populate("projects").populate("jobPosts")
    res.status(200).json({ user })
}

exports.updateUser = async(req, res) => {
    const { image, name, about, crewTitle, backgroundImage } = req.body
    const { userId } = req.params

    const user = await User.findByIdAndUpdate(userId, {
        image,
        backgroundImage,
        name,
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

exports.followUser = async(req, res) => {
    const { userId } = req.params

    await User.findByIdAndUpdate(req.user.id, { $push: { following: userId } })
    res.status(200).json({ message: "following new user" })
}

exports.unfollowUser = async(req, res) => {
    const { userId } = req.params

    await User.findByIdAndUpdate(req.user.id, { $pull: { following: userId } })
    res.status(200).json({ message: "removed user from following" })
}