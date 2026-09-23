const User = require('./models/User');
const Student = require('./models/Student');

const seedDatabase = async () => {
  try {
    // 1. Seed Users if not present
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('--- Seeding initial Users into MongoDB Atlas ---');

      await User.create([
        {
          username: 'admin_user',
          email: 'admin@sms.com',
          password: 'AdminPassword123!',
          role: {
            name: 'Admin',
            type: 'admin',
            description: 'Administrator with full CRUD permissions',
          },
        },
        {
          username: 'student_user',
          email: 'student@sms.com',
          password: 'StudentPassword123!',
          role: {
            name: 'Student',
            type: 'student',
            description: 'Student role with read-only permissions',
          },
        },
        {
          username: 'sophia_student',
          email: 'sophia.student@sms.com',
          password: 'StudentPassword123!',
          role: {
            name: 'Student',
            type: 'student',
            description: 'Student role with read-only permissions',
          },
        },
      ]);
      console.log('✓ Seeded 3 users: 1 Admin, 2 Students.');
    }

    // 2. Seed Students if not present
    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      console.log('--- Seeding initial Student records into MongoDB Atlas ---');

      const demoStudents = [
        {
          name: 'Alexander Wright',
          studentId: 'STU-2024-001',
          email: 'student@sms.com',
          phone: '+1 (555) 234-5678',
          department: 'Computer Science',
          semester: '6th Semester',
          gpa: 3.88,
          status: 'Active',
          enrollmentDate: new Date('2022-09-01'),
          address: '452 Innovation Blvd, Cambridge, MA',
        },
        {
          name: 'Samantha Miller',
          studentId: 'STU-2024-002',
          email: 'sophia.student@sms.com',
          phone: '+1 (555) 345-6789',
          department: 'Electrical Engineering',
          semester: '4th Semester',
          gpa: 3.92,
          status: 'Active',
          enrollmentDate: new Date('2023-01-15'),
          address: '788 Silicon Way, San Jose, CA',
        },
        {
          name: 'Liam Zhang',
          studentId: 'STU-2024-003',
          email: 'liam.zhang@university.edu',
          phone: '+1 (555) 456-7890',
          department: 'Data Science & AI',
          semester: '8th Semester',
          gpa: 3.75,
          status: 'Graduated',
          enrollmentDate: new Date('2021-09-01'),
          address: '102 Tech Plaza, Seattle, WA',
        },
        {
          name: 'Chloe Bennett',
          studentId: 'STU-2024-004',
          email: 'chloe.b@university.edu',
          phone: '+1 (555) 567-8901',
          department: 'Mechanical Engineering',
          semester: '2nd Semester',
          gpa: 3.65,
          status: 'Active',
          enrollmentDate: new Date('2024-01-20'),
          address: '320 Oak Ridge Rd, Austin, TX',
        },
        {
          name: 'Marcus Vance',
          studentId: 'STU-2024-005',
          email: 'm.vance@university.edu',
          phone: '+1 (555) 678-9012',
          department: 'Information Systems',
          semester: '5th Semester',
          gpa: 3.1,
          status: 'Inactive',
          enrollmentDate: new Date('2022-09-01'),
          address: '89 Maple Street, Boston, MA',
        },
        {
          name: 'Emily Davis',
          studentId: 'STU-2024-006',
          email: 'emily.davis@university.edu',
          phone: '+1 (555) 789-0123',
          department: 'Data Science & AI',
          semester: '3rd Semester',
          gpa: 3.95,
          status: 'Active',
          enrollmentDate: new Date('2023-09-01'),
          address: '512 Pioneer Dr, Denver, CO',
        },
        {
          name: 'David Kim',
          studentId: 'STU-2024-007',
          email: 'david.kim@university.edu',
          phone: '+1 (555) 890-1234',
          department: 'Computer Science',
          semester: '7th Semester',
          gpa: 3.82,
          status: 'Active',
          enrollmentDate: new Date('2021-09-01'),
          address: '67 University Ave, Chicago, IL',
        },
        {
          name: 'Olivia Martinez',
          studentId: 'STU-2024-008',
          email: 'olivia.m@university.edu',
          phone: '+1 (555) 901-2345',
          department: 'Electrical Engineering',
          semester: '8th Semester',
          gpa: 3.7,
          status: 'Graduated',
          enrollmentDate: new Date('2021-01-15'),
          address: '22 Ocean Blvd, Miami, FL',
        },
      ];

      await Student.insertMany(demoStudents);
      console.log('✓ Seeded 8 comprehensive student records into MongoDB Atlas.');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

module.exports = seedDatabase;
