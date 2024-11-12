import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const Profile = () => {
  const { data, error, loading } = useFetch('/api/user/profile');
  
  const [userInfo, setUserInfo] = useState(data);

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      {/* You can add more editable fields here */}
    </div>
  );
};

export default Profile;
