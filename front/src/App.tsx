import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HealthCheck from './components/HealthCheck';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="my-4">My React App</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
