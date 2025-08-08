import ShareMealForm from "@/app/component/meals/share-meal-form";
import ProtectedRoute from "../../components/ProtectedRoute";
import classes from "./page.module.css";

export default function Share() {
  return (
    <ProtectedRoute routeName="Share Meal">
      <>
        <header className={classes.header}>
          <h1>
            Share your <span className={classes.highlight}>favorite meal</span>
          </h1>
          <p>Or any other meal you feel needs sharing!</p>
        </header>

        <main className={classes.main}>
          <ShareMealForm />
        </main>
      </>
    </ProtectedRoute>
  );
}
