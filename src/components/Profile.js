import React, { useEffect, useContext } from 'react';
import contextProvider from '../context/contextProvider';

function Profile() {
  const { setTitle } = useContext(contextProvider);
  useEffect(() => { setTitle('Profile'); }, []);
  return (
    <div>Profile</div>
  );
}

export default Profile;
