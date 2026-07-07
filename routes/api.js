// Script de JavaScript hecho por @Adeveloper_games //
const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.json({
            logged: false
        });
    }

    res.json({
        logged: true,
        user: req.user
    });
});
module.exports = router;