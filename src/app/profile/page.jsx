'use client';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user); // get user from Redux

  if (!user) {
    return (
      <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <p style={{ color: 'black', fontSize: '18px' }}>You are not logged in.</p>
        <Link
          href="/login"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            background: '#0070f3',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'background 0.2s ease',
          }}
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'black', fontSize: '28px', marginBottom: '15px' }}>Profile</h1>
      <p style={{ color: 'black', fontSize: '18px', margin: '5px 0' }}>Name: {user.name}</p>
      <p style={{ color: 'black', fontSize: '18px', margin: '5px 0' }}>Email: {user.email}</p>
      <p style={{ color: 'black', fontSize: '18px', margin: '5px 0' }}>Role: {user.role}</p>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          background: '#0070f3',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'background 0.2s ease',
        }}
      >
        Go to Home
      </Link>
    </main>
  );
}
