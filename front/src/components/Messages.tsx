import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MESSAGES } from '../services/queries';
import { CREATE_MESSAGE } from '../services/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';

const Messages: React.FC<{ conversation: any }> = ({ conversation }) => {
  const username = localStorage.getItem('username');
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId: conversation.id },
  });

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [messageContent, setMessageContent] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching messages</div>;

  const handleSendMessage = async () => {
    if (messageContent.trim() === '') return;

    await createMessage({
      variables: {
        content: messageContent,
        conversationId: conversation.id,
      },
    });

    setMessageContent('');
    refetch();
  };

  return (
    <div>
      <h3>Messages</h3>
      <ul className="list-group">
        {data.getMessages.map((message: any) => (
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
