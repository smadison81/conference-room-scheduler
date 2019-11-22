const db = require("../models");

// Defining methods for the CalendarController
module.exports = {
  findAll: () => {
    return db.Events.find({});
  },
  findById: (id) => {
    return db.Events.findById({_id: id}); 
  },
  create: (newCalendar) => {
    return db.Events.create(newEvents);
  },
  deleteOne: (id) => {
    return db.Events.findOneAndDelete({_id: id});
  },
  updateOne: (id, data) => {
    return db.Events.findOneAndUpdate({ _id: id }, data);
  }
};