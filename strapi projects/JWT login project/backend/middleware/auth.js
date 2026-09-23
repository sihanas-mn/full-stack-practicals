const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes with JWT authentication
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      data: null,
      error: {
        status: 401,
        name: 'UnauthorizedError',
        message: 'No token provided. Authorization denied.',
      },
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_jwt_key_sms_2026_secure_hash_x92!'
    );

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        data: null,
        error: {
          status: 401,
          name: 'UnauthorizedError',
          message: 'User belonging to this token no longer exists.',
        },
      });
    }

    if (user.blocked) {
      return res.status(403).json({
        data: null,
        error: {
          status: 403,
          name: 'ForbiddenError',
          message: 'Your account has been blocked.',
        },
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({
      data: null,
      error: {
        status: 401,
        name: 'UnauthorizedError',
        message: 'Invalid or expired token.',
      },
    });
  }
};

// Require Admin privileges for CRUD operations
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      data: null,
      error: {
        status: 401,
        name: 'UnauthorizedError',
        message: 'Authentication required.',
      },
    });
  }

  const roleName = req.user.role?.name?.toLowerCase() || '';
  const roleType = req.user.role?.type?.toLowerCase() || '';
  const isAdmin = roleName.includes('admin') || roleType === 'admin';

  if (!isAdmin) {
    return res.status(403).json({
      data: null,
      error: {
        status: 403,
        name: 'ForbiddenError',
        message: 'Forbidden: You do not have permission to perform this action.',
      },
    });
  }

  next();
};

module.exports = { protect, requireAdmin };
