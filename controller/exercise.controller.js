const verifyToken = require("../other/verifytoken")
const logs = require('../model/logs')
const user = require('../model/users')
const exercise = require('../model/exercise')
const { copyFileSync } = require("fs")
const { isObjectIdOrHexString } = require("mongoose")
const mongoose = require("mongoose")
exports.setExerciseLogs = async (req, res) => {

    const newData = req.body

    const updateData = newData.updateData

    const userInfo = verifyToken(req.headers.authorization)
    let state = true

    const newlog = new logs({
        ...updateData,
        userid: userInfo.id
    })

    newlog.save()
        .then(() => {
            res.send({
                message: "success"
            })
        })
}

exports.setExercisePlan = async (req, res) => {

    const newData = req.body
    const updateData = newData.updateData
    if (updateData.year === '') return
    const userInfo = verifyToken(req.headers.authorization)
    let addStatus = null
    await exercise.find({ userid: userInfo.id })
        .then((response) => {
            if (response.length === 0) {
                addStatus = true
            } else {

                addStatus = true

                const currentData = {
                    year: String(updateData.year),
                    month: String(updateData.month),
                    date: String(updateData.date),
                    day: String(updateData.day),
                }
                response.map((item, index) => {
                    const existData = {
                        year: item.year,
                        month: item.month,
                        date: item.date,
                        day: item.day,
                    }
                    const string1 = JSON.stringify(existData)
                    const string2 = JSON.stringify(currentData)
                    if (string1 === string2) {
                        addStatus = false
                    }
                })
            }
        })

    if (addStatus === true) {
        const newExercise = new exercise({
            userid: userInfo.id,
            year: updateData.year,
            month: updateData.month,
            date: updateData.date,
            day: updateData.day,
            exerciseType: updateData.exerciseType
        })
        newExercise.save()
            .then(() => {
                res.send({
                    message: "added"
                })
            })
    }
    else {
        await exercise.findOneAndUpdate(
            {
                userid: userInfo.id,
                year: updateData.year,
                month: updateData.month,
                date: updateData.date,
                day: updateData.day
            },
            updateData,
            { new: true })
            .then(() => {
                res.send({
                    message: "Updated"
                })
            })
            .catch((err) => {
                res.send({
                    message: "failed"
                })
            })
    }

}


exports.getExercisePlan = async (req, res) => {
    const getData = req.body.getData;

    if (getData.year === '') {
        return;
    }
    // let userid = verifyToken(req.headers.authorization);
    let userid = "";
    const userInfo = verifyToken(req.headers.authorization)
    userid = userInfo.id
    if (userid === '')
        res.send({
            message: "ExercisePlan is not exist"
        })
    else {
        await exercise.find({ userid: userid, year: getData.year, month: getData.month, date: getData.date })
            .then((result) => {
                if (result.length !== 0) {
                    res.send({
                        message: "success",
                        result: result[0]
                    })
                } else {
                    res.send({
                        message: "There is no plan"
                    })
                }
            })
    }
}


exports.getWeeklyExerciseHistory = async (req, res) => {

    const updateData = req.body.updateData

    const year = updateData.year
    const month = updateData.month
    const date = updateData.date

    const userInfo = verifyToken(req.headers.authorization)
    id = new mongoose.Types.ObjectId(userInfo.id);
    
    const result = await logs.aggregate([
        {
            $match: {
                userid: id,
                $expr: {
                    $and: [
                        { $gte: [{ $toInt: "$year" }, Number(year[0])] },
                        { $lte: [{ $toInt: "$year" }, Number(year[6])] },
                        { $gte: [{ $toInt: "$month" }, Number(month[0])] },
                        { $lte: [{ $toInt: "$month" }, Number(month[6])] },
                        { $gte: [{ $toInt: "$date" }, Number(date[0])] },
                        { $lte: [{ $toInt: "$date" }, Number(date[6])] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: {
                    year: "$year",
                    month: "$month",
                    date: "$date"
                },
                averageCounter: { $avg: { $toInt: "$counter" } },
                averageDurtime: { $sum: { $toInt: "$durtime" } },
                averageAccuracy: { $avg: { $toDouble: "$accuracy" } },
                data: { $push: "$$ROOT" }
            }
        },
        { $sort: { "_id.year": -1, "_id.month": -1, "_id.date": -1 } }
    ])


    res.send(result);
}

