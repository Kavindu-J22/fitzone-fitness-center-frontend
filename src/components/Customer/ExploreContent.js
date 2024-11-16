import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CategoryContentPage = () => {
  const location = useLocation();
  const { category } = location.state || {}; // Access the category from the navigation state
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetchCategoryContents();
    }
  }, [category]);

  // Function to fetch content by category from the server
  const fetchCategoryContents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/contents/category/${category}`);
      setContents(response.data);
      setLoading(false);
    } catch (error) {
      alert('Error fetching content: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Contents for Category: {category}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : contents.length > 0 ? (
        <ul>
          {contents.map((content) => (
            <li key={content._id}>
              <h3>{content.name}</h3>
              <p>{content.description}</p>
              {content.image && <img src={content.image} alt={content.name} style={{ width: '100px' }} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>No contents available for this category.</p>
      )}
    </div>
  );
};

export default CategoryContentPage;
