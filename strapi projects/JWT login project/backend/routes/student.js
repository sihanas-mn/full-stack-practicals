const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/students
 * @desc    Get all students (Admins) OR only the authenticated student's record (Students)
 * @access  Private (JWT Protected)
 */
router.get('/', protect, async (req, res) => {
  try {
    const roleName = req.user.role?.name?.toLowerCase() || '';
    const roleType = req.user.role?.type?.toLowerCase() || '';
    const isAdmin = roleName.includes('admin') || roleType === 'admin';

    let filter = {};

    if (!isAdmin) {
      // Students can ONLY view their own record matching their login email
      filter.email = req.user.email.toLowerCase();
    } else {
      // Admins can search / filter
      const { search, department, status } = req.query;

      if (department && department !== 'All') {
        filter.department = department;
      }

      if (status && status !== 'All') {
        filter.status = status;
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { studentId: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } },
        ];
      }
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      data: students,
      meta: {
        total: students.length,
      },
    });
  } catch (err) {
    console.error('Error fetching students:', err);
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: 'InternalServerError',
        message: 'Failed to retrieve students',
      },
    });
  }
});

/**
 * @route   GET /api/students/:id
 * @desc    Get student profile by ID
 * @access  Private (Admins: all, Students: only own record)
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    let student;

    if (mongoose.Types.ObjectId.isValid(id)) {
      student = await Student.findById(id);
    } else {
      student = await Student.findOne({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({
        data: null,
        error: {
          status: 404,
          name: 'NotFoundError',
          message: 'Student record not found',
        },
      });
    }

    const roleName = req.user.role?.name?.toLowerCase() || '';
    const roleType = req.user.role?.type?.toLowerCase() || '';
    const isAdmin = roleName.includes('admin') || roleType === 'admin';

    // Verify ownership for students
    if (!isAdmin && student.email.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(403).json({
        data: null,
        error: {
          status: 403,
          name: 'ForbiddenError',
          message: 'Access denied: You are only allowed to view your own student record.',
        },
      });
    }

    return res.status(200).json({
      data: student,
    });
  } catch (err) {
    console.error('Error fetching student:', err);
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: 'InternalServerError',
        message: 'Failed to retrieve student record',
      },
    });
  }
});

/**
 * @route   POST /api/students
 * @desc    Create a new student
 * @access  Private (Admin only)
 */
router.post('/', protect, requireAdmin, async (req, res) => {
  try {
    // Support both { data: {...} } (Strapi payload) and flat {...} (Standard REST)
    const payload = req.body.data || req.body;

    const {
      name,
      studentId,
      email,
      phone,
      department,
      semester,
      gpa,
      status,
      enrollmentDate,
      address,
    } = payload;

    if (!name || !studentId || !email || !department) {
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: 'ValidationError',
          message: 'Name, Student ID, Email, and Department are required',
        },
      });
    }

    const existingStudent = await Student.findOne({
      $or: [{ studentId: studentId.trim() }, { email: email.toLowerCase().trim() }],
    });

    if (existingStudent) {
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: 'ValidationError',
          message: 'A student with this Student ID or Email already exists.',
        },
      });
    }

    const newStudent = await Student.create({
      name: name.trim(),
      studentId: studentId.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || '',
      department: department.trim(),
      semester: semester || '1st Semester',
      gpa: gpa !== undefined ? Number(gpa) : 3.5,
      status: status || 'Active',
      enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : new Date(),
      address: address || '',
    });

    return res.status(201).json({
      data: newStudent,
    });
  } catch (err) {
    console.error('Error creating student:', err);
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: 'InternalServerError',
        message: err.message || 'Failed to create student',
      },
    });
  }
});

/**
 * @route   PUT /api/students/:id
 * @desc    Update a student
 * @access  Private (Admin only)
 */
router.put('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body.data || req.body;

    let student;
    if (mongoose.Types.ObjectId.isValid(id)) {
      student = await Student.findById(id);
    } else {
      student = await Student.findOne({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({
        data: null,
        error: {
          status: 404,
          name: 'NotFoundError',
          message: 'Student record not found',
        },
      });
    }

    // Update fields
    const allowedFields = [
      'name',
      'studentId',
      'email',
      'phone',
      'department',
      'semester',
      'gpa',
      'status',
      'enrollmentDate',
      'address',
    ];

    allowedFields.forEach((field) => {
      if (payload[field] !== undefined) {
        if (field === 'email') {
          student[field] = payload[field].toLowerCase().trim();
        } else if (field === 'gpa') {
          student[field] = Number(payload[field]);
        } else if (field === 'enrollmentDate') {
          student[field] = new Date(payload[field]);
        } else {
          student[field] = payload[field];
        }
      }
    });

    await student.save();

    return res.status(200).json({
      data: student,
    });
  } catch (err) {
    console.error('Error updating student:', err);
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: 'InternalServerError',
        message: err.message || 'Failed to update student',
      },
    });
  }
});

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete a student record
 * @access  Private (Admin only)
 */
router.delete('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    let student;
    if (mongoose.Types.ObjectId.isValid(id)) {
      student = await Student.findByIdAndDelete(id);
    } else {
      student = await Student.findOneAndDelete({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({
        data: null,
        error: {
          status: 404,
          name: 'NotFoundError',
          message: 'Student record not found',
        },
      });
    }

    return res.status(200).json({
      data: student,
      message: 'Student record deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting student:', err);
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: 'InternalServerError',
        message: 'Failed to delete student',
      },
    });
  }
});

module.exports = router;
