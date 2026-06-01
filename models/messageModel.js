const pool = require("../db/config");

const getAllMessages = async () => {
  try {
    const result = await pool.query("SELECT * FROM messages");
    return result.rows;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

const createMessage = async (message, author) => {
  try {
    await pool.query(
      "INSERT INTO messages (text, author, created_at) VALUES ($1, $2, NOW()) RETURNING *",
      [message, author],
    );
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

const deleteMessage = async (id) => {
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

const getMessageById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    throw error;
  }
};

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage,
  getMessageById,
};
