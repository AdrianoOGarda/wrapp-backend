const Project = require("../models/Project")
const User = require("../models/User")
const CrewPost = require("../models/CrewPost")

exports.getProjects = async(req, res) => {
    const projects = await Project.find().populate("owner").populate("posts")
    res.status(200).json({ projects })
}

exports.getProject = async(req, res) => {
    const project = await Project.findById(req.params.projectId).populate("owner").populate("posts").populate({
        path: 'posts',
        populate: { path: 'owner', model: 'User' }
    }).populate({
        path: 'posts',
        populate: { path: 'project', model: 'Project' }
    })
    res.status(200).json({ project })
}

exports.createProject = async(req, res) => {
    const { name, premise, location, image, date } = req.body
    const project = await Project.create({
        name,
        premise,
        location,
        image,
        date,
        owner: req.user.id
    })

    await User.findByIdAndUpdate(req.user.id, { $push: { projects: project } })
    res.status(201).json({ project })
}

exports.updateProject = async(req, res) => {
    const { name, premise, location, image } = req.body
    const { projectId } = req.params
    const project = await Project.findByIdAndUpdate(projectId, {
        name,
        premise,
        location,
        image
    }, { new: true })
    res.status(200).json({ project })
}

exports.deleteProject = async(req, res) => {
    const { projectId } = req.params
    await CrewPost.find({ project: projectId }).remove()
    await Project.findByIdAndRemove(projectId)
    res.status(200).json({ message: "deleted" })
}