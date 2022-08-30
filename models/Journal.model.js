const { Schema, model } = require("mongoose");

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Journal entry must have a title"],
    },
    entry: {
      type: String,
      required: [true, "Journal entry must have content"],
    },
    //images2:[String], ["https://dylan.com/",....]
    images: {
      type: [
        {
          id: String,
          url: String,
          name: String,
        },
      ],
      max: [3, "Only 3 images allowed per journal entry"],
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