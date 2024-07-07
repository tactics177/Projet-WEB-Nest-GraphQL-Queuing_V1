import React from 'react';

const Messages: React.FC<{ conversation: any }> = ({ conversation }) => {
  return (
    <div>
      <h2>Messages</h2>
      <ul className="list-group">
        {conversation.messages.map((message: any) => (
          <li key={message.id} className="list-group-item">
            <strong>{message.user.username}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
