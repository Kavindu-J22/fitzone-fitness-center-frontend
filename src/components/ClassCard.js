import React from 'react';

const ClassCard = ({ classInfo }) => {
  return (
    <div className="class-card">
      <h3>{classInfo.name}</h3>
      <p>{classInfo.description}</p>
      <p>Trainer: {classInfo.trainer}</p>
      <button>Book Class</button>
    </div>
  );
};

export default ClassCard;
