const express = require("express");

const UserController = require("../controllers/user");
const extractFile = require("../middleware/avatarFile");

const router = express.Router();

router.post("/signup",extractFile, UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;
