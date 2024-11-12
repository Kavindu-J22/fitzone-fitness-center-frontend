import React from 'react';

const BlogCard = ({ blogPost }) => {
  return (
    <div className="blog-card">
      <h3>{blogPost.title}</h3>
      <p>{blogPost.excerpt}</p>
      <a href={`/blog/${blogPost.id}`}>Read More</a>
    </div>
  );
};

export default BlogCard;
