const express = require('express');
const { getAllImages, addNewImage } = require('../controllers/images.controller');
const addComment = require('../controllers/comment.controller');
const router = express.Router();

router.get("/", getAllImages);

// Upload new image
router.post("/", addNewImage);

// Add comment to an image
router.post("/:id/comments", addComment);

module.exports = router