// Script de JavaScript hecho por @Adeveloper_games //
require("dotenv").config();
require("./config/passport");

const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

const express = require("express");
const sessionConfig = require("./config/session");
const passport = require("passport");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://localhost:5500",
    "https://deadbynightlight.online"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origen no permitido por CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {

    res.send("DbN Backend Online 🚀");

});

const PORT = process.env.PORT || 3000;

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});