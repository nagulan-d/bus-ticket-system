require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const ticketRoutes = require("./routes/ticketRoutes");

app.use("/api", ticketRoutes);

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose 
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Bus Ticket System API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
