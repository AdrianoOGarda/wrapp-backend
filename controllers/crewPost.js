const CrewPost = require("../models/CrewPost")
const Project = require("../models/Project")

exports.getCrewPosts = async(req, res) => {
    const crewPosts = await CrewPost.find()
    res.status(200).json({ crewPosts })
}

exports.getCrewPost = async(req, res) => {
    const crewPost = await CrewPost.findById(req.params.crewPostId)
    res.status(200).json({ crewPost })
}

exports.createCrewPost = async(req, res) => {
    const { projectId } = req.params
    const crewPost = await CrewPost.create({
        ...req.body,
        project: projectId,
        owner: req.user.id
    })
    await Project.findByIdAndUpdate(projectId, { $push: { posts: crewPost } })

    res.status(201).json({ crewPost })
}

exports.updateCrewPost = async(req, res) => {
    const crewPost = await CrewPost.findByIdAndUpdate(
        req.params.crewPostId, {...req.body }, { new: true }
    )
    res.status(200).json({ crewPost })
}

exports.deleteCrewPost = async(req, res) => {
    await CrewPost.findByIdAndRemove(req.params.crewPostId)


    res.status(200).json({ message: "deleted" })
}

exports.updateCrewProject = async(req, res) => {
    const { projectId } = req.params
    const { crewP } = req.body
    await Project.findByIdAndUpdate(projectId, { $pull: { posts: crewP } })
}