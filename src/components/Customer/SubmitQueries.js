import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryForm = () => {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('username');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [about, setAbout] = useState(''); // Updated to include the "About" field
  const [queries, setQueries] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/Query/createQuery', { userId, userName, title, about, message });
      alert('Query submitted successfully!');
      setTitle('');
      setMessage('');
      setAbout(''); // Clear the "About" field
    } catch (error) {
      alert('Error submitting query: ' + error.message);
    }
  };

  // Function to fetch queries and filter based on userId
  const fetchQueries = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
      const response = await axios.get('http://localhost:5000/api/Query/allQuery');

      // Filter queries to only include those with the matching userId
      const filteredQueries = response.data.filter(query => query.userId === userId);

      setQueries(filteredQueries); // Set the filtered queries
    } catch (error) {
      alert('Error fetching queries: ' + error.message);
    }
  };

  useEffect(() => {
    fetchQueries(); // Fetch queries when the component mounts
  }, []);

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Submit Your Query</h2>

      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>About:</label>
      <select value={about} onChange={(e) => setAbout(e.target.value)} required>
        <option value="" disabled>Select an option</option>
        <option value="services">Services</option>
        <option value="trainers">Trainers</option>
        <option value="classes">Classes</option>
        <option value="events">Events</option>
        <option value="other">Other</option>
      </select>

      <label>Message:</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />

      <button type="submit">Submit</button>
    </form>


    <div>
      <h1>Your Queries</h1>
      {queries.length > 0 ? (
        <ul>
          {queries.map(query => (
            <li key={query._id}>
              <h3>{query.title}</h3>
              <h4>About: {query.about}</h4>
              <p>Message: {query.message}</p>
              <p>Status: {query.status}</p>
              {/* Conditionally display the reply if it exists */}
              {query.reply && <p>Reply: {query.reply}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No queries found.</p>
      )}
    </div>


    </div>
  );
};

export default QueryForm;
