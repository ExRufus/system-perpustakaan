const express = require("express");
const authController = require("../controllers/authController");
const auth = express.Router();

auth.get("/login", authController.index);
auth.post("/login", authController.login);
auth.get("/logout", authController.logout);

/**
 * @swagger
 * /registration:
 *   post:
 *     tags:
 *       - Authentication
 *     title: Registrasi
 *     summary: Endpoint registration user
 *     description: create new users
 *     requestBody:
 *         description: Body Registrasi 
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Registration'
 *           application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/Registration'
 *     responses:
 *       200:
 *         description: Registrasi Berhasil!
 *       400:
 *         description: Password konfirmasi tidak sesuai!
 */

auth.post("/registration", authController.registration);
auth.post("/auth/token", authController.loginToken);

module.exports = auth;