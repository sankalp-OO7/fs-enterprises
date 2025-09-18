'use client';
import { useEffect, useState } from 'react';

export default function ProfilePage(){
  const [user, setUser] = useState(null);
//   useEffect(()=>{
//     // fetch current user's info
//     fetch('/api/users/me').then(r => {
//       if (!r.ok) return null;
//       return r.json();
//     }).then(data => setUser(data));
//   },[]);
//   if (!user) return <div>Loading profile...</div>;
  return (
    <main style={{padding:20}}>
      <h1 style={{color:'black'}}>Profile</h1>
      <p style={{color:'black'}}>Name: {user?.name}</p>
      <p style={{color:'black'}}>Email: {user?.email}</p>
      <p style={{color:'black'}}>Role: {user?.role}</p>
    </main>
  );
}
