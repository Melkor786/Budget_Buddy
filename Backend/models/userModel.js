const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default:"https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
