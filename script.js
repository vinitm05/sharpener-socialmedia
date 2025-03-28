document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const imageUrl = document.getElementById("imageUrl").value;
  const description = document.getElementById("imageDescription").value;

  try {
    const response = await fetch("http://localhost:5000/api/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl, description }),
    });

    if (response.ok) {
      // Reset form
      document.getElementById("imageUrl").value = "";
      document.getElementById("imageDescription").value = "";

      // Refresh images
      fetchImages();
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
});

async function fetchImages() {
  try {
    const response = await fetch("http://localhost:5000/api/images");
    const images = await response.json();

    const galleryEl = document.getElementById("imageGallery");
    galleryEl.innerHTML = ""; // Clear existing images

    images.forEach((image) => {
      const imageCard = document.createElement("div");
      imageCard.className = "image-card";
      imageCard.innerHTML = `
                        <img src="${image.url}" alt="${image.description}">
                        <p>${image.description}</p>
                        <div class="comment-section">
                            <form onsubmit="addComment(event, '${image._id}')">
                                <input 
                                    type="text" 
                                    placeholder="Add a comment" 
                                    required
                                    id="comment-${image._id}"
                                >
                                <button type="submit">Comment</button>
                            </form>
                            <div class="comments" id="comments-${image._id}">
                                ${
                                  image.comments
                                    .map(
                                      (comment) =>
                                        `<div class="comment">
                                        <div class="comment-author">Anonymous</div>
                                        <div class="comment-text">${comment.text}</div>
                                    </div>`
                                    )
                                    .join("") || "No comments yet"
                                }
                            </div>
                        </div>
                    `;
      galleryEl.appendChild(imageCard);
    });
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

async function addComment(e, imageId) {
  e.preventDefault();
  const commentInput = document.getElementById(`comment-${imageId}`);
  const commentText = commentInput.value;

  try {
    const response = await fetch(
      `http://localhost:5000/api/images/${imageId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: commentText }),
      }
    );

    if (response.ok) {
      commentInput.value = "";
      fetchImages(); // Refresh to show new comment
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

// Initial fetch of images
fetchImages();
