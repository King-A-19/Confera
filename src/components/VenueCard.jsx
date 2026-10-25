import { useDispatch, useSelector } from "react-redux";

import { selectVenue } from "../store/venueSlice";

import "./VenueCard.css";

function VenueCard({ venue }) {
  const dispatch = useDispatch();

  const selectedVenueId = useSelector((state) => state.venue.selectedVenueId);

  const attendees = useSelector((state) => Number(state.event.attendees) || 0);

  const isSelected = selectedVenueId === venue.id;

  const exceedsCapacity = attendees > 0 && attendees > venue.capacity;

  const handleSelect = () => {
    if (exceedsCapacity) {
      return;
    }

    dispatch(selectVenue(venue.id));
  };

  return (
    <article
      className={`venue-card ${isSelected ? "venue-card--selected" : ""} ${
        exceedsCapacity ? "venue-card--capacity-warning" : ""
      }`}
    >
      <div className="venue-card__visual">
        <img
          src={venue.image}
          alt={`${venue.name} venue`}
          className="venue-card__image"
        />

        {isSelected && <span className="venue-card__selected">✓ Selected</span>}

        <span className="venue-card__category">{venue.category}</span>
      </div>

      <div className="venue-card__content">
        <div className="venue-card__heading">
          <div>
            <h3>{venue.name}</h3>

            <span>Up to {venue.capacity} attendees</span>
          </div>

          <strong>R{venue.price.toLocaleString("en-ZA")}</strong>
        </div>

        <p>{venue.description}</p>

        {exceedsCapacity && (
          <div className="venue-card__warning">
            <span>⚠️</span>

            <p>
              This venue accommodates up to <strong>{venue.capacity}</strong>{" "}
              attendees, but your event has <strong>{attendees}</strong>.
            </p>
          </div>
        )}

        <div className="venue-card__features">
          {venue.features.map((feature) => (
            <span key={feature}>✓ {feature}</span>
          ))}
        </div>

        <button
          type="button"
          aria-pressed={isSelected}
          className={`venue-card__button ${
            isSelected ? "venue-card__button--selected" : ""
          } ${exceedsCapacity ? "venue-card__button--disabled" : ""}`}
          onClick={handleSelect}
          disabled={exceedsCapacity}
        >
          {isSelected
            ? "Venue Selected"
            : exceedsCapacity
              ? "Capacity Exceeded"
              : "Select Venue"}
        </button>
      </div>
    </article>
  );
}

export default VenueCard;
