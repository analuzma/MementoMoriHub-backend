const { Schema, model } = require("mongoose");

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Journal entry must have a title"],
    },
    description: {
      type: String,
      required: [true, "Journal description must have content"],
    },
    coverUrl: {
      type: String,
      default:
        "https://picsum.photos/300/200?grayscale",
    },
    date: {
        type: Date,
        default: Date.now
       },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    _author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = model("Journal", journalSchema);