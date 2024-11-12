import React from 'react';

const MembershipCard = ({ plan }) => {
  return (
    <div className="membership-card">
      <h3>{plan.name}</h3>
      <p>{plan.description}</p>
      <p>${plan.price}/month</p>
      <button>Sign Up</button>
    </div>
  );
};

export default MembershipCard;
