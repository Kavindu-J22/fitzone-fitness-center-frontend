import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Classes = () => {
  const { data, error, loading } = useFetch('/api/classes');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes: {error.message}</div>;

  return (
    <div>
      <h1>Available Classes</h1>
      <div>
        {data.map((fitnessClass) => (
          <div key={fitnessClass.id}>
            <h3>{fitnessClass.name}</h3>
            <p>{fitnessClass.description}</p>
            <Link to={`/classes/${fitnessClass.id}`}>Book Class</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
