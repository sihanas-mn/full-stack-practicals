const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'super_secret_jwt_key_sms_2026_secure_hash_x92!',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

/**
 * @route   POST /api/auth/local (or /api/auth/login)
 * @desc    Authenticate user & get JWT token
 * @access  Public
 */
const loginHandler = async (req, res) => {
  try {
    const { identifier, email, username, password } = req.body;
    const loginIdentifier = identifier || email || username;

    if (!loginIdentifier || !password) {
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: 'ValidationError',
          message: 'Please provide identifier/email and password',
        },
      });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: loginIdentifier.toLowerCase().trim() },
        { username: loginIdentifier.trim() },
      ],
    });

    if (!user) {
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: 'ValidationError',
          message: 'Invalid identifier or password',
        },
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: 'ValidationError',
          message: 'Invalid identifier or password',
        },
      });
    }

    if (user.blocked) {
      return res.status(403).json({
        data: null,
        error: {
          status: 403,
          name: 'ForbiddenError',
          message: 'Your account is blocked.',
        },
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      jwt: token,
      user: {
        id: user._id.toString(),
        documentId: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        confirmed: user.confirmed,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: 'InternalServerError',
        message: 'Server error during authentication',
      },
    });
  }
};

router.post('/local', loginHandler);
router.post('/login', loginHandler);

/**
 * @route   POST /api/auth/local/register (or /api/auth/register)
 * @desc    Register a new user
 * @access  Public
 */
const registerHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: 'ValidationError',
          message: 'Username, email and password are required',
        },
      });
    }

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existing) {
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: 'ValidationError',
          message: 'Email or username already in use',
        },
      });
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      role: {
        name: 'Student',
        type: 'student',
        description: 'Student role with read-only access',
      },
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      jwt: token,
      user: {
        id: user._id.toString(),
        documentId: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        confirmed: user.confirmed,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: 'InternalServerError',
        message: 'Server error during registration',
      },
    });
  }
};

router.post('/local/register', registerHandler);
router.post('/register', registerHandler);

/**
 * @route   GET /api/users/me
 * @desc    Get currently logged-in user profile with populated role
 * @access  Private (JWT Bearer Token required)
 */
router.get('/me', protect, (req, res) => {
  return res.status(200).json({
    id: req.user._id.toString(),
    documentId: req.user._id.toString(),
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
    confirmed: req.user.confirmed,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  });
});

module.exports = router;
