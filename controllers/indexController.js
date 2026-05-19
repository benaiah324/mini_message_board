const messages = [
  {
    id: crypto.randomUUID(),
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleString(),
  },
  {
    id: crypto.randomUUID(),
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleString(),
  },
];

module.exports = {
  get: (req, res) => {
    res.render("index", { title: "Mini messageboard", messages: messages });
  },
  post: (req, res) => {
    const id = crypto.randomUUID();
    const message = req.body.message;
    const author = req.body.author;
    messages.push({
      id: id,
      text: message,
      user: author,
      added: new Date().toLocaleString(),
    });
    res.redirect("/");
  },
  delete: (req, res) => {
    const id = req.params.id;
    const messageIndex = messages.findIndex((msg) => msg.id === id);
    if (messageIndex !== -1) {
      messages.splice(messageIndex, 1);
    }
    res.redirect("/");
  },
  getMessageDetail: (req, res) => {
    const id = req.params.id;
    const message = messages.find((msg) => msg.id === id);
    if (!message) {
      return res.status(404).render("404");
    }
    res.render("message_detail", { message: message });
  },
};
