import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import venues from "../data/venues";

import { clearVenue } from "../store/venueSlice";

import VenueCard from "./VenueCard";

import "./VenueSelection.css";

function VenueSelection() {
  const dispatch = useDispatch();

  const attendees = useSelector((state) => Number(state.event.attendees) || 0);

  const selectedVenueId = useSelector((state) => state.venue.selectedVenueId);

  useEffect(() => {
    if (!selectedVenueId || attendees === 0) {
      return;
    }

    const selectedVenue = venues.find((venue) => venue.id === selectedVenueId);

    if (selectedVenue && attendees > selectedVenue.capacity) {
      dispatch(clearVenue());
    }
  }, [attendees, selectedVenueId, dispatch]);

  return (
    <section className="venue-selection">
      <div className="venue-selection__header">
        <div>
          <span className="venue-selection__eyebrow">STEP 02</span>

          <h2>Choose your venue</h2>

          <p>
            Find a space that fits your event, audience and style.
            {attendees > 0 && (
              <>
                {" "}
                Showing options for <strong>{attendees} attendees</strong>.
              </>
            )}
          </p>
        </div>

        <span className="venue-selection__count">
          {venues.length} venues available
        </span>
      </div>

      <div className="venue-selection__grid">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
}

export default VenueSelection;
