import React from 'react';
import MembershipCard from '../MembershipCard';

const Memberships = () => {
  return (
    <div>
      <h1>Our Membership Plans</h1>
      <div>
        <MembershipCard />
        <MembershipCard />
        <MembershipCard />
      </div>
    </div>
  );
};

export default Memberships;
