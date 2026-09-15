import { strapiService } from '../services/strapiService.js';

export const getCourses = async (req, res, next) => {
  try {
    const { category, level, delivery_mode, search, sort, page, pageSize } = req.query;
    const result = await strapiService.getCourses({
      category,
      level,
      delivery_mode,
      search,
      sort,
      page,
      pageSize,
    });
    res.json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const course = await strapiService.getCourseBySlug(slug);
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || 'Course not found',
    });
  }
};
