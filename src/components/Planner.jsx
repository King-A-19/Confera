import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { resetEvent, loadEvent } from "../store/eventSlice";
import { clearVenue, loadVenue } from "../store/venueSlice";
import { clearMeals, loadMeals } from "../store/mealsSlice";
import { resetEquipment, loadEquipment } from "../store/avSlice";
import { buildEvent } from "../utils/buildEvent";

import {
  setEventName,
  setEventDate,
  setAttendees,
  setEventType,
} from "../store/eventSlice";

import "./Planner.css";
import VenueSelection from "./VenueSelection";
import CateringSelection from "./CateringSelection";
import EquipmentSelection from "./EquipmentSelection";
import EventSummary from "./EventSummary";
import PlannerProgress from "./PlannerProgress";
import {
  createEvent,
  getEvent,
  updateEvent as updateEventApi,
} from "../services/api";
import venues from "../data/venues";

function Planner() {
  const [saveMessage, setSaveMessage] = useState({
    type: "",
    text: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  const saveInProgress = useRef(false);

  const dispatch = useDispatch();

  const event = useSelector((state) => state.event);

  const selectedVenueId = useSelector((state) => state.venue.selectedVenueId);

  const meals = useSelector((state) => state.meals);

  const equipment = useSelector((state) => state.av);

  const [searchParams] = useSearchParams();

  const editEventId = searchParams.get("edit");

  useEffect(() => {
    if (!editEventId) return;

    async function loadExistingEvent() {
      try {
        const data = await getEvent(editEventId);
        const savedEvent = data.event;

        if (!savedEvent) return;

        dispatch(
          loadEvent({
            id: savedEvent.id,
            name: savedEvent.name,
            date: savedEvent.date?.split("T")[0] || "",
            attendees: savedEvent.attendees,
            type: savedEvent.type,
          }),
        );

        // The database currently stores the venue name.
        // loadVenue expects the venue ID.
        const selectedVenue = venues.find(
          (venue) => venue.name === savedEvent.venue,
        );

        dispatch(loadVenue(selectedVenue?.id || null));

        dispatch(loadMeals(savedEvent.catering || []));

        dispatch(loadEquipment(savedEvent.equipment || []));
      } catch (error) {
        console.error("Failed to load event for editing:", error);
      }
    }

    loadExistingEvent();
  }, [editEventId, dispatch]);

  const handleReset = () => {
    dispatch(resetEvent());
    dispatch(clearVenue());
    dispatch(clearMeals());
    dispatch(resetEquipment());
  };

  const validateEventForm = () => {
    const errors = {};
    const attendees = Number(event.attendees);

    const selectedVenue = venues.find((venue) => venue.id === selectedVenueId);

    if (!event.name.trim()) {
      errors.name = "Please enter an event name.";
    }

    if (!event.date) {
      errors.date = "Please select an event date.";
    } else {
      const now = new Date();
      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      if (event.date < today) {
        errors.date = "The event date cannot be in the past.";
      }
    }

    if (!event.attendees || !Number.isInteger(attendees) || attendees < 1) {
      errors.attendees = "Enter a valid number of attendees.";
    }

    if (!event.type) {
      errors.type = "Please select an event type.";
    }

    if (!selectedVenue) {
      errors.venue = "Please select a venue.";
    } else if (
      Number.isInteger(attendees) &&
      attendees > selectedVenue.capacity
    ) {
      errors.attendees = `This venue can accommodate a maximum of ${selectedVenue.capacity} people.`;
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSaveEvent = async () => {
    // Block every additional call while saving.
    if (saveInProgress.current) {
      return;
    }

    // Set the guard synchronously before doing anything else.
    saveInProgress.current = true;
    setSaveMessage({ type: "", text: "" });

    try {
      if (!validateEventForm()) {
        setSaveMessage({
          type: "error",
          text: "Please fix the highlighted fields before saving.",
        });
        return;
      }

      setIsSaving(true);

      const savedEvent = buildEvent({
        event,
        selectedVenueId,
        meals,
        equipment,
      });

      const eventData = {
        name: savedEvent.name,
        date: savedEvent.date,
        attendees: savedEvent.attendees,
        type: savedEvent.type,
        venue: savedEvent.venue?.name || null,
        venueCost: savedEvent.costs.venue,
        cateringCost: savedEvent.costs.catering,
        equipmentCost: savedEvent.costs.equipment,
        totalCost: savedEvent.costs.total,
        catering: savedEvent.catering,
        equipment: savedEvent.equipment,
      };

      if (editEventId) {
        await updateEventApi(editEventId, eventData);

        setSaveMessage({
          type: "success",
          text: "Your event has been updated successfully!",
        });
      } else {
        await createEvent(eventData);

        // Clear the planner only after the API confirms success.
        handleReset();

        setValidationErrors({});

        setSaveMessage({
          type: "success",
          text: "Your event has been saved successfully! You can plan your next event.",
        });
      }
    } catch (error) {
      console.error("Failed to save event:", error);

      setSaveMessage({
        type: "error",
        text: error.message || "Unable to save your event. Please try again.",
      });
    } finally {
      saveInProgress.current = false;
      setIsSaving(false);
    }
  };

  return (
    <section className="planner" id="planner">
      <div className="planner__container">
        <div className="planner__header">
          <div>
            <span className="planner__eyebrow">EVENT PLANNER</span>

            <h2>Build your conference.</h2>

            <p>
              Tell us about your event first. You can customize the venue,
              catering and equipment afterwards.
            </p>
          </div>

          <div className="planner__progress">
            <span>STEP</span>
            <strong>01</strong>
            <small>of 04</small>
          </div>
        </div>

        <div className="planner__workspace">
          <div className="planner__main">
            <div className="planner-card">
              <div className="planner-card__header">
                <div>
                  <span className="planner-card__number">01</span>

                  <div>
                    <span className="planner-card__label">GET STARTED</span>

                    <h3>Tell us about your event</h3>
                  </div>
                </div>

                <span className="planner-card__icon">📅</span>
              </div>

              <div className="planner-form">
                <div className="planner-field planner-field--full">
                  <label htmlFor="event-name">Event name</label>

                  <input
                    aria-invalid={Boolean(validationErrors.name)}
                    id="event-name"
                    type="text"
                    placeholder="e.g. Johannesburg Tech Summit"
                    value={event.name}
                    onChange={(e) => dispatch(setEventName(e.target.value))}
                  />

                  {validationErrors.name && (
                    <small className="planner-field__error">
                      {validationErrors.name}
                    </small>
                  )}

                  <small>
                    Give your event a name so you can easily identify it later.
                  </small>
                </div>

                <div className="planner-field">
                  <label htmlFor="event-date">Event date</label>

                  <input
                    aria-invalid={Boolean(validationErrors.date)}
                    id="event-date"
                    type="date"
                    value={event.date}
                    onChange={(e) => dispatch(setEventDate(e.target.value))}
                  />

                  {validationErrors.date && (
                    <small className="planner-field__error">
                      {validationErrors.date}
                    </small>
                  )}
                </div>

                <div className="planner-field">
                  <label htmlFor="attendees">Number of attendees</label>

                  <input
                    aria-invalid={Boolean(validationErrors.attendees)}
                    id="attendees"
                    type="number"
                    min="1"
                    placeholder="e.g. 150"
                    value={event.attendees}
                    onChange={(e) => dispatch(setAttendees(e.target.value))}
                  />

                  {validationErrors.attendees && (
                    <small className="planner-field__error">
                      {validationErrors.attendees}
                    </small>
                  )}
                </div>

                <div className="planner-field planner-field--full">
                  <label htmlFor="event-type">Event type</label>

                  <select
                    aria-invalid={Boolean(validationErrors.type)}
                    id="event-type"
                    value={event.type}
                    onChange={(e) => dispatch(setEventType(e.target.value))}
                  >
                    <option value="">Select your event type</option>

                    <option value="conference">Conference</option>

                    <option value="summit">Business Summit</option>

                    <option value="workshop">Workshop</option>

                    <option value="seminar">Seminar</option>

                    <option value="networking">Networking Event</option>
                  </select>

                  {validationErrors.type && (
                    <small className="planner-field__error">
                      {validationErrors.type}
                    </small>
                  )}
                </div>
              </div>

              <div className="planner-card__footer">
                <span>You can change these details at any time.</span>

                <button type="button">Continue →</button>
              </div>
            </div>
          </div>

          <aside className="planner__sidebar">
            <div className="planner-summary">
              <div className="planner-summary__header">
                <span>YOUR EVENT</span>

                <span className="planner-summary__status">Draft</span>
              </div>

              <div className="planner-summary__event">
                <div className="event-preview__icon">📋</div>

                <h3>{event.name || "Your event"}</h3>

                <p>
                  {event.type
                    ? event.type.charAt(0).toUpperCase() + event.type.slice(1)
                    : "Event type not selected"}
                </p>

                <div className="event-preview__details">
                  <div>
                    <span>DATE</span>

                    <strong>{event.date || "Not set"}</strong>
                  </div>

                  <div>
                    <span>ATTENDEES</span>

                    <strong>{event.attendees || "0"}</strong>
                  </div>
                </div>
              </div>

              <div className="planner-summary__tips">
                <span>QUICK TIP</span>

                <p>
                  Start with your expected attendee count. It helps Confera
                  calculate catering and other costs accurately.
                </p>
              </div>
            </div>
          </aside>
        </div>
        <VenueSelection />

        {validationErrors.venue && (
          <p className="planner-field__error" role="alert">
            {validationErrors.venue}
          </p>
        )}

        <CateringSelection />
        <EquipmentSelection />
        <PlannerProgress />
        <div className="planner-actions">
          {saveMessage.text && (
            <div
              className={`planner-feedback planner-feedback--${saveMessage.type}`}
              role={saveMessage.type === "error" ? "alert" : "status"}
            >
              <span>{saveMessage.text}</span>

              <button
                type="button"
                className="planner-feedback__close"
                onClick={() => setSaveMessage({ type: "", text: "" })}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}

          <button
            type="button"
            className="save-event-button"
            onClick={handleSaveEvent}
            disabled={isSaving}
          >
            {isSaving
              ? "Saving..."
              : editEventId
                ? "Update Event"
                : "Save Event"}
          </button>

          <button
            type="button"
            className="reset-planner-button"
            onClick={handleReset}
          >
            Start over
          </button>
        </div>
        <EventSummary />
      </div>
    </section>
  );
}

export default Planner;
