"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/authSlice";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  async function submit(e) {
    e.preventDefault();
    console.log("Submitting login for", email);

    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      // login success
      console.log("Login successful");

      router.push("/");
    } else {
      // error available at result.payload or auth.error
      alert(result.payload || auth.error || "Login failed");
    }
  }

  return (
    <div className="page-wrap">
      <div className="page-accent" aria-hidden />
      <div className="login-card" role="main" aria-label="Login card">
        <h1 style={{ color: "black" }}>Welcome back</h1>
        <p className="lead">
          Sign in to manage your profile and access your dashboard.
        </p>

        <form className="login-form" onSubmit={submit} aria-label="Login form">
          <label className="small" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <label className="small" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

            <button
              type="submit"
              className="btn"
              aria-label="Login"
              disabled={auth.status === "loading"}
            >
              {auth.status === "loading" ? "Signing in..." : "Sign in"}
            </button>

          {auth.error && (
            <p style={{ color: "crimson", marginTop: 10 }}>{auth.error}</p>
          )}
          {/* ... rest of form */}
        </form>
      </div>
    </div>
  );
}
