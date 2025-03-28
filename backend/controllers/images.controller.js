const Image = require("../models/Image");

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNewImage = async (req, res) => {
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
};

module.exports = {getAllImages, addNewImage}