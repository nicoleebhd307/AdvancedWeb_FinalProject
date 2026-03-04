// ─── users (Auth layer) ───────────────────────────────────────────────────────
// Mirrors: { _id, email, passwordHash, role, isActive, createdAt, updatedAt }

const users = [
  {
    _id: 'usr-001',
    email: 'admin@uel.edu.vn',
    passwordHash: 'admin123',          // plain text for mock only
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    _id: 'usr-002',
    email: 'student1@uel.edu.vn',
    passwordHash: 'student123',
    role: 'student',
    isActive: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01'),
  },
  {
    _id: 'usr-003',
    email: 'student2@uel.edu.vn',
    passwordHash: 'student123',
    role: 'student',
    isActive: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01'),
  },
];

// ─── students (Profile layer) ─────────────────────────────────────────────────
// Mirrors: { _id, userId, studentCode, fullName, faculty, major, phone, quotaPerWeek, avatarUrl, createdAt }

const students = [
  {
    _id: 'stu-001',
    userId: 'usr-002',               // ref → users._id
    studentCode: '21520001',
    fullName: 'Nguyen Van An',
    faculty: 'Faculty of Information Technology',
    major: 'Computer Science',
    phone: '0901234567',
    quotaPerWeek: 3,
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    createdAt: new Date('2024-09-01'),
  },
  {
    _id: 'stu-002',
    userId: 'usr-003',
    studentCode: '21520002',
    fullName: 'Tran Thi Bao',
    faculty: 'Faculty of Economics',
    major: 'Business Administration',
    phone: '0912345678',
    quotaPerWeek: 3,
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date('2024-09-01'),
  },
];

// ─── rooms ────────────────────────────────────────────────────────────────────

const rooms = [
  {
    id: 'a-301', name: 'A.301', building: 'A', floor: 3, capacity: 20,
    equipment: ['WiFi', 'Projector', 'Whiteboard', 'AC'],
    image: 'https://picsum.photos/seed/a301/400/240',
    bookings: [
      { date: '2026-03-04', startTime: '09:00', endTime: '11:00' },
      { date: '2026-03-04', startTime: '14:00', endTime: '16:00' },
    ],
  },
  {
    id: 'a-302', name: 'A.302', building: 'A', floor: 3, capacity: 12,
    equipment: ['WiFi', 'Whiteboard'],
    image: 'https://picsum.photos/seed/a302/400/240',
    bookings: [
      { date: '2026-03-04', startTime: '13:00', endTime: '15:00' },
    ],
  },
  {
    id: 'a-401', name: 'A.401', building: 'A', floor: 4, capacity: 8,
    equipment: ['WiFi', 'AC'],
    image: 'https://picsum.photos/seed/a401/400/240',
    bookings: [],
  },
  {
    id: 'a-402', name: 'A.402', building: 'A', floor: 4, capacity: 30,
    equipment: ['WiFi', 'Projector', 'AC', 'Audio System'],
    image: 'https://picsum.photos/seed/a402/400/240',
    bookings: [
      { date: '2026-03-04', startTime: '10:00', endTime: '12:00' },
    ],
  },
  {
    id: 'a-501', name: 'A.501', building: 'A', floor: 5, capacity: 16,
    equipment: ['WiFi', 'Projector', 'Whiteboard'],
    image: 'https://picsum.photos/seed/a501/400/240',
    bookings: [
      { date: '2026-03-04', startTime: '09:00', endTime: '11:00' },
    ],
  },
  {
    id: 'b1-101', name: 'B1.101', building: 'B1', floor: 1, capacity: 10,
    equipment: ['WiFi', 'AC'],
    image: 'https://picsum.photos/seed/b1101/400/240',
    bookings: [
      { date: '2026-03-04', startTime: '09:00', endTime: '12:00' },
    ],
  },
  {
    id: 'b1-102', name: 'B1.102', building: 'B1', floor: 1, capacity: 6,
    equipment: ['WiFi', 'Whiteboard'],
    image: 'https://picsum.photos/seed/b1102/400/240',
    bookings: [],
  },
  {
    id: 'b1-201', name: 'B1.201', building: 'B1', floor: 2, capacity: 24,
    equipment: ['WiFi', 'Projector', 'AC', 'Audio System'],
    image: 'https://picsum.photos/seed/b1201/400/240',
    bookings: [
      { date: '2026-03-04', startTime: '15:00', endTime: '17:00' },
    ],
  },
  {
    id: 'b1-202', name: 'B1.202', building: 'B1', floor: 2, capacity: 4,
    equipment: ['WiFi'],
    image: 'https://picsum.photos/seed/b1202/400/240',
    bookings: [],
  },
  {
    id: 'b1-301', name: 'B1.301', building: 'B1', floor: 3, capacity: 18,
    equipment: ['WiFi', 'Projector', 'Whiteboard', 'AC'],
    image: 'https://picsum.photos/seed/b1301/400/240',
    bookings: [
      { date: '2026-03-04', startTime: '11:00', endTime: '13:00' },
    ],
  },
];

module.exports = { users, students, rooms };
