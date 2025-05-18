const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const { UserSchemaValidation } = require("../validation/user.validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helper/auth.helper");
const blacklistModel = require("../models/blacklist.model");

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Register User"
 *     description: "This endpoint allows the registration of a new user."
 *     operationId: "registerUser"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "User 8"
 *               email:
 *                 type: string
 *                 example: "user8@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               gender:
 *                 type: string
 *                 example: "male"
 *     responses:
 *       201:
 *         description: "User registered successfully"
 *       400:
 *         description: "Email already exists"
 *       500:
 *         description: "Internal server error"
 */
const register = async (req, res) => {
    try {
        const requestBody = req.body;
        const { error } = UserSchemaValidation.validate(req.body);

        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.details[0].message
            })
        }
        const userExist = await User.findOne({ email: requestBody.email });
        if (userExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: "Email of user already exist"
            })
        }

        const userObject = new User(requestBody);
        await userObject.save();

        return res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            message: "Registered successfully"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Login User"
 *     description: "This endpoint allows an existing user to login."
 *     operationId: "loginUser"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user8@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: "Login successful"
 *       400:
 *         description: "Invalid credentials"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: StatusCodes.NOT_FOUND,
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: "Invalid credentials"
        });
    }

    // const token = generateToken(user);
    // return res.status(StatusCodes.OK).json({
    //     status: StatusCodes.OK,
    //     message: "Login successful",
    //     token
    // });

    req.session.user = {
        id: user._id,
        emailAddress: email,
        name: user.name
    }

    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "Login successful",
    });
};

/**
 * @openapi
 * /api/v1/auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     summary: "Get User Profile"
 *     description: "This endpoint allows the user to get their profile information."
 *     operationId: "getUserProfile"
 *     responses:
 *       200:
 *         description: "User profile data"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60c72b2f9b1d4a001f2b0c3e"
 *                 emailAddress:
 *                   type: string
 *                   example: "user8@gmail.com"
 *                 name:
 *                   type: string
 *                   example: "User 8"
 *       500:
 *         description: "Internal server error"
 */
const profile = (req, res) => {
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: req.user
    })
}

/**
 * @openapi
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     summary: "Logout User"
 *     description: "This endpoint logs out the current user and destroys their session."
 *     operationId: "logoutUser"
 *     responses:
 *       200:
 *         description: "User logged out successfully"
 *       500:
 *         description: "Internal server error"
 */
const logout = async (req, res) => {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (token) {
    //     await blacklistModel.create({
    //         token,
    //         expiredAt: new Date(req.user.exp * 1000)
    //     });
    // }

    await req.session.destroy();

    res.json({
        status: true,
        message: "User logged out successfully"
    })
}

module.exports = {
    register, login, profile, logout
}