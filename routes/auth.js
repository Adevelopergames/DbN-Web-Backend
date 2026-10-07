// Script de JavaScript hecho por @Adeveloper_games //

const express = require("express");
const passport = require("passport");

const router = express.Router();


// =========================
// DISCORD LOGIN
// =========================

router.get(
    "/discord",
    passport.authenticate("discord")
);


// =========================
// DISCORD CALLBACK
// =========================

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


// =========================
// LOGOUT
// =========================

router.get("/logout", (req, res, next) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {

            if (err) {
                return next(err);
            }

            res.clearCookie("connect.sid", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });

            res.redirect("https://deadbynightlight.online");
        });

    });

});


// =========================
// AUTH ERROR
// =========================

router.get("/error", (req, res) => {
    res.status(401).send("Error al iniciar sesión.");
});


module.exports = router;
