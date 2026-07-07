// Script de JavaScript hecho por @Adeveloper_games //
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
    "/discord",
    passport.authenticate("discord")
);

router.get(
    "/discord/callback",

    passport.authenticate("discord", {
    failureRedirect: "/auth/error",
    failWithError: true
}),
(err, req, res, next) => {
    console.error(err);
    next(err);
},
    (req, res) => {
        res.redirect("https://deadbynightlight.online");
    }
);

router.get("/error", (req, res) => {
    res.status(401).send("Error al iniciar sesión.");
});

module.exports = router;