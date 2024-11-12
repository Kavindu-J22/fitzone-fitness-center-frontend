import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header>
        <h1>Welcome to FitZone Fitness Center</h1>
        <p>Your journey to fitness starts here. Join us today!</p>
        <Link to="/memberships">Explore Our Membership Plans</Link>
        <Link to="/classes">Browse Fitness Classes</Link>
      </header>

      <section>
        <h2>Our Services</h2>
        <ul>
          <li>Personal Training</li>
          <li>Group Fitness Classes</li>
          <li>Nutrition Guidance</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
