const router = require("express").Router();
const {
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    getAllJournalEntries,
    getJournalEntryById,
    createFavorite,
    getFavorite
  } = require("../controllers/journal.controller");
const { verifyToken, checkRole } = require("../middleware")
//test favorite

router.post("/createfav", verifyToken, createFavorite);

router.get("/favlist", verifyToken, getFavorite);
//Create
router.post("/write", verifyToken, checkRole( ["User", "Admin"] ), createJournalEntry);
//Read all entries list
router.get("/", verifyToken, checkRole( ["User", "Admin"] ), getAllJournalEntries);
//Update
router.patch("/:id/edit", verifyToken, checkRole( ["User", "Admin"] ), updateJournalEntry);
//Delete
router.delete("/:id/delete", verifyToken, checkRole( ["User", "Admin"] ), deleteJournalEntry);

//Read single entry
router.get("/:id", verifyToken, checkRole( ["User", "Admin"] ), getJournalEntryById);

module.exports = router;