import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATIONS } from '../services/queries';
import Messages from './Messages';
import 'bootstrap/dist/css/bootstrap.min.css';

const Conversations: React.FC = () => {
  const username = localStorage.getItem('username');
  const { loading, error, data } = useQuery(GET_CONVERSATIONS, {
    variables: { username },
  });

  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching conversations</div>;

  return (
    <div className="container mt-5">
      <h1>Conversations</h1>
      <div className="row">
        <div className="col-4">
          <ul className="list-group">
            {data.getConversations.map((conversation: any) => (
              <li
                key={conversation.id}
                className={`list-group-item ${selectedConversation && selectedConversation.id === conversation.id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                {conversation.users
                  .filter((user: any) => user.username !== username)
                  .map((user: any) => user.username)
                  .join(', ')}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-8">
          {selectedConversation ? (
            <Messages conversation={selectedConversation} />
          ) : (
            <p>Select a conversation to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
