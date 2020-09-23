const router = require('express').Router();
const { catchErrors } = require("../middlewares")

const {
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} = require("../controllers/project")

const {
    getCrewPosts,
    getCrewPost,
    createCrewPost,
    updateCrewPost,
    deleteCrewPost
} = require("../controllers/crewPost")

const {
    getJobPosts,
    getJobPost,
    createJobPost,
    updateJobPost,
    deleteJobPost
} = require("../controllers/jobPost")

const {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} = require("../controllers/user")

const {
    createMessage,
    getMessages
} = require("../controllers/message")


router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
});


//==========================USER (UPDATE)======================
router.get("/users/", catchErrors(getUsers))
router.get("/users/:userId", catchErrors(getUser))
router.put("/users/:userId", catchErrors(updateUser))
router.delete("/users/:userId", catchErrors(deleteUser))


//==========================PROJECT============================
router.get("/projects/", catchErrors(getProjects))
router.get("/projects/:projectId", catchErrors(getProject))
router.post("/projects/", catchErrors(createProject))
router.put("/projects/:projectId", catchErrors(updateProject))
router.delete("/projects/:projectId", catchErrors(deleteProject))


//==========================CREW-POST===========================
router.get("/crewPosts/", catchErrors(getCrewPosts))
router.get("/crewPosts/:crewPostId", catchErrors(getCrewPost))
router.post("/crewPosts/:projectId", catchErrors(createCrewPost))
router.put("/crewPosts/:crewPostId", catchErrors(updateCrewPost))
router.delete("/crewPosts/:crewPostId", catchErrors(deleteCrewPost))


//==========================JOB-POST============================
router.get("/jobPosts/", catchErrors(getJobPosts))
router.get("/jobPosts/:jobPostId", catchErrors(getJobPost))
router.post("/jobPosts/", catchErrors(createJobPost))
router.put("/jobPosts/:jobPostId", catchErrors(updateJobPost))
router.delete("/jobPosts/:jobPostId", catchErrors(deleteJobPost))


//==========================MESSAGES============================
router.get("/messages/:ownerId", catchErrors(getMessages))
router.post("/messages/:recipientId", catchErrors(createMessage))



module.exports = router;