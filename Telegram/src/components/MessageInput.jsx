import { useState } from "react";

export function MessageInput({ onSendMessage, contact, user }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contact) {
      console.error("Contact is not selected");
      return;
    }
    if (!message.trim()) {
      return;
    }
    const newMessage = {
      id: crypto.randomUUID(),
      senderId: user.id,
      receiverId: contact.id,
      text: message,
      date: new Date().toLocaleTimeString(), // добавляем текущую дату и время в формате ISO
    };
    console.log("Sending message:", newMessage);
    onSendMessage(newMessage);
    setMessage("");
  };

  return (
    <div className="h-4 pt-2">
      <form onSubmit={handleSendMessage}>
        <input
          placeholder="Enter message..."
          className="w-[100%] rounded-lg bg-gray-200 p-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
}
