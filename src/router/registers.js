const express = require("express");

//router
const router = express.Router();

//routes
router.get("/registers", (req, res) => {
    res.send("Works")
});

module.exports = router; 