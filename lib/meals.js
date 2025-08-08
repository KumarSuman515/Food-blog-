import slugify from "slugify";
import xss from "xss";

// Initialize localStorage with default meals if empty
const initializeMeals = () => {
  if (typeof window === 'undefined') return; // Server-side check
  
  const existingMeals = localStorage.getItem('meals');
  if (!existingMeals) {
    const defaultMeals = [
      {
        id: 1,
        title: 'Juicy Cheese Burger',
        slug: 'juicy-cheese-burger',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop',
        summary: 'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
        instructions: `
          1. Prepare the patty:
             Mix 200g of ground beef with salt and pepper. Form into a patty.

          2. Cook the patty:
             Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

          3. Assemble the burger:
             Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

          4. Serve:
             Complete the assembly with the top bun and serve hot.
        `,
        creator: 'John Doe',
        creator_email: 'johndoe@example.com',
      },
      {
        id: 2,
        title: 'Spicy Curry',
        slug: 'spicy-curry',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop',
        summary: 'A rich and spicy curry, infused with exotic spices and creamy coconut milk.',
        instructions: `
          1. Chop vegetables:
             Cut your choice of vegetables into bite-sized pieces.

          2. Sauté vegetables:
             In a pan with oil, sauté the vegetables until they start to soften.

          3. Add curry paste:
             Stir in 2 tablespoons of curry paste and cook for another minute.

          4. Simmer with coconut milk:
             Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.

          5. Serve:
             Enjoy this creamy curry with rice or bread.
        `,
        creator: 'Max Schwarz',
        creator_email: 'max@example.com',
      },
      {
        id: 3,
        title: 'Homemade Dumplings',
        slug: 'homemade-dumplings',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
        summary: 'Tender dumplings filled with savory meat and vegetables, steamed to perfection.',
        instructions: `
          1. Prepare the filling:
             Mix minced meat, shredded vegetables, and spices.

          2. Fill the dumplings:
             Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.

          3. Steam the dumplings:
             Arrange dumplings in a steamer. Steam for about 10 minutes.

          4. Serve:
             Enjoy these dumplings hot, with a dipping sauce of your choice.
        `,
        creator: 'Emily Chen',
        creator_email: 'emilychen@example.com',
      },
      {
        id: 4,
        title: 'Classic Mac n Cheese',
        slug: 'classic-mac-n-cheese',
        image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=500&h=300&fit=crop',
        summary: "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
        instructions: `
          1. Cook the macaroni:
             Boil macaroni according to package instructions until al dente.

          2. Prepare cheese sauce:
             In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

          3. Combine:
             Mix the cheese sauce with the drained macaroni.

          4. Bake:
             Transfer to a baking dish, top with breadcrumbs, and bake until golden.

          5. Serve:
             Serve hot, garnished with parsley if desired.
        `,
        creator: 'Laura Smith',
        creator_email: 'laurasmith@example.com',
      },
      {
        id: 5,
        title: 'Authentic Pizza',
        slug: 'authentic-pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop',
        summary: 'Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.',
        instructions: `
          1. Prepare the dough:
             Knead pizza dough and let it rise until doubled in size.

          2. Shape and add toppings:
             Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

          3. Bake the pizza:
             Bake in a preheated oven at 220°C for about 15-20 minutes.

          4. Serve:
             Slice hot and enjoy with a sprinkle of basil leaves.
        `,
        creator: 'Mario Rossi',
        creator_email: 'mariorossi@example.com',
      },
      {
        id: 6,
        title: 'Wiener Schnitzel',
        slug: 'wiener-schnitzel',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop',
        summary: 'Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.',
        instructions: `
          1. Prepare the veal:
             Pound veal cutlets to an even thickness.

          2. Bread the veal:
             Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

          3. Fry the schnitzel:
             Heat oil in a pan and fry each schnitzel until golden brown on both sides.

          4. Serve:
             Serve hot with a slice of lemon and a side of potato salad or greens.
        `,
        creator: 'Franz Huber',
        creator_email: 'franzhuber@example.com',
      },
      {
        id: 7,
        title: 'Fresh Tomato Salad',
        slug: 'fresh-tomato-salad',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop',
        summary: 'A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.',
        instructions: `
          1. Prepare the tomatoes:
             Slice fresh tomatoes and arrange them on a plate.
        
          2. Add herbs and seasoning:
             Sprinkle chopped basil, salt, and pepper over the tomatoes.
        
          3. Dress the salad:
             Drizzle with olive oil and balsamic vinegar.
        
          4. Serve:
             Enjoy this simple, flavorful salad as a side dish or light meal.
        `,
        creator: 'Sophia Green',
        creator_email: 'sophiagreen@example.com',
      },
    ];
    localStorage.setItem('meals', JSON.stringify(defaultMeals));
  }
};

// Initialize meals on client side
if (typeof window !== 'undefined') {
  initializeMeals();
  
  // Clean up any old meals with problematic image paths
  const existingMeals = localStorage.getItem('meals');
  if (existingMeals) {
    const mealsArray = JSON.parse(existingMeals);
    const cleanedMeals = mealsArray.filter(meal => {
      // Remove meals with problematic image paths
      if (meal.image && meal.image.includes('/images/') && !meal.image.startsWith('data:image')) {
        console.log('Removing meal with problematic image path:', meal.title);
        return false;
      }
      return true;
    });
    
    if (cleanedMeals.length !== mealsArray.length) {
      localStorage.setItem('meals', JSON.stringify(cleanedMeals));
      console.log('Cleaned up old meals with problematic image paths');
    }
  }
}

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  if (typeof window === 'undefined') {
    // Server-side: return empty array or handle differently
    return [];
  }
  
  const meals = localStorage.getItem('meals');
  return meals ? JSON.parse(meals) : [];
}

export async function getMeal(slug) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  if (typeof window === 'undefined') {
    // Server-side: return null or handle differently
    return null;
  }
  
  const meals = localStorage.getItem('meals');
  const mealsArray = meals ? JSON.parse(meals) : [];
  return mealsArray.find(meal => meal.slug === slug) || null;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Convert image to base64 for client-side storage
  const arrayBuffer = await meal.image.arrayBuffer();
  const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  const mimeType = meal.image.type || 'image/jpeg';
  meal.image = `data:${mimeType};base64,${base64String}`;

  if (typeof window !== 'undefined') {
    const meals = localStorage.getItem('meals');
    const mealsArray = meals ? JSON.parse(meals) : [];
    
    // Generate new ID
    const newId = mealsArray.length > 0 ? Math.max(...mealsArray.map(m => m.id)) + 1 : 1;
    meal.id = newId;
    
    mealsArray.push(meal);
    localStorage.setItem('meals', JSON.stringify(mealsArray));
  }
}
