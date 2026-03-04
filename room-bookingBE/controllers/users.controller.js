const { users, students } = require('../data/mockData');

/**
 * GET /api/users/me
 * Reads the mock JWT from Authorization header (format: "Bearer mock-jwt-{_id}")
 * and returns the matching user + student profile.
 */
const getMe = (req, res) => {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token.' });
  }

  // Mock token convention: "mock-jwt-{userId}"
  const userId = token.replace('mock-jwt-', '');

  const user = users.find((u) => u._id === userId);
  if (!user) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  const { passwordHash, ...safeUser } = user;
  const profile = students.find((s) => s.userId === user._id) || null;

  return res.json({ user: safeUser, profile });
};

module.exports = { getMe };
