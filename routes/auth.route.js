const express = require("express");
// const authController = require("../controllers/auth.controller");
const { register, login, profile, logout } = require("../controllers/auth.controller");
const { sessionCheckAuth } = require("../middleware/auth.middleware");

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/profile", sessionCheckAuth, profile);
router.get("/logout", sessionCheckAuth, logout);

module.exports = router;