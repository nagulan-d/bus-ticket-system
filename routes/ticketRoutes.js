const express = require("express");
const Ticket = require("../models/Ticket");
const router = express.Router();

// Create Ticket
router.post("/book", async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Tickets
router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
