const passport = require("passport");
const { User } = require("./../models");
const baseRespone = require("../libs/base-response");

module.exports = {
  index: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect("/")
    };
    
    res.render("login", { page: { title: "Halaman Login!" }, user: null })
  },

  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  }),
  
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect("/login");
    })
  },
  
  registration: async (req, res, next) => {
    const { email, password, confirmationPassword } = req.body;

    if (password !== confirmationPassword) {
      res.status(400).json(baseRespone(null, "failed", "password konfirmasi tidak sesuai"))
    }
     
    try {
      const user = await User.registration({ email, password })
      res.status(200).json(baseRespone(user, "success", "registration Berhasil"))
    } catch (error) {
      console.log(error)
      res.status(400).json(baseRespone(null, "failed", error))
    }
  },

  loginToken: async (req, res, next ) => {
    const { email, password} = req.body;
    User.authenticateToken({email, password}).then( async(user) => {
      console.log(user)
      const data = {
        id: user.id,
        username: user.email,
        accessToken: await User.generateTokenV2({ id: user.id, email: user.email  })
      }
      res.status(200).json(baseRespone(data, "success", "Login berhasil!"))
    }).catch((err) => {
      res.status(401).json(baseRespone(null, "failed", err))
    })
  }
} 