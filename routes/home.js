const express = require("express");
const checkRole = require("../middlewares/checkRole");
const home = express.Router();

home.get("/admin", checkRole(["admin"]), (req, res, next) => {
    res.render("admin", { page: { title: "Halaman admin!" }, user: req.user });
});

home.get("/pustakawan", checkRole(["user"]), (req, res, next) => {
    res.render("pustakawan", { page: { title: "Halaman pustakawan!" }, user: req.user });
});

home.get("/loan", checkRole(["admin", "user"]), (req, res, next) => {
    res.render("loan", { page: { title: "Halaman loan!" }, user: req.user });
});

module.exports = home;