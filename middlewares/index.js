exports.catchErrors = ctlr => (req, res, next) => ctlr(req, res).catch(next)

exports.setLocals = app => (req, res, next) => {
    if (req.isAuthenticated()) {
        app.locals.user = req.user
    } else {
        app.locals.user = false
    }
    next()
}