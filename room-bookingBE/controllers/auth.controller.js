const { users, students } = require('../data/mockData');

const UEL_DOMAIN = '@uel.edu.vn';

/** Strip passwordHash and attach student profile for the response. */
function buildLoginResponse(user) {
  const { passwordHash, ...safeUser } = user;
  const profile = students.find((s) => s.userId === user._id) || null;
  // Token encodes the _id so /api/users/me can decode it without a real JWT library
  const token = `mock-jwt-${user._id}`;
  return { token, user: safeUser, profile };
}

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.endsWith(UEL_DOMAIN)) {
    return res.status(400).json({ message: 'Invalid UEL email. Must end with @uel.edu.vn' });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Email not found in the system' });
  }

  if (!password || user.passwordHash !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  return res.status(200).json(buildLoginResponse(user));
};

const googleLogin = (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith(UEL_DOMAIN)) {
    return res.status(400).json({ message: 'Only @uel.edu.vn Google accounts are allowed' });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'This Google account is not registered in the system' });
  }

  return res.status(200).json(buildLoginResponse(user));
};
