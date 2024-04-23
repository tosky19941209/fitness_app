const router = require("express").Router();
const feedbackCtrl = require("../controller/feedback.controller");
const passport = require("passport")
const requireAuth = passport.authenticate("jwt", {session: false})

router.post("/setfeedback", requireAuth, feedbackCtrl.setFeedback);

module.exports = router;