const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // .env

const app = express();

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());
app.use(express.static("public"));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const historySchema = new mongoose.Schema(
    {
        expression: String,
        result: String,
    },
    { timestamps: true }
);

const History = mongoose.model("History", historySchema);

// GET
app.get("/api/history", async (req, res) => {
    try {
        const history = await History.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).send("Error");
    }
});

// POST
app.post("/api/history", async (req, res) => {
    const { expression, result } = req.body;
    try {
        const calculation = new History({ expression, result });
        await calculation.save();
        res.status(201).json(calculation);
    } catch (error) {
        res.status(500).send("Error");
    }
});

// DELETE
app.delete("/api/history", async (req, res) => {
    try {
        await History.deleteMany({});
        res.status(204).send();
    } catch (error) {
        res.status(500).send("Server error");
    }
});
