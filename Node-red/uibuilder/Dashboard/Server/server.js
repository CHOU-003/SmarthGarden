// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors()); // Cho phép frontend Vue gọi API

// Kết nối MongoDB Atlas
mongoose.connect("mongodb+srv://nguyendinhchaukid:qvSADhvHz9HAfmAb@cluster0.nleja.mongodb.net/smartgarden?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema cho collection "datagarden"
const dataSchema = new mongoose.Schema({
  timestamp: String,
  temperature: Number,
  humidity: Number,
  soilMoisture: Number
});

const DataGarden = mongoose.model("DataGarden", dataSchema, "datagarden"); // Tên chính xác của collection

// API lấy bản ghi mới nhất
app.get("/api/latest", async (req, res) => {
  try {
    const latest = await DataGarden.find().sort({ _id: -1 });
    res.json(latest);
  } catch (error) {
    console.error("❌ Lỗi khi truy vấn MongoDB:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
