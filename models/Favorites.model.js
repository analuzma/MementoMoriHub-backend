const { Schema, model } = require("mongoose");

const favoriteQuoteSchema = new Schema(
  {
    _owner: { type: Schema.Types.ObjectId, ref: "User" },
    favoritesList: [
        {id: Number,
        body: String,
        author: String}
    ]
  },
  {
    timestamps: true,
  }
);

const FavoriteQuote = model("FavoriteQuote", favoriteQuoteSchema);

module.exports = FavoriteQuote;