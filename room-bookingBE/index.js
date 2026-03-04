const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const roomsRoutes = require('./routes/rooms.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();

// Cho phép gọi từ frontend Vercel
app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/users', usersRoutes);

// ⚠️ QUAN TRỌNG: dùng process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});