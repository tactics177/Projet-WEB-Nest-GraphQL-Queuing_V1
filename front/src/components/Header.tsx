import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="bg-white border border-dark d-flex justify-content-between align-items-center p-3 my-4 rounded">
      <div>
        <h1>Chat App EFREI</h1>
        {username && <h4>Welcome, {username}</h4>}
      </div>
      {username && (
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
