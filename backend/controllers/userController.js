import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const CreateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Checking if the email has already been used
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exist. Log in",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email address" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a stronger password. 8 characters or more.",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({
        success: false,
        message: "User does not exist. Double check email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { CreateUser, LoginUser };
