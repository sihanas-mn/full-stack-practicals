import axios from 'axios';
import { config } from '../config/index.js';
import { initialCourses, initialCategories, initialLecturers } from './mockData.js';

const client = axios.create({
  baseURL: config.strapiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    ...(config.strapiToken && !config.strapiToken.includes('mock') ? { Authorization: `Bearer ${config.strapiToken}` } : {}),
  },
});

// In-memory inquiry store as backup/cache
const inquiriesStore = [];

/**
 * Normalizes Strapi v4/v5 data format to flat object
 */
const normalizeItem = (item) => {
  if (!item) return null;
  const id = item.id;
  const attrs = item.attributes || item;
  const result = { id, ...attrs };

  // Recursively normalize relations
  for (const key of Object.keys(result)) {
    if (result[key] && typeof result[key] === 'object' && result[key].data !== undefined) {
      if (Array.isArray(result[key].data)) {
        result[key] = result[key].data.map(normalizeItem);
      } else if (result[key].data === null) {
        result[key] = null;
      } else {
        result[key] = normalizeItem(result[key].data);
      }
    }
  }

  // Assign relatable generated image for courses if missing
  if (result.course_title) {
    if (!result.course_thumbnail) {
      const text = (result.course_title + ' ' + (result.slug || '')).toLowerCase();
      if (text.includes('ai') || text.includes('machine') || text.includes('data')) {
        result.course_thumbnail = '/images/ai_ml.jpg';
      } else if (text.includes('cloud') || text.includes('aws') || text.includes('kubernetes')) {
        result.course_thumbnail = '/images/cloud_devops.jpg';
      } else if (text.includes('security') || text.includes('hack')) {
        result.course_thumbnail = '/images/cyber_security.jpg';
      } else if (text.includes('ui') || text.includes('ux') || text.includes('design')) {
        result.course_thumbnail = '/images/ui_ux.jpg';
      } else {
        result.course_thumbnail = '/images/web_dev.jpg';
      }
    }
    if (!result.course_banner) {
      result.course_banner = result.course_thumbnail;
    }
    result.status = result.course_status || result.status || 'Published';
  }

  // Assign relatable generated image for categories if missing
  if (result.name && result.slug) {
    if (!result.image) {
      const slug = (result.slug || '').toLowerCase();
      if (slug.includes('ai') || slug.includes('artificial') || slug.includes('data')) {
        result.image = '/images/ai_ml.jpg';
      } else if (slug.includes('cloud') || slug.includes('devops')) {
        result.image = '/images/cloud_devops.jpg';
      } else if (slug.includes('security') || slug.includes('cyber')) {
        result.image = '/images/cyber_security.jpg';
      } else if (slug.includes('design') || slug.includes('ui')) {
        result.image = '/images/ui_ux.jpg';
      } else {
        result.image = '/images/web_dev.jpg';
      }
    }
  }

  return result;
};

