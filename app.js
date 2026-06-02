const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");

const PORT = process.env.SERVER_PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Mini message board is running",
  });
});

// Routes
app.use("/api", indexRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
