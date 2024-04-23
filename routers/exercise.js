const router = require("express").Router()
const exerciseCtrl = require("../controller/exercise.controller")
const passport = require("passport")
const requireAuth = passport.authenticate("jwt", {session: false})

router.post("/setlogs", requireAuth, exerciseCtrl.setExerciseLogs);
router.post("/setexercise", requireAuth, exerciseCtrl.setExercisePlan);
router.post("/getexercise", requireAuth, exerciseCtrl.getExercisePlan)
router.post("/getweeklyhistory", requireAuth, exerciseCtrl.getWeeklyExerciseHistory);

module.exports = router;