import { strapiService } from '../services/strapiService.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await strapiService.getCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
