const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://vinitmittal14:wVyfTmgPbl4q5FPZ@cluster0.awtjpjr.mongodb.net/image-share-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
    console.log("Connected to database")
});

// Image Schema
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, required: true },
  comments: [
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", ImageSchema);

// Routes
// Get all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload new image
app.post("/api/images", async (req, res) => {
  const { url, description } = req.body;

  try {
    const newImage = new Image({
      url,
      description,
      comments: [],
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add comment to an image
app.post("/api/images/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.comments.push({ text });
    const updatedImage = await image.save();

    res.status(201).json(updatedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
