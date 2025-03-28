const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const router = require("./routes/Images.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/images", router)

async function main() {
  await dbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();