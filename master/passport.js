const passport = require("passport")
const LocalStrategy = require("passport-local")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const DataCtrl = require("../controller/database.controller")
const config = require("../other/config")

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret_key
}

module.exports = () => {
    passport.use(
        "local",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const user = await DataCtrl.search_email(email);
                    if (!user) return done(null, false)
                    const isMatch = await DataCtrl.match_password(email, password)
                    if (isMatch === false) return done(null, false)
                    return done(null, { id: user._id, email: user.email })
                } catch (err) {
                    return done (err, false);
                }
            }
        )
    )

    passport.use(
        "jwt",
        new JwtStrategy(
            jwtOptions,
            async (payload, done) => {
                try {
                    const user = await DataCtrl.search_id(payload.id)
                    if(!user) return done(null, user)
                    return done(null, user)
                } catch(err) {
                    console.log(err)
                    return done(err, false)
                }
            }
        )
    )

    console.log("passport is running")

}

