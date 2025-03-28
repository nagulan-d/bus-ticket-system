const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");  // Ensure this path is correct

const ticketSchema = new mongoose.Schema({
  passengerName: String,
  busNumber: String,
  date: Date,
  seatNumber: Number,
  price: Number,
});

module.exports = mongoose.model("Ticket", ticketSchema);
