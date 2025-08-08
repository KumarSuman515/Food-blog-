
import MealsClient from "../component/meals/meals-client";
import ProtectedRoute from "../components/ProtectedRoute";

export default function MealPage() {
  return (
    <ProtectedRoute routeName="Browse Meals">
      <MealsClient />
    </ProtectedRoute>
  );
}
