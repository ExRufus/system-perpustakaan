const express = require("express");
const router = express.Router();
const api = require("./api");
const auth = require("./auth");
const home = require("./home");

router.use("/api", api);
router.use("/", auth);
router.use("/", home);


module.exports = router;