router = require("express").Router()
videoCtrl = require("../controller/video.controller")
const passport = require("passport")
const requireAuth = passport.authenticate("jwt", {session: false})
router.get("/video_load", videoCtrl.video_load)

module.exports = router