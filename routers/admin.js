const router = require("express").Router()
const passport = require("passport")
const requireSignin = passport.authenticate("local", { session: false })
const requireAuth = passport.authenticate("jwt", { session: false })
const adminCtrl = require("../controller/admin.controller")


router.get("/test", adminCtrl.test);
router.post("/signup", adminCtrl.signup);
router.post("/signupUpdate", adminCtrl.signupUpdate);
router.get("/signin", adminCtrl.signin);
router.post("/signinWithToken", requireAuth ,adminCtrl.signinWithToken)
router.get("/verifyemail", adminCtrl.verifyEmail)


module.exports = router


