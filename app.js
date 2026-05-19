const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");
const path = require("node:path");

const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
