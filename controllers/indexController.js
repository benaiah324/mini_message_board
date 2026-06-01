const crypto = require("crypto");
const getAllMessages = require("../models/messageModel.js").getAllMessages;
const createMessage = require("../models/messageModel.js").createMessage;
const deleteMessage = require("../models/messageModel.js").deleteMessage;
const getMessageById = require("../models/messageModel.js").getMessageById;

module.exports = {
  get: async (req, res) => {
    const messages = await getAllMessages();
    // console.log(messages);
    res.render("index", { title: "Mini messageboard", messages: messages });
  },
  post: async (req, res) => {
    const message = req.body.message;
    const author = req.body.author;
    await createMessage(req.body.message, req.body.author);
    console.log("New message added");
    res.redirect("/api");
  },
  delete: async (req, res) => {
    await deleteMessage(req.params.id);
    console.log(`Message for ${req.params.id} has been deleted`);
    res.redirect("/api");
  },
  getMessageDetail: async (req, res) => {
    const message = await getMessageById(req.params.id);
    if (!message) {
      return res.status(404).render("404");
    }
    res.render("message_detail", {
      title: "Message Detail",
      message: message,
    });
  },
};
