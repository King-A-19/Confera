
import { useSelector } from "react-redux";

import "./PlannerProgress.css";

const steps = [
  {
    number: "01",
    label: "Event",
  },
  {
    number: "02",
    label: "Venue",
  },
  {
    number: "03",
    label: "Catering",
  },
  {
    number: "04",
    label: "Equipment",
  },
  {
    number: "05",
    label: "Summary",
  },
];

export default function PlannerProgress() {
  const event = useSelector((state) => state.event);
  const selectedVenueId = useSelector(
    (state) => state.venue.selectedVenueId
  );
  const meals = useSelector((state) => state.meals);
  const equipment = useSelector((state) => state.av);

  const hasEventDetails =
    event.name &&
    event.date &&
    event.attendees &&
    event.type;

  const hasVenue = Boolean(selectedVenueId);

  const hasCatering = meals.some(
    (meal) => meal.selected
  );

  const hasEquipment = equipment.some(
    (item) => item.quantity > 0
  );

  const completedSteps = [
    Boolean(hasEventDetails),
    hasVenue,
    hasCatering,
    hasEquipment,
    false,
  ];

  return (
    <div className="planner-progress">
      {steps.map((step, index) => {
        const completed = completedSteps[index];

        return (
          <div
            className={`progress-step ${
              completed ? "progress-step-complete" : ""
            }`}
            key={step.number}
          >
            <div className="progress-number">
              {completed ? "✓" : step.number}
            </div>

            <span>{step.label}</span>

            {index < steps.length - 1 && (
              <div
                className={`progress-line ${
                  completed ? "progress-line-complete" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

