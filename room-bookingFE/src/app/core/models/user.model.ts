export interface User {
<<<<<<< HEAD
  _id: string;
  email: string;
  role: 'admin' | 'student';
  isActive: boolean;
}

export interface StudentProfile {
  _id: string;
  userId: string;
  studentCode: string;
  fullName: string;
  faculty: string;
  major: string;
  phone: string;
  quotaPerWeek: number;
  avatarUrl: string;
}

export interface UserWithProfile {
  user: User;
  profile: StudentProfile | null;
=======
  id: number;
  email: string;
  role: 'admin' | 'student';
>>>>>>> 802fc94335e1e55ef58e17eead5f49d7a8e6ddc3
}
