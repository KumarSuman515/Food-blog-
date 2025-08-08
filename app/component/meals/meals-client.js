"use client";

import { useEffect, useState } from "react";
import MealsGrid from "./meals-grid";
import classes from "../../meals/page.module.css";
import Link from "next/link";

export default function MealsClient() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load meals immediately without delay
    const storedMeals = localStorage.getItem('meals');
    const mealsArray = storedMeals ? JSON.parse(storedMeals) : [];
    
    // Sort meals by ID in descending order (newest first)
    mealsArray.sort((a, b) => b.id - a.id);
    
    setMeals(mealsArray);
    setIsLoading(false);


  }, []);

  if (isLoading) {
    return (
      <>
        <header className={classes.header}>
          <h1>
            Delicious meals, created{" "}
            <span className={classes.highlight}>by you</span>
          </h1>
          <p>
            Choose your favorite recipe and cook it yourself. It is easy and fun!
          </p>
          <p className={classes.cta}>
            <Link href="/meals/share">Share your favorite recipe</Link>
          </p>
        </header>
        <main>
          <p className={classes.loading}>Loading meals...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
