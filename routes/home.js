const express = require("express");
const checkRole = require("../middlewares/checkRole");
const dashboardController = require("../controllers/dashboardController");
const home = express.Router();

home.get("/dashboard", checkRole(["admin"]), dashboardController.index);

home.get("/pustakawan", checkRole(["user"]), (req, res, next) => {
    res.render("pustakawan", { page: { title: "Halaman pustakawan!" }, user: req.user });
});

home.get("/loan", checkRole(["admin", "user"]), (req, res, next) => {
    res.render("loan", { page: { title: "Halaman loan!" }, user: req.user });
});

module.exports = home;