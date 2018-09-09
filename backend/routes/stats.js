const express = require("express");

const StatsController = require("../controllers/stats");

const checkAuth = require("../middleware/check-auth");


const router = express.Router();

router.get("",  StatsController.getStats);


module.exports = router;
