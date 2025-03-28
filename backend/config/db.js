const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database!");
  } catch (error) {
    console.error("Error connecting to Database!");
  }
};

module.exports = dbConnection;