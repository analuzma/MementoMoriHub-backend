const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const journalRoutes = require("./journal.routes");
const uploadRoutes = require("./upload.routes");
const quotesRoutes = require("./favoriteQuotes.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/journal", journalRoutes)
router.use("/upload", uploadRoutes)
router.use("/quotes", quotesRoutes)

module.exports = router;
