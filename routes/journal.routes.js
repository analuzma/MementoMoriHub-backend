const router = require("express").Router();
const {
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    getAllJournalEntries,
    getJournalEntryById,
  } = require("../controllers/journal.controller");
const { verifyToken, checkRole } = require("../middleware")

//Create
router.post("/write", verifyToken, checkRole( ["User", "Admin"] ), createJournalEntry);
//Read all entries list
router.get("/", verifyToken, checkRole( ["User", "Admin"] ), getAllJournalEntries);
//Read single entry
router.get("/:id", verifyToken, checkRole( ["User", "Admin"] ), getJournalEntryById);
//Update
router.patch("/:id/edit", verifyToken, checkRole( ["User", "Admin"] ), updateJournalEntry);
//Delete
router.delete("/:id/delete", verifyToken, checkRole( ["User", "Admin"] ), deleteJournalEntry);


module.exports = router;