import { body, validationResult } from 'express-validator';
import { strapiService } from '../services/strapiService.js';

export const validateInquiry = [
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\s+\-()]{7,20}$/)
    .withMessage('Please provide a valid phone number'),
  body('course_id')
    .optional({ nullable: true, checkFalsy: true }),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message or inquiry detail is required')
    .isLength({ min: 5, max: 2000 })
    .withMessage('Message must be between 5 and 2000 characters'),
];

export const submitInquiry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { full_name, email, phone, course_id, message } = req.body;
    const inquiry = await strapiService.createInquiry({
      full_name,
      email,
      phone,
      course_id,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your course inquiry has been successfully submitted. Our team will contact you shortly.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};
