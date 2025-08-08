"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImagePicker from "./image-picker";
import classes from "../../meals/share/page.module.css";

export default function ShareMealForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result); // Store the base64 data URL
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      
      // Process the meal data
      const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
      };

      // Get existing meals and determine the next ID
      const storedMeals = localStorage.getItem('meals');
      const existingMeals = storedMeals ? JSON.parse(storedMeals) : [];
      const newId = existingMeals.length > 0 ? Math.max(...existingMeals.map(m => m.id)) + 1 : 1;

      // Use the selected image or a default image
      const imagePath = selectedImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop";

      // Create the meal object
      const newMeal = {
        id: newId,
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        image: imagePath,
        creator: meal.creator,
        creator_email: meal.creator_email,
        slug: meal.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      };

      // Save to localStorage
      existingMeals.push(newMeal);
      localStorage.setItem('meals', JSON.stringify(existingMeals));

      // Redirect to meals page
      router.push("/meals");
    } catch (error) {
      console.error("Error saving meal:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.row}>
        <div>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" required />
        </div>
      </div>

      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>

      <p>
        <label htmlFor="summary">Short Summary</label>
        <input type="text" id="summary" name="summary" required />
      </p>

      <p>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" rows="10" required />
      </p>

      <div>
        <label htmlFor="image">Meal Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleImageChange}
          required
        />
        {selectedImage && (
          <div style={{ marginTop: '10px' }}>
            <img 
              src={selectedImage} 
              alt="Preview" 
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      <p className={classes.action}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sharing..." : "Share Meal"}
        </button>
      </p>
    </form>
  );
}
