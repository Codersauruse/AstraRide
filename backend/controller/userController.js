import User from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id, username, roles) => {
  return jwt.sign(
    { id: id, username: username, roles: roles },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//route for user login

const userLogin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "user doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id, username, user.role);

      res
        .status(201)
        .json({
          success: true,
          id: user._id,
          username: username,
          roles: user.role,
          token: token,
        });
    } else {
      res.status(500).json({ success: false, msg: "invalid credintials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

//route for user registration
const userRegister = async (req, res) => {
  console.log("register");
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 6 characters long",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      name: username,
      email: email,
      password: password,
    });
    await newUser.save();

    // Send success response
    res
      .status(201)
      .json({ success: true, msg: "User registration successful" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ success: false, msg: "Server error. Please try again later." });
  }
};

//route for admin login

const assignAdminRole = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, msg: "User not found" });
    }

    // Check if the user already has the 'admin' role
    if (user.role.includes("admin")) {
      return res
        .status(400)
        .json({ success: false, msg: "User is already an admin" });
    }

    // Add the 'admin' role to the user's role array
    user.role.push("admin");

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({ success: true, msg: "User role updated to admin", user });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export { userLogin, userRegister, assignAdminRole };
