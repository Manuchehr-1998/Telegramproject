import { useEffect, useState, useRef } from "react";
import { MessageInput } from "./MessageInput";

export function MessageList({ contact, user }) {
  const [currentMessages, setCurrentMessages] = useState([]);
  // const [filteredMessages, setFilteredMessages] = useState([]);
  const messageContainerRef = useRef(null);
  useEffect(() => {
    getMessage();
  }, [contact]);

  const getMessage = async () => {
    if (!contact) return;
    try {
      const res = await fetch(`http://localhost:3001/messages/${contact.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentMessages(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const saveMessage = async (newMessage) => {
    if (!newMessage || !newMessage.receiverId || !newMessage.senderId) {
      console.error("Invalid message:", newMessage);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/messages-create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
      const data = await res.json();
      console.log("Server response:", data);

      // Проверяем, что сообщение было успешно сохранено
      if (data && data.message === "Сообщение успешно создано") {
        getMessage();
      } else {
        console.error("Failed to save message:", data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleSendMessage = async (newMessage) => {
    if (!contact) return;
    if (
      newMessage &&
      newMessage.receiverId === contact.id &&
      newMessage.senderId === user.id
    ) {
      scrollToBottom();
      await saveMessage(newMessage);
      getMessage(); // вызываем getMessage() после сохранения нового сообщения
    }
  };

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // if (!contact) return;
    // setFilteredMessages(
    //   currentMessages.filter(
    //     (message) =>
    //       (message.receiverId === contact.id && message.senderId === user.id) ||
    //       (message.receiverId === user.id && message.senderId === contact.id)
    //   )
    // );
    setTimeout(() => {
      scrollToBottom(); // Прокрутка к последнему сообщению при обновлении списка
    }, 0); // Прокрутка к последнему сообщению при обновлении списка
  }, [contact, currentMessages]);
  // console.log(currentMessages);

  return (
    <div>
      <div
        ref={messageContainerRef} // привязываем ref к div
        className="bg-[#E6E9EF] h-[80vh] px-4 pt-2 scrolling-touch overflow-auto"
      >
        {currentMessages.map((message) => {
          return message && message.text ? (
            <div
              key={message.id}
              className={`${
                message.senderId === user.id ? "self-end text-right" : ""
              }`}
            >
              <div className="border-solid border-2 border-white inline-block p-2 m-2 rounded-xl">
                <p className="text-black">
                  {message.text} {message.date}
                </p>
              </div>
            </div>
          ) : null;
        })}
      </div>
      <MessageInput
        onSendMessage={handleSendMessage}
        contact={contact}
        user={user}
      />
    </div>
  );
}
