import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_CONVERSATIONS, GET_USERS } from "../services/queries";
import { START_CONVERSATION } from "../services/mutations";
import Messages from "./Messages";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkTokenExpiration } from "../utils/auth";
import "../styles/Conversations.css";

const Conversations: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    checkTokenExpiration(navigate);
  }, [navigate]);

  const {
    loading: conversationsLoading,
    error: conversationsError,
    data: conversationsData,
    refetch,
  } = useQuery(GET_CONVERSATIONS, {
    variables: { username },
  });

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS);

  const [startConversation, { loading: startingConversation }] =
    useMutation(START_CONVERSATION);

  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (conversationsLoading || usersLoading) return <div>Loading...</div>;
  if (conversationsError) return <div>Error fetching conversations</div>;
  if (usersError) return <div>Error fetching users</div>;

  const existingConversationUsernames = conversationsData.getConversations
    .flatMap((conversation: any) =>
      conversation.users.map((user: any) => user.username)
    )
    .filter((name: string) => name !== username);

  const filteredUsers = usersData.users
    .filter((user: any) => user.username !== username) // Exclude the current user
    .filter(
      (user: any) => !existingConversationUsernames.includes(user.username)
    ) // Exclude users in existing conversations
    .filter((user: any) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleStartConversation = async (username2: string) => {
    try {
      await startConversation({
        variables: { username1: username, username2 },
      });
      refetch(); // Refetch conversations after starting a new one
      setError(null);
      setDropdownOpen(false); // Close the dropdown after starting a conversation
    } catch (err: any) {
      if (err.message === "Conversation already exists") {
        setError("Conversation already exists");
      } else {
        console.error(err);
      }
    }
  };

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    setError(null); // Clear any existing error message
  };

  return (
    <div className="container mt-5">
      <h1>Start a new conversation</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="row">
        <div className="col-4">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Select a user to start a conversation
            </button>
            <div
              className={`dropdown-menu scrollable-dropdown ${
                dropdownOpen ? "show" : ""
              }`}
              aria-labelledby="dropdownMenuButton"
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <button
                    key={user.id}
                    className={`dropdown-item ${
                      startingConversation ? "disabled" : ""
                    }`}
                    onClick={() =>
                      !startingConversation &&
                      handleStartConversation(user.username)
                    }
                    style={{
                      cursor: startingConversation ? "not-allowed" : "pointer",
                    }}
                  >
                    {user.username}
                  </button>
                ))
              ) : (
                <div className="dropdown-item">
                  No users available for a new conversation
                </div>
              )}
            </div>
          </div>
          <h3 className="mt-5">Your Conversations</h3>
          <ul className="list-group">
            {conversationsData.getConversations.map((conversation: any) => (
              <li
                key={conversation.id}
                className={`list-group-item list-group-item-action ${
                  selectedConversation &&
                  selectedConversation.id === conversation.id
                    ? "active"
                    : ""
                }`}
                onClick={() => handleSelectConversation(conversation)}
              >
                {conversation.users
                  .filter((user: any) => user.username !== username)
                  .map((user: any) => user.username)
                  .join(", ")}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-8">
          {selectedConversation ? (
            <Messages conversation={selectedConversation} />
          ) : (
            <p>
              Start a new conversation or select a conversation to view messages
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
