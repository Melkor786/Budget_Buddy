const router = require("express").Router();
const multer = require("multer");
const {
  loginController,
  registerController,
} = require("../controllers/userControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);

module.exports = router;
