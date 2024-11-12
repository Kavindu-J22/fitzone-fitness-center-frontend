import React, { useState } from 'react';
import axios from 'axios';

const QueryForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/queries', { name, email, query });
      alert('Query submitted');
    } catch (err) {
      setError('Failed to submit query');
    }
  };

  return (
    <div className="query-form">
      <h2>Submit a Query</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Query</button>
      </form>
    </div>
  );
};

export default QueryForm;
