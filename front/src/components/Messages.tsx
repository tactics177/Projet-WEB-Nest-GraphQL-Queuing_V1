import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../services/queries";
import { CREATE_MESSAGE } from "../services/mutations";
import socket from "../services/socket";
import "bootstrap/dist/css/bootstrap.min.css";

interface Message {
  id: string;
  content: string;
  conversationId: string;
  user: {
    username: string;
  };
}

const Messages: React.FC<{ conversation: any }> = ({ conversation }) => {
  const username = localStorage.getItem("username");
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { conversationId: conversation.id },
  });

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (data) {
      setMessages(data.getMessages);
    }
  }, [data]);

  useEffect(() => {
    socket.emit("joinRoom", conversation.id);

    const handleNewMessage = (message: Message) => {
      if (message.conversationId === conversation.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversation.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching messages</div>;

  const handleSendMessage = async () => {
    if (messageContent.trim() === "") return;

    await createMessage({
      variables: {
        content: messageContent,
        conversationId: conversation.id,
      },
    });

    setMessageContent("");
  };

  return (
    <div>
      <h3>Messages</h3>
      <ul className="list-group">
        {messages.map((message) => (
          <li key={message.id} className="list-group-item">
            <strong>{message.user.username}:</strong> {message.content}
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <textarea
          className="form-control"
          rows={3}
          placeholder="Type a message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
