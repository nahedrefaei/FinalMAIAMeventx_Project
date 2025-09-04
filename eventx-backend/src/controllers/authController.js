import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role }, // include role
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// @desc   Register new user
// @route  POST /api/v1/auth/register
export const register = async (req, res) => {
  try {
    // 1. Destructure all fields from the request body, including the new ones.
    const { 
      name, 
      email, 
      password, 
      role, 
      birthDate, 
      gender, 
      location, 
      interests 
    } = req.body;

    // Default role = "user" if none provided
    const userRole = role && ["user", "admin"].includes(role) ? role : "user";

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // 2. Include the new fields when creating the user document.
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: userRole,
      birthDate,
      gender,
      location,
      interests
    });

    // 3. Respond with the created user data and a token.
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user),
    });
  } catch (error) {
    // Provide a more detailed error message in case of validation failure
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration.", error: error.message });
  }
};

// Logout (dummy for JWT-based auth)

// @desc   Login user
// @route  POST /api/v1/auth/login
export const login = async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log('Login successful for user:', email);
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};
// --- Current Profile ---
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      birthDate: user.birthDate,
      gender: user.gender,
      location: user.location,
      interests: user.interests
    });
  } catch (err) {
    console.error('Me endpoint error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// --- Logout ---
// --- Logout ---
// controllers/authController.js
export const logout = async (req, res) => {
  try {
    // Clear the cookie with the JWT
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

