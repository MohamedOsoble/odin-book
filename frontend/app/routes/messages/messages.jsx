import { useEffect, useState } from "react";
import { socket } from "../../utils/utility";

export default function App() {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message && author) {
      socket.emit("send_message", { message, author });
      setMessage("");
    }
  };
  return (
    <div>
      <h1>Messaging page...</h1>
      <div style={{ padding: "2rem" }}>
        <h2>Chat App</h2>
        <input
          type="text"
          placeholder="Enter Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send Message</button>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.author}:</strong> {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
