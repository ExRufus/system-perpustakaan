const express = require("express");
const router = express.Router();
const api = require("./api");
const auth = require("./auth");
const home = require("./home");
const swaggerUi = require("./swagger-ui");

router.use("/api-docs", swaggerUi)
router.use("/api", api);

// router.get("/dashboard", (req, res, next) => {
//   res.render("admin", { page: { title: "Halaman beranda!" }, user: req.isAuthenticated ? req.user: null })
// });

router.get("/", (req, res) => {
  res.render("home", {page: { title: "Dashboard" }, user: req.isAuthenticated ? req.user: null })
});

router.use("/", auth);
router.use("/", home);

module.exports = router;