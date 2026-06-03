const crypto = require("crypto");
const getAllMessages = require("../models/messageModel.js").getAllMessages;
const createMessage = require("../models/messageModel.js").createMessage;
const deleteMessage = require("../models/messageModel.js").deleteMessage;
const getMessageById = require("../models/messageModel.js").getMessageById;

const renderDatabaseError = (res, error) => {
  console.error("Database error:", error);
  return res.status(503).render("error", {
    title: "Database unavailable",
    message:
      "The database is currently unavailable. Please check your Render Postgres environment variables.",
  });
};

module.exports = {
  get: async (req, res) => {
    try {
      const messages = await getAllMessages();
      const sortedMessages = [...messages].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      const latestMessage = sortedMessages[0] || null;

      res.render("index", {
        title: "Portfolio Message Board",
        messages: sortedMessages,
        messageCount: sortedMessages.length,
        latestMessage,
      });
    } catch (error) {
      return renderDatabaseError(res, error);
    }
  },
  post: async (req, res) => {
    try {
      await createMessage(req.body.message, req.body.author);
      console.log("New message added");
      res.redirect("/api");
    } catch (error) {
      return renderDatabaseError(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await deleteMessage(req.params.id);
      console.log(`Message for ${req.params.id} has been deleted`);
      res.redirect("/api");
    } catch (error) {
      return renderDatabaseError(res, error);
    }
  },
  getMessageDetail: async (req, res) => {
    try {
      const message = await getMessageById(req.params.id);
      if (!message) {
        return res.status(404).render("404");
      }
      res.render("message_detail", {
        title: "Message Detail",
        message,
      });
    } catch (error) {
      return renderDatabaseError(res, error);
    }
  },
};
