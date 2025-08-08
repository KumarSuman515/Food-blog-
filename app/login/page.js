'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // 📌 Get stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      toast.error("No user found. Please sign up first.");
      return;
    }

    // 📌 Check if email/username & password match
    if (storedUser.username === email && storedUser.password === password) {
      // ✅ Set cookies for middleware
      Cookies.set('authToken', storedUser.token, { expires: 7 });
      Cookies.set('username', storedUser.username, { expires: 7 });

      // ✅ Also store login state
      localStorage.setItem("isloggIn", "true");

      toast.success('Login successful');
      router.push('/meals'); // Protected page
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <div className={styles.formContainer}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>
              Don&apos;t have an account?{' '}
              <a href="/signup" className={styles.footerLink}>Sign up</a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email / Username</label>
              <input
                id="email"
                type="text"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Forgot your password?{' '}
              <a href="/forgot-password" className={styles.footerLink}>Reset it</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
