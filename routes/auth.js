const express = require("express");
const authController = require("../controllers/authController");
const auth = express.Router();

auth.get("/login", authController.index);
auth.post("/login", authController.login);
auth.get("/logout", authController.logout);
auth.post("/registration", authController.registration);
auth.post("/auth/token", authController.loginToken);

module.exports = auth;