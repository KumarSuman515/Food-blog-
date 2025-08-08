'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import logoImage from "@/assets/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader() {
  const router = useRouter();
  const { isLoggedIn, logout, requireAuth } = useAuth();

  const handleProtectedRouteClick = (href, routeName) => {
    if (requireAuth(routeName)) {
      router.push(href);
    }
  };

  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <Image
          src={logoImage}
          alt="A plate with food on it"
          width={80}
          height={80}
        />
        <span>NextLevel Food</span>
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <button 
              onClick={() => handleProtectedRouteClick('/meals', 'Browse Meals')}
              className={classes.navLink}
            >
              Browse Meals
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleProtectedRouteClick('/community', 'Foodies Community')}
              className={classes.navLink}
            >
              Foodies Community
            </button>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/meals/share">Share Meal</Link>
              </li>
              <li>
                <button 
                  onClick={logout}
                  className={classes.logoutButton}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}