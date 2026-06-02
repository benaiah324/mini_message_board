const pool = require("../db/config");

const normalizeMessage = (message) => {
  if (
    message &&
    Object.prototype.hasOwnProperty.call(message, "message") &&
    !Object.prototype.hasOwnProperty.call(message, "text")
  ) {
    return { ...message, text: message.message };
  }

  return message;
};

const getMessageColumnName = async () => {
  const result = await pool.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name = 'messages'",
  );

  const columns = new Set(result.rows.map((row) => row.column_name));

  if (columns.has("text")) return "text";
  if (columns.has("message")) return "message";

  return "text";
};

const getAllMessages = async () => {
  try {
    const result = await pool.query("SELECT * FROM messages");
    return result.rows.map(normalizeMessage);
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

const createMessage = async (message, author) => {
  try {
    const columnName = await getMessageColumnName();
    const query =
      columnName === "message"
        ? "INSERT INTO messages (message, author, created_at) VALUES ($1, $2, NOW()) RETURNING *"
        : "INSERT INTO messages (text, author, created_at) VALUES ($1, $2, NOW()) RETURNING *";

    await pool.query(query, [message, author]);
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
    return normalizeMessage(result.rows[0]);
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
