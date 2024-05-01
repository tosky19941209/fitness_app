const getToken = require("../other/gettoken")
const verifyToken = require("../other/verifytoken")
const ExtractJwt = require("passport-jwt").ExtractJwt
const verifyEmail = require("../other/verifyEmail")
// Function to send an email
const nodemailer = require('nodemailer');

const passcodeModel = require("../model/emailverify")
// Function to send an email

exports.test = (req, res) => {
    res.send({
        message:"welcome to fitness"
    })
    // const fromEmail = 'felixeliass1994@gmail.com';
    // const toEmail = 'warrytomas51@gmail.com';
    // const subject = 'Test Email';
    // const text = 'Hello, this is a test email!';

    // sendEmail(fromEmail, toEmail, subject, text, (err, message) => {
    //     if (err) {
    //         res.status(500).send('Error sending email');
    //     } else {
    //         res.send('Email sent successfully');
    //     }
    // });
};

exports.signup = async (req, res) => {
    const user = require('../model/users')
    const newData = req.body
    const { username, password, email, height, weight } = newData
    user.findOne({ email })
        .then(async (response) => {
            if (response) {
                res.send({
                    message: "User is already existed"
                })
            } else {
                const min = 100000; // Minimum 6-digit number
                const max = 999999; // Maximum 6-digit number
                const passcode = Math.floor(Math.random() * (max - min + 1)) + min;
                verifyEmail(email, passcode)
                const exsitEmail = await passcodeModel.findOne({ email: email })
                if (exsitEmail) {
                    await passcodeModel.findOneAndUpdate(
                        { email: email },
                        {
                            email: email,
                            passcode: passcode,
                            password: password,
                            username: username
                        })
                    res.send({
                        message: "success",
                    })
                } else {
                    const newPasscode = new passcodeModel({
                        email: email,
                        passcode: passcode,
                        password: password,
                        username: username
                    })
                    await newPasscode.save()
                    res.send({
                        message: "success",
                    })
                }
            }
        })
}

exports.verifyEmail = async (req, res) => {
    const { email, verifyCode } = req.query
    console.log(req.query)
    if (!email) return
    const search_result = await passcodeModel.findOne({ email: email })
    console.log("passcode: ", search_result.passcode)
    console.log("frontPasscode: ", verifyCode)
    if (verifyCode === String(search_result.passcode)) {
        const userModel = require("../model/users")
        const newUser = new userModel({
            email: search_result.email,
            password: search_result.password,
            username: search_result.username
        })
        newUser.save()
            .then(() => {
                res.send({
                    message: "success"
                })
            })
    } else {
        console.log("No")
        res.send({
            message: "failed"
        })
    }
}

exports.signupUpdate = async (req, res) => {
    const user = require('../model/users')
    const header = req.body.header
    const updateData = req.body.updateData
    const { email, password } = header
    user.findOneAndUpdate({
        email: email,
        password: password
    }, updateData, { new: true })
        .then((response) => {
            if (response) {
                res.send({
                    message: "success"
                })
            } else {
                res.send({
                    message: "Email or password is not correct."
                })
            }
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.signin = async (req, res) => {
    console.log("Signin")
    const users = require('../model/users')
    const newData = req.query
    const { email, password } = newData
    users.findOne({ email, password })
        .then((user) => {
            if (user) {
                res.json({
                    name: user.username,
                    token: getToken(user),
                    message: "success"
                })
            } else {
                res.json({
                    name: '',
                    message: "failed"
                })
            }
        })
}

exports.signinWithToken = async (req, res) => {
    res.send(req.body)
}