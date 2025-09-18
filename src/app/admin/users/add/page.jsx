'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUser(){
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/users', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, email, password, role: 'user' }),
    });
    if (res.ok) {
      alert('Added');
      router.push('/admin/users');
    } else {
      const data = await res.json();
      alert(data.message || 'Error');
    }
  }
  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
