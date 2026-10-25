import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../services/api";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEvent(id);
        setEvent(data.event || null);
      } catch (error) {
        console.error("Failed to load event:", error);
        setEvent(null);
      }
    }

    loadEvent();
  }, [id]);

  if (!event) {
    return (
      <main className="event-details-page">
        <div className="event-not-found">
          <h1>Event not found</h1>

          <p>This event may have been deleted or no longer exists.</p>

          <button type="button" onClick={() => navigate("/my-events")}>
            Back to My Events
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="event-details-page">
      <button
        type="button"
        className="back-events-button"
        onClick={() => navigate("/my-events")}
      >
        ← Back to My Events
      </button>

      <header className="event-details-header">
        <div>
          <span className="event-details-type">{event.type || "Event"}</span>

          <h1>{event.name || "Untitled Event"}</h1>

          <p>Your complete event plan and estimated budget.</p>
        </div>

        <div className="event-details-attendees">
          <strong>{event.attendees}</strong>
          <span>Guests</span>
        </div>
      </header>

      <section className="event-overview">
        <div>
          <span>Date</span>
          <strong>{event.date || "Not selected"}</strong>
        </div>

        <div>
          <span>Venue</span>
          <strong>{event.venue || "No venue selected"} </strong>
        </div>

        <div>
          <span>Capacity</span>
          <strong>
            {event.venue?.capacity ? `${event.venue.capacity} guests` : "N/A"}
          </strong>
        </div>
      </section>

      <section className="event-details-grid">
        <div className="details-card">
          <div className="details-card-header">
            <h2>Venue</h2>
            <span>R{Number(event.venueCost || 0).toLocaleString()} </span>
          </div>

          {event.venue ? (
            <div className="details-item">
              <strong>{event.venue}</strong>

              <span>Venue selected for {event.attendees} guests</span>
            </div>
          ) : (
            <p className="empty-details">No venue selected.</p>
          )}
        </div>

        <div className="details-card">
          <div className="details-card-header">
            <h2>Catering</h2>

            <span>R{Number(event.cateringCost || 0).toLocaleString()} </span>
          </div>

          {event.catering?.length > 0 ? (
            <div className="details-list">
              {event.catering.map((meal) => (
                <div className="details-item" key={meal.id}>
                  <div>
                    <strong>{meal.name}</strong>

                    <span>
                      R{meal.pricePerPerson} × {meal.quantity} guests
                    </span>
                  </div>

                  <strong>R{meal.subtotal.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-details">No catering selected.</p>
          )}
        </div>

        <div className="details-card">
          <div className="details-card-header">
            <h2>Equipment</h2>

            <span>R{Number(event.equipmentCost || 0).toLocaleString()} </span>
          </div>

          {event.equipment?.length > 0 ? (
            <div className="details-list">
              {event.equipment.map((item) => (
                <div className="details-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>

                    <span>
                      R{item.pricePerItem} × {item.quantity}
                    </span>
                  </div>

                  <strong>R{item.subtotal.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-details">No equipment selected.</p>
          )}
        </div>

        <div className="total-details-card">
          <span>Estimated Event Cost</span>

          <strong>R{Number(event.totalCost || 0).toLocaleString()} </strong>

          <p>
            This estimate includes your selected venue, catering and equipment.
          </p>
        </div>
      </section>
    </main>
  );
}

export default EventDetails;
