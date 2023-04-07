const express = require("express");
const dashbordController = require("../controllers/dashbordController");
const checkToken = require("../middlewares/checkToken");


const dashboard = express.Router();

/**
 * @swagger
 * /api/v1/dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     title: Get Data Dashboard
 *     summary: Endpoint Data Dashboard
 *     description: this is endpoint for get data Dashboard
 *     responses:
 *       200:
 *         description: Data Dashboard!
 */
dashboard.get("/", checkToken, dashbordController.getDashboard)

module.exports = dashboard;
