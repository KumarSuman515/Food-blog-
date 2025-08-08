
import MealDetailClient from "@/app/component/meals/meal-detail-client";

export default function MealDetailPage({ params }) {
  return <MealDetailClient slug={params.mealSlug} />;
}
