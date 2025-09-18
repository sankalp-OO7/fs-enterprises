'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action: 'login', email, password })
    });
    if (res.ok) {
      router.push('/profile');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="page-wrap">
      <div className="page-accent" aria-hidden />
      <div className="login-card" role="main" aria-label="Login card">
        <h1 style={{color:'black'}}>Welcome back</h1>
        <p className="lead">Sign in to manage your profile and access your dashboard.</p>

        <form className="login-form" onSubmit={submit} aria-label="Login form">
          <label className="small" htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            placeholder="you@company.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            required
          />

          <label className="small" htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            required
          />

          <div className="form-row" style={{marginTop:8}}>
            <div className="small">
              <label style={{display:'flex',alignItems:'center',gap:8}}>
                <input type="checkbox" /> <span style={{fontSize:13}}>Remember me</span>
              </label>
            </div>
            <div>
              <Link href="/change-password" className="link-muted">Forgot password?</Link>
            </div>
          </div>

          <div style={{marginTop:12}}>
            <button type="submit" className="btn" aria-label="Login">Sign in</button>
          </div>

          <div className="or" style={{marginTop:12}}>
            <div className="line" />
            <span>or</span>
            <div className="line" />
          </div>

          <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:8}}>
            <Link href="/signup" className="link-muted">Create account</Link>
            <span className="small">·</span>
            <Link href="/" className="link-muted">Back to home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