export const strapiService = {
  /**
   * Get list of courses with filtering, sorting, pagination
   */
  async getCourses(filters = {}) {
    const { category, level, delivery_mode, search, sort, page = 1, pageSize = 9 } = filters;
    try {
      // Build query string for Strapi
      const params = {
        populate: '*',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
      };

      if (category && category !== 'all') {
        params['filters[category][slug][$eq]'] = category;
      }
      if (level && level !== 'all') {
        params['filters[course_level][$eq]'] = level;
      }
      if (delivery_mode && delivery_mode !== 'all') {
        params['filters[delivery_mode][$eq]'] = delivery_mode;
      }
      if (search) {
        params['filters[$or][0][course_title][$containsi]'] = search;
        params['filters[$or][1][short_description][$containsi]'] = search;
      }
      if (sort) {
        if (sort === 'price_asc') params['sort[0]'] = 'discount_price:asc';
        else if (sort === 'price_desc') params['sort[0]'] = 'discount_price:desc';
        else if (sort === 'newest') params['sort[0]'] = 'createdAt:desc';
      }

      const response = await client.get('/courses', { params });
      if (response.data && response.data.data && response.data.data.length > 0) {
        const courses = response.data.data.map(normalizeItem);
        return {
          data: courses,
          meta: response.data.meta || {
            pagination: { page: Number(page), pageSize: Number(pageSize), total: courses.length, pageCount: 1 },
          },
        };
      }
    } catch (err) {
      // Strapi not ready or connection failed; fallback to rich mock data
      console.warn('Strapi query failed, using built-in course registry:', err.message);
    }

    // Filter local data
    let courses = [...initialCourses];
    if (category && category !== 'all') {
      courses = courses.filter((c) => c.category?.slug === category);
    }
    if (level && level !== 'all') {
      courses = courses.filter((c) => c.course_level?.toLowerCase() === level.toLowerCase());
    }
    if (delivery_mode && delivery_mode !== 'all') {
      courses = courses.filter((c) => c.delivery_mode?.toLowerCase() === delivery_mode.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.course_title.toLowerCase().includes(q) ||
          c.short_description.toLowerCase().includes(q) ||
          c.course_code.toLowerCase().includes(q)
      );
    }
    if (sort === 'price_asc') {
      courses.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
    } else if (sort === 'price_desc') {
      courses.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
    } else if (sort === 'newest') {
      courses.sort((a, b) => b.id - a.id);
    }

    const total = courses.length;
    const startIndex = (Number(page) - 1) * Number(pageSize);
    const paginated = courses.slice(startIndex, startIndex + Number(pageSize));

    return {
      data: paginated,
      meta: {
        pagination: {
          page: Number(page),
          pageSize: Number(pageSize),
          pageCount: Math.ceil(total / Number(pageSize)) || 1,
          total,
        },
      },
    };
  },

  /**
   * Get single course by slug
   */
  async getCourseBySlug(slug) {
    try {
      const response = await client.get('/courses', {
        params: {
          'filters[slug][$eq]': slug,
          populate: '*',
        },
      });
      if (response.data && response.data.data && response.data.data.length > 0) {
        return normalizeItem(response.data.data[0]);
      }
    } catch (err) {
      console.warn(`Strapi course slug '${slug}' lookup failed:`, err.message);
    }

    // Fallback to mock data
    const course = initialCourses.find((c) => c.slug === slug);
    if (!course) {
      throw new Error(`Course with slug '${slug}' not found`);
    }
    return course;
  },

  /**
   * Get all categories
   */
  async getCategories() {
    try {
      const response = await client.get('/categories', {
        params: { populate: '*' },
      });
      if (response.data && response.data.data && response.data.data.length > 0) {
        return response.data.data.map(normalizeItem);
      }
    } catch (err) {
      console.warn('Strapi categories query failed:', err.message);
    }
    return initialCategories;
  },

  /**
   * Get all lecturers
   */
  async getLecturers() {
    try {
      const response = await client.get('/lecturers', {
        params: { populate: '*' },
      });
      if (response.data && response.data.data && response.data.data.length > 0) {
        return response.data.data.map(normalizeItem);
      }
    } catch (err) {
      console.warn('Strapi lecturers query failed:', err.message);
    }
    return initialLecturers;
  },

  /**
   * Submit inquiry
   */
  async createInquiry(data) {
    try {
      const response = await client.post('/inquiries', {
        data: {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          course: data.course_id || null,
          message: data.message,
        },
      });
      if (response.data && response.data.data) {
        return normalizeItem(response.data.data);
      }
    } catch (err) {
      console.warn('Strapi inquiry forward failed, saving to gateway memory:', err.message);
    }

    const savedInquiry = {
      id: inquiriesStore.length + 1,
      ...data,
      created_at: new Date().toISOString(),
    };
    inquiriesStore.push(savedInquiry);
    return savedInquiry;
  },
};
