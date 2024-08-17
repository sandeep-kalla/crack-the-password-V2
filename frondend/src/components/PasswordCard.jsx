/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '../services/api.js';
import '../styles/card.css';

const PasswordCard = ({ saltedPassword, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.verifyPassword(email, password, saltedPassword);
      if (response.data.message === 'Successfully cracked the password!') {
        onSuccess();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error verifying password.',error.message);
    }
  };
  

  return (
    <div className="card">
      <h2>Crack the Password</h2>
      <div className="salted-password">{saltedPassword}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cracked password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crack</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PasswordCard;
