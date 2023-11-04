const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authenticateJWT = require("./middleware/middleware.js");
const authRoutes = require("./routes/authRoutes.js");
const hrRoutes = require("./routes/hrRoutes.js");
//const employeeRoutes = require("./routes/employeeRoutes.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3001", // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const port = 5000 || process.env.PORT;

const dbURI = process.env.MONGODB_URI_LOCAL;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome To Ipangram");
});

// Use the auth routes
app.use("/api/auth", authRoutes);

//use the hr routes
app.use("/api/hr", authenticateJWT, hrRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
