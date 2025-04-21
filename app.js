const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/user");
const eventsRoutes = require("./routes/event");
const registrationsRoutes = require("./routes/registgration");
const commentsRoutes = require("./routes/comment");
const ratingsRoutes = require("./routes/rating");
const rolesRoutes = require("./routes/role");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/registrations", registrationsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
