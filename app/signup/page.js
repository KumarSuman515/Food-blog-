'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import styles from './page.module.css';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const generateToken = (username) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${username}-${timestamp}-${random}`);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!username || !password) {
        toast.error("All fields are required.");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
      }

      const token = generateToken(username);
      const userData = { username, password, token };

      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Signup successful! Please login with your credentials.");
      router.push("/login");
    } catch (error) {
      toast.error("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Background decoration */}
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
        
        {/* Signup Card */}
        <div className={styles.signupCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className={styles.title}>Join Our Community</h2>
            <p className={styles.subtitle}>Create your account to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Username</label>
              <div className={styles.inputContainer}>
                <svg className={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputContainer}>
                <svg className={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              <p className={styles.helpText}>Password must be at least 6 characters long</p>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.loadingSpinner}>
                  <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{" "}
              <a href="/login" className={styles.footerLink}>
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
