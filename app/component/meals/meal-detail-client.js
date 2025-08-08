"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ✅ Corrected path - no 'app/' prefix
import classes from "../../meals/[mealSlug]/page.module.css";

// ✅ Corrected path for lib file
import { getMeal } from "@/lib/meals";

export default function MealDetailClient({ slug }) {
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const foundMeal = await getMeal(slug);
        setMeal(foundMeal);
      } catch (error) {
        console.error("Error fetching meal:", error);
        setMeal(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeal();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <p>Loading meal...</p>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className={classes.error}>
        <h1>Meal not found</h1>
      </div>
    );
  }

  const isBase64 = meal.image && meal.image.startsWith("data:image");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          {isBase64 ? (
            <img
              src={meal.image}
              alt={meal.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : (
            <Image
              src={meal.image}
              alt={meal.title}
              fill
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          )}
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
