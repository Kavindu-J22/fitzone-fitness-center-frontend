import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentListPage = () => {
  const [contents, setContents] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const username = localStorage.getItem('username');
  const [updatedContent, setUpdatedContent] = useState({
    category: '',
    name: '',
    description: '',
    image: '', // For storing the image URL
    username: username,
  });
  const [newImage, setNewImage] = useState(null); // For holding the new image to upload
  const [isCreatingContent, setIsCreatingContent] = useState(false); // To control the create content form visibility

  useEffect(() => {
    fetchContents();
  }, []);

  // Fetch contents from the server
  const fetchContents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contents/all');
      setContents(response.data);
    } catch (error) {
      alert('Error fetching contents: ' + error.message);
    }
  };

  // Handle deleting content
  const handleDelete = async (contentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/contents/delete/${contentId}`);
      alert('Content deleted successfully!');
      fetchContents(); // Refresh content list after deletion
    } catch (error) {
      alert('Error deleting content: ' + error.message);
    }
  };

  // Handle editing content
  const handleEdit = (content) => {
    setEditingContent(content._id);
    setUpdatedContent({
      category: content.category,
      name: content.name,
      description: content.description,
      image: content.image, // Set current image URL
    });
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'jmrpithq');
      formData.append('cloud_name', 'dgecq2e6l');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dgecq2e6l/image/upload', formData);
        setUpdatedContent({ ...updatedContent, image: response.data.secure_url }); // Set new image URL
      } catch (error) {
        alert('Error uploading image');
      }
    }
  };

  // Handle updating content
  const handleUpdate = async (contentId) => {
    try {
      await axios.put(`http://localhost:5000/api/contents/update/${contentId}`, updatedContent);
      alert('Content updated successfully!');
      setEditingContent(null); // Exit editing mode
      fetchContents(); // Refresh content list
    } catch (error) {
      alert('Error updating content: ' + error.message);
    }
  };

  // Handle creating new content
  const handleCreateContent = async () => {
    try {
      await axios.post('http://localhost:5000/api/contents/create', updatedContent);
      alert('Content created successfully!');
      setIsCreatingContent(false); // Close create form
      fetchContents(); // Refresh content list
    } catch (error) {
      alert('Error creating content: ' + error.message);
    }
  };

  return (
    <div>
      <h2>All Contents</h2>

      {/* Create Content Button */}
      <button onClick={() => setIsCreatingContent(true)} style={{ marginBottom: '20px' }}>
        Create New Content
      </button>

      {/* Create Content Form */}
      {isCreatingContent && (
        <div>
          <h3>Create New Content</h3>
          <div>
            <label>Category:</label>
            <select
              value={updatedContent.category}
              onChange={(e) => setUpdatedContent({ ...updatedContent, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              <option value="Other">Other</option>
              <option value="Blog Post">Blog Post</option>
              <option value="Notice">Notice</option>
              <option value="Meal Plans">Meal Plans</option>
              <option value="Success Stories">Success Stories</option>
              <option value="Workout Routines">Workout Routines</option>
            </select>
          </div>
          
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={updatedContent.name}
              onChange={(e) => setUpdatedContent({ ...updatedContent, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={updatedContent.description}
              onChange={(e) => setUpdatedContent({ ...updatedContent, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageUpload} />
            {updatedContent.image && (
              <div>
                <img src={updatedContent.image} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />
              </div>
            )}
          </div>
          <button onClick={handleCreateContent}>Create Content</button>
          <button onClick={() => setIsCreatingContent(false)}>Cancel</button>
        </div>
      )}

      {/* Display Contents */}
      {contents.length > 0 ? (
        <ul>
          {contents.map((content) => (
            <li key={content._id}>
              {editingContent === content._id ? (
                <div>
                  {/* Content edit form */}
                  <div>
                    <label>Category:</label>
                    <input
                      type="text"
                      value={updatedContent.category}
                      onChange={(e) => setUpdatedContent({ ...updatedContent, category: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      value={updatedContent.name}
                      onChange={(e) => setUpdatedContent({ ...updatedContent, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      value={updatedContent.description}
                      onChange={(e) => setUpdatedContent({ ...updatedContent, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label>Image:</label>
                    <input type="file" onChange={handleImageUpload} />
                    {updatedContent.image && (
                      <div>
                        <img src={updatedContent.image} alt="Current" style={{ width: '100px', marginTop: '10px' }} />
                      </div>
                    )}
                  </div>
                  <button onClick={() => handleUpdate(content._id)}>Save</button>
                  <button onClick={() => setEditingContent(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {/* Display content */}
                  <h3>{content.category}</h3>
                  <h3>{content.name}</h3>
                  <p>{content.description}</p>
                  {content.image && <img src={content.image} alt={content.name} style={{ width: '100px' }} />}
                  <div>
                    <button onClick={() => handleEdit(content)}>Edit</button>
                    <button onClick={() => handleDelete(content._id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No contents available</p>
      )}
    </div>
  );
};

export default ContentListPage;
