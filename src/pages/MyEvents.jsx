
import "./MyEvents.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, deleteEvent } from "../services/api";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete confirmation modal state
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const data = await getEvents();
      setEvents(data.events || []);
    } catch (err) {
      console.error("Failed to load events:", err);
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleDelete(event) {
    setDeleteError("");
    setEventToDelete(event);
  }

  async function confirmDelete() {
    if (!eventToDelete || isDeleting) return;

    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteEvent(eventToDelete.id);

      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event.id !== eventToDelete.id
        )
      );

      setEventToDelete(null);
    } catch (err) {
      console.error("Failed to delete event:", err);
      setDeleteError(
        err.message || "Failed to delete event. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  function closeDeleteModal() {
    if (isDeleting) return;

    setEventToDelete(null);
    setDeleteError("");
  }

  if (loading) {
    return (
      <main className="my-events-page">
        <div className="my-events-container">
          <p>Loading your events...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="my-events-page">
      <div className="my-events-container">
        <div className="my-events-header">
          <div>
            <p className="section-label">CONFERA</p>
            <h1>My Events</h1>
            <p>
              Manage the events you have created with Confera.
            </p>
          </div>

          <Link to="/planner" className="primary-button">
            + Create Event
          </Link>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!error && events.length === 0 && (
          <div className="empty-events">
            <h2>No events yet</h2>
            <p>
              You haven't created any events yet. Start planning your
              first event with Confera.
            </p>

            <Link to="/planner" className="primary-button">
              Start Planning
            </Link>
          </div>
        )}

        {!error && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <article key={event.id} className="event-card">
                <div className="event-card-content">
                  <span className="event-type">
                    {event.type}
                  </span>

                  <h2>{event.name}</h2>

                  <div className="event-info">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>

                    <p>
                      <strong>Attendees:</strong>{" "}
                      {event.attendees}
                    </p>

                    {event.venue && (
                      <p>
                        <strong>Venue:</strong>{" "}
                        {event.venue}
                      </p>
                    )}

                    <p>
                      <strong>Total:</strong> R
                      {Number(event.totalCost).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="event-card-actions">
                  <Link
                    to={`/my-events/${event.id}`}
                    className="secondary-button"
                  >
                    View
                  </Link>

                  <Link
                    to={`/planner?edit=${event.id}`}
                    className="secondary-button"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => handleDelete(event)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {eventToDelete && (
        <div
          className="delete-modal-overlay"
          onClick={closeDeleteModal}
        >
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="delete-modal-icon" aria-hidden="true">
              !
            </div>

            <h2 id="delete-modal-title">
              Delete this event?
            </h2>

            <p id="delete-modal-description">
              You're about to delete{" "}
              <strong>{eventToDelete.name}</strong>. This action
              cannot be undone.
            </p>

            {deleteError && (
              <p className="delete-error" role="alert">
                {deleteError}
              </p>
            )}

            <div className="delete-modal-actions">
              <button
                type="button"
                className="cancel-delete-button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-button"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyEvents;
