'use client';

import Cookies from 'js-cookie';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        Cookies.set('auth_token', 'FAKE_TOKEN', { expires: 1 });
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--color-background)]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-primary)] items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[var(--color-primary-foreground)]/10 flex items-center justify-center">
            <span className="font-serif text-4xl text-[var(--color-primary-foreground)]">MC</span>
          </div>
          <h1 className="font-serif text-4xl text-[var(--color-primary-foreground)] mb-4">
            Dr. Maha Chaouch
          </h1>
          <p className="text-[var(--color-primary-foreground)]/70 leading-relaxed">
            Access your practice dashboard to manage appointments, 
            view patient information, and keep your schedule organized.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="font-serif text-2xl text-[var(--color-text-primary)]">
              Dr. Maha Chaouch
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">Practice Dashboard</p>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-3xl text-[var(--color-text-primary)] mb-2">
              Welcome back
            </h2>
            <p className="text-[var(--color-text-muted)]">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                <Mail className="w-4 h-4 text-[var(--color-text-muted)]" />
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-2">
                <Lock className="w-4 h-4 text-[var(--color-text-muted)]" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 text-[var(--color-error)] text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-3 px-8 py-4 text-base font-medium tracking-wide bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-text-primary)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-[var(--color-primary-foreground)] border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
