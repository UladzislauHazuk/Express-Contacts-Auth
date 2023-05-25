const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/university")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

module.exports = {
  User: mongoose.model("users", {
    email: String,
    pwd: String,
  }),
  ObjectId: mongoose.Types.ObjectId,
};
