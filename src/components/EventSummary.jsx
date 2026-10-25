
"use client";

import { useSelector } from "react-redux";

import venues from "../data/venues";

import "./EventSummary.css";

export default function EventSummary() {
  const event = useSelector((state) => state.event);
  const selectedVenueId = useSelector(
    (state) => state.venue.selectedVenueId
  );
  const meals = useSelector((state) => state.meals);
  const equipment = useSelector((state) => state.av);

  const selectedVenue = venues.find(
    (venue) => venue.id === selectedVenueId
  );

  const attendees = Number(event.attendees) || 0;

  const venueCost = selectedVenue?.price || 0;

  const selectedMeals = meals.filter(
    (meal) => meal.selected
  );

  const cateringCost = selectedMeals.reduce(
    (total, meal) =>
      total + meal.pricePerPerson * attendees,
    0
  );

  const selectedEquipment = equipment.filter(
    (item) => item.quantity > 0
  );

  const equipmentCost = selectedEquipment.reduce(
    (total, item) =>
      total + item.pricePerItem * item.quantity,
    0
  );

  const totalCost =
    venueCost +
    cateringCost +
    equipmentCost;

  const hasPlanningData =
    event.name ||
    event.date ||
    attendees ||
    selectedVenue ||
    selectedMeals.length > 0 ||
    selectedEquipment.length > 0;

  return (
    <section className="event-summary">
      <div className="summary-header">
        <div>
          <span className="summary-eyebrow">
            STEP 05 / Event summary
          </span>

          <h2>Your event plan</h2>

          <p>
            Review your selections and estimated event
            cost before bringing everything together.
          </p>
        </div>

        <div className="summary-total">
          <span>Estimated total</span>

          <strong>
            R {totalCost.toLocaleString()}
          </strong>
        </div>
      </div>

      {!hasPlanningData ? (
        <div className="summary-empty">
          <div className="summary-empty-icon">📋</div>

          <h3>Your event plan is waiting</h3>

          <p>
            Start by adding your event details,
            choosing a venue and selecting your services.
          </p>
        </div>
      ) : (
        <div className="summary-content">

          {/* Event details */}

          <div className="summary-card">
            <div className="summary-card-header">
              <div>
                <span>Event</span>
                <h3>
                  {event.name || "Untitled event"}
                </h3>
              </div>

              {event.type && (
                <span className="summary-tag">
                  {event.type}
                </span>
              )}
            </div>

            <div className="event-meta">
              <div>
                <span>Date</span>
                <strong>
                  {event.date || "Not selected"}
                </strong>
              </div>

              <div>
                <span>Guests</span>
                <strong>
                  {attendees || "Not specified"}
                </strong>
              </div>
            </div>
          </div>

          {/* Venue */}

          <div className="summary-card">
            <div className="summary-section-title">
              <h3>Venue</h3>

              <strong>
                R {venueCost.toLocaleString()}
              </strong>
            </div>

            {selectedVenue ? (
              <div className="summary-item">
                <div>
                  <strong>
                    {selectedVenue.name}
                  </strong>

                  <span>
                    Capacity: {selectedVenue.capacity} guests
                  </span>
                </div>

                <span>
                  R {selectedVenue.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <p className="summary-muted">
                No venue selected yet.
              </p>
            )}
          </div>

          {/* Catering */}

          <div className="summary-card">
            <div className="summary-section-title">
              <h3>Catering</h3>

              <strong>
                R {cateringCost.toLocaleString()}
              </strong>
            </div>

            {selectedMeals.length > 0 ? (
              <div className="summary-list">
                {selectedMeals.map((meal) => {
                  const mealTotal =
                    meal.pricePerPerson * attendees;

                  return (
                    <div
                      className="summary-item"
                      key={meal.id}
                    >
                      <div>
                        <strong>
                          {meal.name}
                        </strong>

                        <span>
                          R{" "}
                          {meal.pricePerPerson.toLocaleString()}{" "}
                          × {attendees} guests
                        </span>
                      </div>

                      <span>
                        R {mealTotal.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="summary-muted">
                No catering selected yet.
              </p>
            )}
          </div>

          {/* Equipment */}

          <div className="summary-card">
            <div className="summary-section-title">
              <h3>Equipment</h3>

              <strong>
                R {equipmentCost.toLocaleString()}
              </strong>
            </div>

            {selectedEquipment.length > 0 ? (
              <div className="summary-list">
                {selectedEquipment.map((item) => {
                  const itemTotal =
                    item.pricePerItem *
                    item.quantity;

                  return (
                    <div
                      className="summary-item"
                      key={item.id}
                    >
                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          R{" "}
                          {item.pricePerItem.toLocaleString()}{" "}
                          × {item.quantity}
                        </span>
                      </div>

                      <span>
                        R {itemTotal.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="summary-muted">
                No equipment selected yet.
              </p>
            )}
          </div>

          {/* Final total */}

          <div className="summary-final">
            <div>
              <span>Total estimated cost</span>

              <p>
                Based on your current event selections
              </p>
            </div>

            <strong>
              R {totalCost.toLocaleString()}
            </strong>
          </div>
        </div>
      )}
    </section>
  );
}
