import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sanitizeHtml from "sanitize-html";

// 🧹 sanitize helper
const clean = (value) =>
  sanitizeHtml(value || "", {
    allowedTags: [],
    allowedAttributes: {}
  });

// 📧 email validation
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// 🔐 generate token safely
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// 🍪 cookie options (auto dev/prod)
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only https in prod
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
};


// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // 🧹 sanitize
    name = clean(name);
    email = clean(email);
    password = clean(password);

    // ❌ validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters"
      });
    }

    // 🔍 check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    // 🔒 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 🎫 token
    const token = generateToken(user._id);

    // 🍪 set cookie
    res.cookie("token", token, cookieOptions);

    // 🔐 safe response
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      error: "Signup failed"
    });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🧹 sanitize
    email = clean(email);
    password = clean(password);

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    // 🔍 find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    // 🎫 token
    const token = generateToken(user._id);

    // 🍪 set cookie
    res.cookie("token", token, cookieOptions);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      error: "Login failed"
    });
  }
};


// ================= LOGOUT (NEW 🔥) =================
export const logout = (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);

    res.json({
      message: "Logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: "Logout failed"
    });
  }
};