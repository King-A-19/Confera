import { useDispatch, useSelector } from "react-redux";

import {
  toggleMealSelection,
} from "../store/mealsSlice";

import "./CateringSelection.css";

function CateringSelection() {
  const dispatch = useDispatch();

  const meals = useSelector(
    (state) => state.meals
  );

  const attendees = useSelector(
    (state) => Number(state.event.attendees) || 0
  );

  const selectedMeals = meals.filter(
    (meal) => meal.selected
  );

  const cateringTotal = selectedMeals.reduce(
    (total, meal) =>
      total + meal.pricePerPerson * attendees,
    0
  );

  return (
    <section className="catering-selection">
      <div className="catering-selection__header">
        <div>
          <span className="catering-selection__eyebrow">
            STEP 03
          </span>

          <h2>Plan your catering</h2>

          <p>
            Choose the meals and refreshments
            you'd like to provide for your guests.
          </p>
        </div>

        <div className="catering-selection__summary">
          <span>
            {attendees || 0} guests
          </span>

          <strong>
            R{cateringTotal.toLocaleString("en-ZA")}
          </strong>
        </div>
      </div>

      <div className="catering-selection__grid">
        {meals.map((meal) => {
          const mealTotal =
            meal.pricePerPerson * attendees;

          return (
            <button
              type="button"
              key={meal.id}
              className={`meal-card ${
                meal.selected
                  ? "meal-card--selected"
                  : ""
              }`}
              onClick={() =>
                dispatch(
                  toggleMealSelection(meal.id)
                )
              }
              aria-pressed={meal.selected}
            >
              <div className="meal-card__icon">
                {meal.id === "breakfast" && "☕"}
                {meal.id === "high-tea" && "🍰"}
                {meal.id === "lunch" && "🥗"}
                {meal.id === "dinner" && "🍽️"}
              </div>

              <div className="meal-card__content">
                <div className="meal-card__top">
                  <div>
                    <h3>{meal.name}</h3>

                    <span>
                      R
                      {meal.pricePerPerson.toLocaleString(
                        "en-ZA"
                      )}{" "}
                      / person
                    </span>
                  </div>

                  <span className="meal-card__check">
                    {meal.selected ? "✓" : ""}
                  </span>
                </div>

                <p>
                  {meal.description}
                </p>

                {meal.selected && (
                  <div className="meal-card__total">
                    <span>
                      Estimated cost
                    </span>

                    <strong>
                      R
                      {mealTotal.toLocaleString(
                        "en-ZA"
                      )}
                    </strong>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CateringSelection;