const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const defaultUser = {
    id: 1,
    name: 'Administrator',
    email: 'admin@online.com',
    role: 'admin',
    password:
    '$2b$12$BdhlOi2ZBZuqxgy5TURvbultgnZuL1lf/WhMXLb7gvNTKvRTsoG6y'
};

function passportConfig(passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                if (email !== defaultUser.email) {
                    return done(null, false, {
                        message: 'Email not found'
                    });
                }

                const isMatch = await bcrypt.compare(
                    password,
                    defaultUser.password
                );

                if (!isMatch) {
                    return done(null, false, {
                        message: 'Incorrect password'
                    });
                }

                return done(null, defaultUser);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, defaultUser);
    });
}

module.exports = passportConfig;
