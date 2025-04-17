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

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/events", eventsRoutes);
app.use("/registrations", registrationsRoutes);
app.use("/comments", commentsRoutes);
app.use("/ratings", ratingsRoutes);
app.use("/roles", rolesRoutes);
