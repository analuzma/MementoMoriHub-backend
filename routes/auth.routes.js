const router = require("express").Router();
//import controllers
const {signupProcess, loginProcess, logoutProcess} = require("../controllers/auth.controller")
const { verifyToken } = require("../middlewares")

//middlewares
router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.get("/logout", verifyToken, logoutProcess);

module.exports = router;