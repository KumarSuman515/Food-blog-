'use client';

import Link from "next/link"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from './hooks/useAuth';
import classes from "./page.module.css"
import ImageSlideshow from "./component/images/image-slideshow";

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push('/meals');
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <header className={classes.header}>
    <div className={classes.slideshow}>
   <ImageSlideshow />
    </div>

      <div>
      <div className={classes.hero}>
      
          <h1>NextLevel Food for NextLevel Foodies</h1>
          <p>Test & share food from all over the world.</p>
        </div>
        <div className={classes.cta}>
        <Link href="/community">Join the Community</Link>
        <Link href="/meals">Explore Meals</Link>
        </div>
      </div>
    </header>
    <main>
    <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
    </main>
    </>
  );
}
