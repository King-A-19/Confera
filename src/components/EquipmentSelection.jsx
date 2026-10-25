
"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  incrementAvQuantity,
  decrementAvQuantity,
} from "../store/avSlice";

import "./EquipmentSelection.css";

const equipmentIcons = {
  Presentation: "📽️",
  Audio: "🎤",
  Workshop: "📝",
  Branding: "🏷️",
};

export default function EquipmentSelection() {
  const dispatch = useDispatch();

  const equipment = useSelector((state) => state.av);

  const totalEquipmentCost = equipment.reduce(
    (total, item) => total + item.pricePerItem * item.quantity,
    0
  );

  const selectedEquipment = equipment.filter(
    (item) => item.quantity > 0
  );

  return (
    <section className="equipment-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">
            STEP 04 / Event equipment
          </span>

          <h2>Bring your event to life</h2>

          <p>
            Add the presentation, audio and workshop equipment
            your event needs.
          </p>
        </div>

        <div className="equipment-summary">
          <span>Equipment total</span>
          <strong>
            R {totalEquipmentCost.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="equipment-grid">
        {equipment.map((item) => {
          const isSelected = item.quantity > 0;

          return (
            <article
              key={item.id}
              className={`equipment-card ${
                isSelected ? "equipment-card-selected" : ""
              }`}
            >
              <div className="equipment-card-top">
                <div className="equipment-icon">
                  {equipmentIcons[item.category] || "⚙️"}
                </div>

                <span className="equipment-category">
                  {item.category}
                </span>
              </div>

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <div className="equipment-price">
                <strong>
                  R {item.pricePerItem.toLocaleString()}
                </strong>

                <span>per item</span>
              </div>

              <div className="equipment-controls">
                <button
                  type="button"
                  onClick={() =>
                    dispatch(decrementAvQuantity(item.id))
                  }
                  disabled={item.quantity === 0}
                  aria-label={`Remove one ${item.name}`}
                >
                  −
                </button>

                <span aria-live="polite">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    dispatch(incrementAvQuantity(item.id))
                  }
                  aria-label={`Add one ${item.name}`}
                >
                  +
                </button>
              </div>

              {isSelected && (
                <div className="equipment-selected-label">
                  ✓ Added to event
                </div>
              )}
            </article>
          );
        })}
      </div>

      {selectedEquipment.length > 0 && (
        <div className="equipment-breakdown">
          <h3>Equipment breakdown</h3>

          {selectedEquipment.map((item) => (
            <div
              key={item.id}
              className="equipment-breakdown-row"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                R{" "}
                {(item.pricePerItem * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
