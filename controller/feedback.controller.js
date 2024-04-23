const verifyToken = require("../other/verifytoken")

exports.setFeedback = async (req, res) => {

    const updateData = req.body.updateData
    const feedback = require('../model/feedback')
    const users = require("../model/users")
    const userInfo = verifyToken(req.headers.authorization)
    if (resultUser === null) return
    const newFeedback = new feedback({
        userid: userInfo.id,
        year: updateData.year,
        month: updateData.month,
        date: updateData.date,
        hour: updateData.hour,
        minute: updateData.minute,
        feedback: updateData.feedback
    })

    await newFeedback.save()
        .then(() => {
            res.send({
                message: "success"
            })
        })
}