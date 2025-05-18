require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const JWT = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        const isValidToken = await blacklistModel.findOne({ token })
        if (isValidToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: StatusCodes.UNAUTHORIZED,
                message: "Invalid token"
            });
        }
        const decodedUserData = JWT.verify(token, process.env.JWT_SECRET);

        req.user = decodedUserData;
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: "No token: Access denied"
        })
    }
}

const sessionCheckAuth = async (req, res, next) => {

    if (req.session.user) {
        next();
    } else {
        return res.json({
            status: false,
            message: "Access denied"
        });
    }
}

module.exports = { verifyToken, sessionCheckAuth }