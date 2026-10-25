
import venues from "../data/venues";

export function buildEvent({
  event,
  selectedVenueId,
  meals,
  equipment,
}) {
  const attendees = Number(event.attendees) || 0;

  const selectedVenue = venues.find(
    (venue) => venue.id === selectedVenueId
  );

  const selectedMeals = meals
    .filter((meal) => meal.selected)
    .map((meal) => ({
      id: meal.id,
      name: meal.name,
      pricePerPerson: meal.pricePerPerson,
      quantity: attendees,
      subtotal: meal.pricePerPerson * attendees,
    }));

  const selectedEquipment = equipment
    .filter((item) => item.quantity > 0)
    .map((item) => ({
      id: item.id,
      name: item.name,
      pricePerItem: item.pricePerItem,
      quantity: item.quantity,
      subtotal: item.pricePerItem * item.quantity,
    }));

  const venueCost = selectedVenue?.price || 0;

  const cateringCost = selectedMeals.reduce(
    (total, meal) => total + meal.subtotal,
    0
  );

  const equipmentCost = selectedEquipment.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const totalCost =
    venueCost +
    cateringCost +
    equipmentCost;

  return {
    id: crypto.randomUUID(),

    name: event.name,
    date: event.date,
    attendees,
    type: event.type,

    venue: selectedVenue
      ? {
          id: selectedVenue.id,
          name: selectedVenue.name,
          capacity: selectedVenue.capacity,
          price: selectedVenue.price,
        }
      : null,

    catering: selectedMeals,

    equipment: selectedEquipment,

    costs: {
      venue: venueCost,
      catering: cateringCost,
      equipment: equipmentCost,
      total: totalCost,
    },

    createdAt: new Date().toISOString(),
  };
}
