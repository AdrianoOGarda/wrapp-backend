const JobPost = require("../models/JobPost")
const User = require("../models/User")

exports.getJobPosts = async(req, res) => {
    const jobPosts = await JobPost.find()
    res.status(200).json({ jobPosts })
}

exports.getJobPost = async(req, res) => {
    const jobPost = await JobPost.findById(req.params.jobPostId)
    res.status(200).json({ jobPost })
}

exports.createJobPost = async(req, res) => {
    const { name, description, location, image, crewTitle, contactInfo } = req.body
    const jobPost = await JobPost.create({
        name,
        description,
        location,
        image,
        crewTitle,
        contactInfo,
        owner: req.user.id
    })
    await User.findByIdAndUpdate(req.user.id, { $push: { jobPosts: jobPost } })

    res.status(201).json({ jobPost })
}

exports.updateJobPost = async(req, res) => {
    const { name, description, location, image, crewTitle, contactInfo } = req.body
    const { jobPostId } = req.params
    const jobPost = await JobPost.findByIdAndUpdate(jobPostId, {
        name,
        description,
        location,
        image,
        crewTitle,
        contactInfo
    }, { new: true })
    res.status(200).json({ jobPost })
}

exports.deleteJobPost = async(req, res) => {
    const { jobPostId } = req.params
    await JobPost.findByIdAndRemove(jobPostId)
    res.status(200).json({ message: "deleted" })
}