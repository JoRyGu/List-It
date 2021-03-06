const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./src/db/models').User;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findByPk(jwt_payload.id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch((err) => console.log(err));
    }));
}