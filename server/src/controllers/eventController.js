import prisma from "../config/prisma.js";

export async function createEvent(req, res) {
  try {
    const {
      name,
      date,
      attendees,
      type,
      venue,
      venueCost,
      cateringCost,
      equipmentCost,
      totalCost,
      catering,
      equipment,
    } = req.body;

    if (!name || !date || !attendees || !type) {
      return res.status(400).json({
        success: false,
        message: "Name, date, attendees and type are required",
      });
    }

    const event = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        attendees: Number(attendees),
        type,
        venue: venue || null,
        venueCost: Number(venueCost) || 0,
        cateringCost: Number(cateringCost) || 0,
        equipmentCost: Number(equipmentCost) || 0,
        totalCost: Number(totalCost) || 0,
        catering: catering || [],
        equipment: equipment || [],
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
}

export async function getEvents(req, res) {
  try {
    const events = await prisma.event.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        date: "asc",
      },
    });

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve events",
    });
  }
}

export async function getEventById(req, res) {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Get event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve event",
    });
  }
}

export async function updateEvent(req, res) {
  try {
    const existingEvent = await prisma.event.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const {
      name,
      date,
      attendees,
      type,
      venue,
      venueCost,
      cateringCost,
      equipmentCost,
      totalCost,
    } = req.body;

    const event = await prisma.event.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        date: date ? new Date(date) : existingEvent.date,
        attendees:
          attendees !== undefined ? Number(attendees) : existingEvent.attendees,
        type,
        venue: venue || null,
        venueCost: Number(venueCost) || 0,
        cateringCost: Number(cateringCost) || 0,
        equipmentCost: Number(equipmentCost) || 0,
        totalCost: Number(totalCost) || 0,
      },
    });

    res.json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
}

export async function deleteEvent(req, res) {
  try {
    const existingEvent = await prisma.event.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await prisma.event.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
}
