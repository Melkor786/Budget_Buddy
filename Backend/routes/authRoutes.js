const router = require("express").Router();
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const {
  loginController,
  registerController,
} = require("../controllers/userControllers");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/register", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: "user_profiles" },
    async (error, result) => {
      if (error) {
        console.error("Cloudinary upload failed:", error);
        return res.status(500).json({ message: "Cloudinary upload failed", error });
      }

      try {
        // console.log(result.secure_url);
        await registerController(req, res, result.secure_url);
      } catch (err) {
        console.error("Registration failed:", err);
        if (!res.headersSent) {
          res.status(500).json({ message: "User registration failed", error: err });
        }
      }
    }
  );

  uploadStream.end(req.file.buffer);
});

    
router.post("/login", loginController);

module.exports = router;
