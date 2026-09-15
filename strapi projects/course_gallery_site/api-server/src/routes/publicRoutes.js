import { Router } from 'express';
import { getCourses, getCourseBySlug } from '../controllers/courseController.js';
import { getCategories } from '../controllers/categoryController.js';
import { getLecturers } from '../controllers/lecturerController.js';
import { submitInquiry, validateInquiry } from '../controllers/inquiryController.js';
import { inquiryLimiter } from '../middleware/security.js';

const router = Router();

// Courses
router.get('/courses', getCourses);
router.get('/courses/:slug', getCourseBySlug);

// Categories
router.get('/categories', getCategories);

// Lecturers
router.get('/lecturers', getLecturers);

// Inquiries
router.post('/inquiries', inquiryLimiter, validateInquiry, submitInquiry);

// Secure HTTP-Only Cookie Session endpoints
router.post('/auth/session', (req, res) => {
  // Sets standard secure HTTP-only cookie
  const sessionToken = 'cg_sess_' + Math.random().toString(36).substring(2) + Date.now();
  if (res.setSecureAuthCookie) {
    res.setSecureAuthCookie(sessionToken);
  }
  res.json({
    success: true,
    message: 'Secure HTTP-only session initialized',
  });
});

router.get('/auth/session', (req, res) => {
  const token = req.cookies?.strapi_access_token;
  res.json({
    success: true,
    authenticated: Boolean(token),
  });
});

router.post('/auth/logout', (req, res) => {
  if (res.clearSecureAuthCookie) {
    res.clearSecureAuthCookie();
  }
  res.json({
    success: true,
    message: 'Session cleared',
  });
});

export default router;
