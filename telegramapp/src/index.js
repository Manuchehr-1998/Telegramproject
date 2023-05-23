const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const app = express();
const messagesStore = new LocalStorage("./data/messages");
const localStorage = new LocalStorage("./data/contacts");

app.use(bodyParser.json());
app.use(cors());
app.get("/contacts", (req, res) => {
  res.send(localStorage.getItem("contacts"));
});

app.post("/messages-create", async (req, res) => {
  const messages = messagesStore.getItem("messages");
  const messagesAdd = messages ? JSON.parse(messages) : [];
  messagesAdd.push(req.body);
  messagesStore.setItem("messages", JSON.stringify(messagesAdd));
  res.json({ message: "Сообщение успешно создано" });
});

app.get("/messages/:contactid", async (req, res) => {
  const messages = await JSON.parse(messagesStore.getItem("messages"));
  const { contactid } = req.params;
  const user = await JSON.parse(localStorage.getItem("user"));
  const currentMessages = await messages.filter(
    (message) =>
      (message.receiverId === contactid && message.senderId === user.id) ||
      (message.receiverId === user.id && message.senderId === contactid)
  );

  res.send(currentMessages);
});

app.get("/user", (req, res) => {
  const users = JSON.parse(localStorage.getItem("user")) || "[]";
  res.send(users);
});

app.post("/user", (req, res) => {
  const user = req.body;
  localStorage.setItem("user", JSON.stringify(user));
  res.json({ message: "Пользователь успешно создан" });
});
app.listen(3001, () => {
  console.log(`Сервер запущен на порту 3001`);
});
