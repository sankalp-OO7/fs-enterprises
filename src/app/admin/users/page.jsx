'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersList(){
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('/api/users').then(r=>r.json()).then(setUsers).catch(()=>setUsers([]));
  },[]);
  return (
    <div>
      <h2>Users</h2>
      <Link href="/admin/users/add">Add User</Link>
      <ul>
        {users.map(u => <li key={u.id}>{u.name} ({u.email}) - {u.role}</li>)}
      </ul>
    </div>
  );
}
