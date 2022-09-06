const router = require("express").Router();
const {signupProcess, loginProcess, logoutProcess} = require("../controllers/auth.controller")
const { verifyToken } = require("../middleware")

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.get("/logout", logoutProcess);

module.exports = router;