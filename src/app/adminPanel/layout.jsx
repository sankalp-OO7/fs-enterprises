// src/app/admin/layout.jsx
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background,_#f9fafb)] text-[var(--foreground,#1f2937)]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-3">
          {/* Brand */}
          <h1 className="text-xl font-bold text-orange-500 tracking-tight">
            <Link href="/adminPanel">
            Admin Panel
            </Link>
          </h1>

          {/* Links */}
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium border-2 border-orange-500 rounded-md px-2"
            >
              Website
            </Link>
            <Link
              href="/adminPanel"
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/adminPanel/users"
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
            >
              Users
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
            >
              My Profile
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[var(--hardware-bg-gradient)]">
        <div className="bg-white/90 rounded-xl shadow-md border border-gray-200 p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}
