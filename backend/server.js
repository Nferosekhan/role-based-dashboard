const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const articleRoutes = require("./routes/articleRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});
app.get("/api/admin", authMiddleware, roleMiddleware("admin"),(req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);
app.use("/api/articles", articleRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/dashboard")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});