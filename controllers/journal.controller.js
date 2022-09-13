const Journal = require("../models/Journal.model");
const mongoose = require("mongoose");
const { clearRes } = require("../utils/utils");


//CREATE
exports.createJournalEntry = async (req, res, next) => {
  const { title, description, coverUrl, date, isFeatured } = req.body;
  const {_id:_author} = req.user
  try {
    const journalEntry = await Journal.create({ _author, title, description, coverUrl, date, isFeatured });
    const newJournalEntry = clearRes(journalEntry.toObject());
    res.status(201).json({ journalEntry: newJournalEntry });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Journal entry created" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
//UPDATE
exports.updateJournalEntry = async (req, res, next) => {
    const { id } = req.params;
    const {_id:_author} = req.user
  try {
    const journalEntry = await Journal.findOneAndUpdate(
        { _id:id, _author},
        { ...req.body },
        { new: true }
    );
    const newJournalEntry = clearRes(journalEntry.toObject());
    res.status(201).json({ journalEntry: newJournalEntry });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Something happened while attempting to update this journal entry" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
//DELETE
exports.deleteJournalEntry = async (req, res, next) => {
  const { id } = req.params;
  const {_id:_author} = req.user
  try {
    await Journal.findOneAndDelete({_id:id, _author});
    res.status(201).json({ successMessage: "Journal entry has been deleted" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Something happened whie attempting to delete this journal entry" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
//GET ALL
exports.getAllJournalEntries = async (req, res, next) => {
    const {_id:_author} = req.user
    try {
    const journalEntries = await Journal.find({_author}, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    res.status(201).json({ journalEntries });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Something happened while retrieving journal entries" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
//GET SINGLE
exports.getJournalEntryById = async (req, res, next) => {
  const { id } = req.params;
  const {_id:_author} = req.user
  try {
    const journalEntry = await Journal.findOne({_id:id, _author});
    const newJournalEntry = clearRes(journalEntry.toObject());
    res.status(201).json({ journalEntry: newJournalEntry });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Something happened while retrieving this journal" });

    return res.status(500).json({ errorMessage: error.message });
  }
};