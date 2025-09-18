'use client';
import { useState } from 'react';

export default function ChangePassword(){
  const [oldPass,setOldPass] = useState('');
  const [newPass,setNewPass] = useState('');
  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/change-password', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass })
    });
    if (res.ok) alert('Password changed');
    else alert('Error changing password');
  }
  return (
    <main style={{padding:20}}>
      <h1>Change Password</h1>
      <form onSubmit={submit}>
        <input placeholder="Old password" value={oldPass} onChange={e=>setOldPass(e.target.value)} type="password" />
        <input placeholder="New password" value={newPass} onChange={e=>setNewPass(e.target.value)} type="password" />
        <button type="submit">Change</button>
      </form>
    </main>
  );
}
