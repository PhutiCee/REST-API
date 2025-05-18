require("dotenv").config()
const JWT = require("jsonwebtoken");

const generateToken = (user) => {
    return JWT.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user, gender
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

module.exports = {
    generateToken
}