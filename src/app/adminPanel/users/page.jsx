'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <Link
          href="/adminPanel/users/add"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow hover:-translate-y-[1px] transition-transform hover:shadow-lg"
        >
          + Add User
        </Link>
      </div>

      {/* User list */}
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white/90 shadow-sm">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-700">
                {u.role}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
