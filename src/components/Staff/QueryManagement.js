import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const [replies, setReplies] = useState({}); // State for replies, using an object to track replies by query ID

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Query/allQuery');
      setQueries(response.data);
    } catch (error) {
      alert('Error fetching queries: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Query/deleteQuery/${id}`);
      alert('Query deleted successfully!');
      setQueries(queries.filter((query) => query._id !== id));
    } catch (error) {
      alert('Error deleting query: ' + error.message);
    }
  };

  const handleReplyChange = (id, value) => {
    setReplies({ ...replies, [id]: value }); // Update reply for the specific query ID
  };

  const handleReply = async (id) => {
    try {
      const reply = replies[id]; // Get the reply for the specific query
      if (!reply) {
        alert('Please enter a reply before sending.');
        return;
      }

      await axios.put(`http://localhost:5000/api/Query/updateQuery/${id}`, {
        reply, // Send the reply text
        status: 'Resolved', // Set status to 'Resolved'
      });
      alert('Reply sent and status updated!');
      // Update the queries state to reflect the changes
      setQueries(
        queries.map((query) =>
          query._id === id ? { ...query, reply, status: 'Resolved' } : query
        )
      );
      setReplies({ ...replies, [id]: '' }); // Clear the reply input for the specific query
    } catch (error) {
      alert('Error updating query: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Submitted Queries</h2>
      {queries.map((query) => (
        <div key={query._id} className="query-card">
          <h3>{query.title}</h3>
          <p><strong>User:</strong> {query.userName}</p>
          <p><strong>About:</strong> {query.about}</p>
          <p><strong>Message:</strong> {query.message}</p>
          <p><strong>Status:</strong> {query.status}</p>

          {/* Reply input and button */}
          <input
            type="text"
            placeholder="Write a reply..."
            value={replies[query._id] || ''} // Use the reply for this specific query ID
            onChange={(e) => handleReplyChange(query._id, e.target.value)}
          />
          <button onClick={() => handleReply(query._id)}>Send Reply</button>

          <button onClick={() => handleDelete(query._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default QueryList;
