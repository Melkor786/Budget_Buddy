const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const User = require("../models/userModel");

exports.registerController = async (req, res, profileImageUrl) => { 
  const { firstName, lastName, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath: profileImageUrl,
    });

    await newUser.save();

    res.status(200).json({ 
      message: "User registered successfully!", 
      user: newUser 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
};


exports.loginController = async (req, res) => {
    if(req.body.googleAccessToken){
      const { googleAccessToken } = req.body;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {

        const email = response.data.email;
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const picture = response.data.picture;
        
        
        const existingUser = await User.findOne({ email });

        if (!existingUser){
          const newUser = await User.create({
            email,
            firstName,
            lastName,
            password: Date.now(),
            profileImagePath:picture,
          });
          const token = jwt.sign(
            {
              email: newUser.email,
              id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({  token, user:newUser });
        }
        else{
          const token = jwt.sign(
            {
              email: existingUser.email,
              id: existingUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
          );
          res.status(200).json({  token, user:existingUser });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "Invalid access token!" });
      });
    }
    else{
      try {
      const { email, password } = req.body;

      // matching email
      const user = await User.findOne({ email });
      if (!user) 
        return res.status(409).json({ message: "User doesn't exist!" });
      

      //matching password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials!" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      delete user.password;

      res.status(200).json({ token, user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }}
};

