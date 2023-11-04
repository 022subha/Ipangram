const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Department = require("../models/departments");

// register controller
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: hashedPassword,
      Role: role,
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const loginUser = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET, // Use your secret key
        { expiresIn: "15m" } // Set the token expiration time (e.g., 1 hour)
      );

      res.status(200).json({
        message: "Login successful",
        token: token, // Include the token in the response
      });
    } else {
      // Passwords do not match, authentication failed
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { registerUser, loginUser };
