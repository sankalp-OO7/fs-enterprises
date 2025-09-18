// src/app/admin/layout.jsx
// import { cookies } from 'next/headers';
// import { verifyToken } from '@/lib/auth';
import Link from 'next/link';

export default function AdminLayout({ children }) {
//   const cookie = cookies().get('token')?.value;
//   const user = cookie ? verifyToken(cookie) : null;
//   if (!user || user.role !== 'admin') {
//     // you can redirect to /login using NextResponse in a server segment,
//     // but inside layout component we can render a simple message or throw.
//     // Simpler: show unauthorized UI:
//     return <div style={{padding:20}}><h2>Unauthorized — admin only</h2><Link href="/login">Login</Link></div>;
//   }
  return (
    <div>
      <header className="p-3 border-b border-gray-300 bg-gray-50">
  <nav className="flex gap-4">
    <Link href="/admin" style={{color:'black'}}>Dashboard</Link>
    <Link href="/admin/users" style={{color:'black'}}>Users</Link>
    <Link href="/profile" style={{color:'black'}}>My Profile</Link>
  </nav>
</header>
<div className="p-5">{children}</div>
    </div>
  );
}
