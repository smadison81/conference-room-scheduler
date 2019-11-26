const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String },
    start: { type: Date },
    end: { type: Date },
    description: { type: String },
  },
  {
    timestamps: true
  }
);

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;