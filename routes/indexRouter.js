const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController.js");

indexRouter.get("/", indexController.get);
indexRouter.get("/new", (req, res) => {
  res.render("message_page");
});

indexRouter.get("/message/:id", indexController.getMessageDetail);
indexRouter.post("/delete/:id", indexController.delete);

indexRouter.post("/new", indexController.post);

module.exports = indexRouter;
