import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import api from "../Api/axios";
import { useGeneral } from "../context/GeneralContext";
import "./chat.css";

const ChatBox = ({ clientId, freelancerId }) => {
  const { user } = useGeneral();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------- FETCH OLD MESSAGES ---------- */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(
          `/messages/${clientId}/${freelancerId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (clientId && freelancerId) {
      fetchMessages();
    }
  }, [clientId, freelancerId]);

  /* ---------- SOCKET SETUP ---------- */
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.emit("joinRoom", {
      clientId,
      freelancerId
    });

    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [clientId, freelancerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      clientId,
      freelancerId,
      senderId: user.id,
      message: text
    };

    socketRef.current.emit("sendMessage", messageData);
    setText("");
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
       {messages.map((m) => {
  const isMe = m.senderId._id === user.id;

  return (
    <div
      key={m._id}
      className={`message ${isMe ? "sent" : "received"}`}
    >
      <div className="sender-name">
        {m.senderId.name}
      </div>
      <div>{m.message}</div>
    </div>
  );
})}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
