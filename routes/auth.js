const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');

router.post('/signup', (req, res, next) => {
    User.register({...req.body, image: "https://www.pngitem.com/pimgs/m/210-2102461_vector-illustration-of-filmmaking-and-video-production-movie.png" }, req.body.password)
        .then((user) => res.status(201).json({ user }))
        .catch((err) => res.status(500).json({ err }));
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    const { user } = req;
    User.findById(user._id).populate("chats").populate({
            path: 'chats',
            populate: { path: 'person1', model: 'User' }
        }).populate({
            path: 'chats',
            populate: { path: 'person2', model: 'User' }
        })
        .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ err }));
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ msg: 'Logged out' });
});

router.get('/profile', isAuth, (req, res, next) => {
    User.findById(req.user._id).populate("chats").populate({
            path: 'chats',
            populate: { path: 'person1', model: 'User' }
        }).populate({
            path: 'chats',
            populate: { path: 'person2', model: 'User' }
        })
        .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ err }));
});

//SOCIAL
router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
)

router.get("/auth/facebook/callback", (req, res, next) => {
    passport.authenticate("facebook", { scope: ["email"] }, (err, user, info) => {
        if (err) return res.status(500).json({ err, info })
        if (!user) return res.status(401).json({ err, info })

        req.login(user, error => {
            if (error) return res.status(401).json({ error })
            return res.redirect(process.env.FRONTENDPOINT + "/home")
        })
    })(req, res, next)
})

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", { scope: ["email"] }, (err, user, info) => {
        if (err) return res.status(500).json({ err, info })
        if (!user) return res.status(401).json({ err, info })

        req.login(user, error => {
            if (error) return res.status(401).json({ error })
            return res.redirect(process.env.FRONTENDPOINT + "/home")
        })
    })(req, res, next)
})

//

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;