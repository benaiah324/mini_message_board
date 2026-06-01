const { Router } = require("express");
const messageRouter = Router();

messageRouter.get("/", (req, res) => {
  res.render("message_page");
});

module.exports = messageRouter;
