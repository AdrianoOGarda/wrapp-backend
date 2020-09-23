const Project = require("../models/Project")

exports.getProjects = async(req, res) => {
    const projects = await Project.find()
    res.status(200).json({ projects })
}

exports.getProject = async(req, res) => {
    const project = await Project.findById(req.params.projectId)
        //TO DO: populate posts 
    res.status(200).json({ project })
}

exports.createProject = async(req, res) => {
    const { name, premise, location, image } = req.body
    const project = await Project.create({
        name,
        premise,
        location,
        image,
        owner: req.user.id
    })
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
    await Project.findByIdAndRemove(projectId)
    res.status(200).json({ message: "deleted" })
}