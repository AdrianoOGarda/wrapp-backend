const User = require("../models/User")

exports.getUsers = async(req, res) => {
    const users = await User.find()
    res.status(200).json({ users })
}

exports.getUser = async(req, res) => {
    const user = await User.findById(req.params.userId).populate("projects").populate("jobPosts").populate("following")
        .populate({
            path: 'following',
            populate: {
                path: 'projects',
                model: 'Project',
                populate: { path: 'owner', model: 'User' },
            }
        })
        .populate({
            path: 'following',
            populate: {
                path: 'projects',
                model: 'Project',
                populate: { path: 'posts', model: 'CrewPost' }
            }
        })


    console.log('user: ', user.following.map(f => f.projects))
    res.status(200).json({ user })
}


// exports.getProject = async(req, res) => {
//     const project = await Project.findById(req.params.projectId).populate("owner").populate("posts").populate({
//         path: 'posts',
//         populate: { path: 'owner', model: 'User' }
//     }).populate({
//         path: 'posts',
//         populate: { path: 'project', model: 'Project' }
//     })
//     res.status(200).json({ project })
// }

exports.updateUser = async(req, res) => {
    const { image, name, about, crewTitle, backgroundImage, location } = req.body
    const { userId } = req.params

    const user = await User.findByIdAndUpdate(userId, {
        image,
        backgroundImage,
        name,
        location,
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

    const newUser = await User.findByIdAndUpdate(req.user.id, { $push: { following: userId } })
    res.status(200).json({ newUser })
}

exports.unfollowUser = async(req, res) => {
    const { userId } = req.params

    const newUser = await User.findByIdAndUpdate(req.user.id, { $pull: { following: userId } })
    res.status(200).json({ newUser })
}