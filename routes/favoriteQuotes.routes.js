const router = require("express").Router();
const {
    createFavoriteQuote,
    getFavoriteQuotes
  } = require("../controllers/favoriteQuotes.controller");
const { verifyToken, checkRole } = require("../middleware")

router.post("/createfav", verifyToken, checkRole( ["User", "Admin"] ), createFavoriteQuote);

router.get("/favlist", verifyToken, checkRole( ["User", "Admin"] ), getFavoriteQuotes);


module.exports = router;