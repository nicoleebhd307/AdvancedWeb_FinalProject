const users = [
  { id: 1, email: 'admin@uel.edu.vn', password: 'admin123', role: 'admin' },
  { id: 2, email: 'student1@uel.edu.vn', password: 'student123', role: 'student' },
  { id: 3, email: 'student2@uel.edu.vn', password: 'student123', role: 'student' },
];

const UEL_DOMAIN = '@uel.edu.vn';

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.endsWith(UEL_DOMAIN)) {
    return res.status(400).json({ message: 'Invalid UEL email. Must end with @uel.edu.vn' });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Email not found in the system' });
  }

  if (!password || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  return res.status(200).json({
    token: 'mock-jwt-token',
    user: { id: user.id, email: user.email, role: user.role },
  });
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

  return res.status(200).json({
    token: 'mock-jwt-token-google',
    user: { id: user.id, email: user.email, role: user.role },
  });
};

module.exports = { login, googleLogin };
