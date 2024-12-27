import User from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//route for user login

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "user doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.status(201).json({ success: true, token: token });
    } else {
      res.status(400).json({ success: false, msg: "invalid credintials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

//route for user registration
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking user already exists or not
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, msg: "user already exists" });
    }

    //validating email and password

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "enter a valid email" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    const user = await newUser.save();

    //generating jwt token
    const token = createToken(user._id);

    res.status(201).json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

//route for admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token: token });
    } else {
      res.status(400).json({ success: false, msg: "Invalid credentails" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export { userLogin, userRegister, adminLogin };
