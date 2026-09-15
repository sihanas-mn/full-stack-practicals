import { strapiService } from '../services/strapiService.js';

export const getLecturers = async (req, res, next) => {
  try {
    const lecturers = await strapiService.getLecturers();
    res.json({
      success: true,
      data: lecturers,
    });
  } catch (error) {
    next(error);
  }
};
