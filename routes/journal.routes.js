const router = require("express").Router();
const {
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    getAllJournalEntries,
    getJournalEntryById
  } = require("../controllers/journal.controller");
const { verifyToken, checkRole } = require("../middleware")


router.post("/write", verifyToken, checkRole( ["User", "Admin"] ), createJournalEntry);

router.get("/", verifyToken, checkRole( ["User", "Admin"] ), getAllJournalEntries);

router.patch("/:id/edit", verifyToken, checkRole( ["User", "Admin"] ), updateJournalEntry);

router.delete("/:id/delete", verifyToken, checkRole( ["User", "Admin"] ), deleteJournalEntry);
  
router.get("/:id", verifyToken, checkRole( ["User", "Admin"] ), getJournalEntryById);

module.exports = router;