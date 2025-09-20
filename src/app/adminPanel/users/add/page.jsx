'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, email, password, role: 'user' }),
    });
    if (res.ok) {
      alert('User added successfully ✅');
      router.push('/admin/users');
    } else {
      const data = await res.json();
      alert(data.message || 'Error');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white/90 p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add User</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e=>setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow hover:-translate-y-[1px] hover:shadow-lg transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
