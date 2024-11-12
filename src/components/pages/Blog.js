import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Blog = () => {
  const { data, error, loading } = useFetch('/api/blogs');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs: {error.message}</div>;

  return (
    <div>
      <h1>Fitness Blog</h1>
      <div>
        {data.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
