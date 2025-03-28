const Image = require("../models/Image");

const addComment = async (req, res) => {
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
};

module.exports = addComment;