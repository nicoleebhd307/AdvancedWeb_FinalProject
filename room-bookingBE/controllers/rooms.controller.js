const { rooms } = require('../data/mockData');

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns true if the requested slot does NOT overlap any existing booking on that date.
 * Overlap rule: newStart < existingEnd AND newEnd > existingStart
 */
function isRoomAvailable(room, date, startTime, endTime) {
  return !room.bookings.some(
    (b) =>
      b.date === date &&
      startTime < b.endTime &&
      endTime > b.startTime
  );
}

// ─── Controllers ─────────────────────────────────────────────────────────────

const getRooms = (req, res) => {
  const { building, floor, capacityMin, search, date, startTime, endTime } = req.query;

  let result = rooms.map((r) => {
    let status = 'AVAILABLE';
    if (date && startTime && endTime) {
      status = isRoomAvailable(r, date, startTime, endTime) ? 'AVAILABLE' : 'BOOKED';
    }
    const { bookings, ...rest } = r;
    return { ...rest, status };
  });

  if (building) {
    result = result.filter((r) => r.building === building);
  }

  if (floor) {
    const floorNum = parseInt(floor, 10);
    if (!isNaN(floorNum)) result = result.filter((r) => r.floor === floorNum);
  }

  if (capacityMin) {
    const minCap = parseInt(capacityMin, 10);
    if (!isNaN(minCap)) result = result.filter((r) => r.capacity >= minCap);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter((r) => r.name.toLowerCase().includes(q));
  }

  res.json(result);
};

const bookRoom = (req, res) => {
  const { roomId, date, startTime, endTime } = req.body;

  if (!roomId || !date || !startTime || !endTime) {
    return res.status(400).json({ message: 'roomId, date, startTime and endTime are required.' });
  }

  const room = rooms.find((r) => r.id === roomId);
  if (!room) {
    return res.status(404).json({ message: 'Room not found.' });
  }

  if (!isRoomAvailable(room, date, startTime, endTime)) {
    return res.status(400).json({ message: 'Room is not available for the requested time slot.' });
  }

  room.bookings.push({ date, startTime, endTime });
  res.status(201).json({ message: 'Booking confirmed.', booking: { roomId, date, startTime, endTime } });
};

module.exports = { getRooms, bookRoom };
