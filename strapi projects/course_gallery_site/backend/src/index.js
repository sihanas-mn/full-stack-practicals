'use strict';

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      console.log('🚀 Strapi bootstrap: Initializing Course Gallery Platform...');

      // 1. Configure Public Role Permissions
      try {
        const publicRole = await strapi
          .query('plugin::users-permissions.role')
          .findOne({ where: { type: 'public' } });

        if (publicRole) {
          const permissionsToEnable = [
            'api::course.course.find',
            'api::course.course.findOne',
            'api::category.category.find',
            'api::category.category.findOne',
            'api::lecturer.lecturer.find',
            'api::lecturer.lecturer.findOne',
            'api::inquiry.inquiry.create',
          ];

          for (const action of permissionsToEnable) {
            const existing = await strapi
              .query('plugin::users-permissions.permission')
              .findOne({ where: { action, role: publicRole.id } });

            if (!existing) {
              await strapi.query('plugin::users-permissions.permission').create({
                data: {
                  action,
                  role: publicRole.id,
                },
              });
              console.log(` Granted public permission for ${action}`);
            }
          }
        }
      } catch (permErr) {
        console.warn('Could not auto-configure public permissions:', permErr.message);
      }

      // 1b. Create or Retrieve Dedicated Gateway API Token
      try {
        const fs = require('fs');
        const path = require('path');
        const apiTokenService = strapi.service('admin::api-token');
        if (apiTokenService) {
          let token = await apiTokenService.getByName('CourseGalleryGatewayToken');
          let rawKey = null;
          if (!token) {
            token = await apiTokenService.create({
              name: 'CourseGalleryGatewayToken',
              description: 'Dedicated API Token for Express API Gateway',
              type: 'full-access',
              lifespan: null,
            });
            rawKey = token.accessKey;
            console.log('🔑 Newly Generated Strapi API Token:', rawKey);
          }
          if (rawKey) {
            const envPath = path.resolve(__dirname, '../../api-server/.env');
            if (fs.existsSync(envPath)) {
              let envContent = fs.readFileSync(envPath, 'utf8');
              envContent = envContent.replace(/^STRAPI_API_TOKEN=.*$/m, `STRAPI_API_TOKEN=${rawKey}`);
              fs.writeFileSync(envPath, envContent, 'utf8');
              console.log('🔐 Updated api-server/.env with Strapi API Token!');
            }
          }
        }
      } catch (tokErr) {
        console.warn('Gateway API Token creation note:', tokErr.message);
      }

      // 2. Check if Categories exist; if not, seed initial data
      try {
        const categoryCount = await strapi.query('api::category.category').count();
        if (categoryCount === 0) {
          console.log('🌱 Seeding initial Categories, Lecturers, and Courses...');

          // Seed Categories
          const createdCategories = {};
          const categoriesData = [
            {
              name: 'Web Development',
              slug: 'web-development',
              description: 'Master modern frontend, backend, and full-stack engineering with cutting-edge industry frameworks.',
            },
            {
              name: 'Cloud Computing & DevOps',
              slug: 'cloud-computing',
              description: 'Learn AWS, Docker, Kubernetes, CI/CD pipelines, and enterprise infrastructure automation.',
            },
            {
              name: 'Artificial Intelligence & Data',
              slug: 'artificial-intelligence',
              description: 'Build predictive AI models, neural networks, LLM agents, and data science pipelines.',
            },
            {
              name: 'Cybersecurity & Defense',
              slug: 'cybersecurity',
              description: 'Hands-on network security, penetration testing, threat hunting, and ethical hacking.',
            },
            {
              name: 'UI/UX Design & Product',
              slug: 'ui-ux-design',
              description: 'Design intuitive, accessible, and delightful digital user interfaces using Figma and design systems.',
            },
          ];

          for (const cat of categoriesData) {
            const entry = await strapi.query('api::category.category').create({
              data: { ...cat, publishedAt: new Date() },
            });
            createdCategories[cat.slug] = entry.id;
          }

          // Seed Lecturers
          const createdLecturers = {};
          const lecturersData = [
            {
              idKey: 'sarah',
              name: 'Prof. Sarah Jenkins',
              designation: 'Principal Software Architect & Full-Stack Lead',
              bio: 'Former Tech Lead at Stripe and senior educator with over a decade of experience scaling enterprise distributed systems.',
              qualification: 'Ph.D. in Computer Science, Stanford University',
              experience_years: 12,
              specialization: 'Full-Stack Architecture, React, Node.js & Distributed Systems',
              email: 'sarah.jenkins@coursegallery.edu',
              linkedin: 'https://linkedin.com/in/sarah-jenkins-educator',
              active_status: true,
            },
            {
              idKey: 'aris',
              name: 'Dr. Aris Thorne',
              designation: 'Director of AI Research & Senior Data Scientist',
              bio: 'Pioneering researcher in transformer models, generative AI, and predictive analytics with 20+ published academic papers.',
              qualification: 'Ph.D. in Machine Learning, MIT',
              experience_years: 14,
              specialization: 'Generative AI, Deep Learning, PyTorch & LLM Fine-tuning',
              email: 'aris.thorne@coursegallery.edu',
              linkedin: 'https://linkedin.com/in/aris-thorne-ai',
              active_status: true,
            },
            {
              idKey: 'david',
              name: 'David Chen',
              designation: 'AWS Certified Solutions Architect & SRE Lead',
              bio: 'Specialist in high-availability multi-region cloud architectures, Kubernetes orchestration, and zero-downtime CI/CD.',
              qualification: 'M.Sc. in Cloud Computing, UC Berkeley',
              experience_years: 9,
              specialization: 'Cloud Infrastructure, Kubernetes, Terraform & Site Reliability',
              email: 'david.chen@coursegallery.edu',
              linkedin: 'https://linkedin.com/in/david-chen-cloud',
              active_status: true,
            },
            {
              idKey: 'elena',
              name: 'Elena Rostova',
              designation: 'Chief Information Security Officer & Ethical Hacker',
              bio: 'Certified ethical hacker (OSCP, CISSP) advising Fortune 500 companies on cyber defense strategies and penetration testing.',
              qualification: 'M.Sc. in Cybersecurity, Oxford University',
              experience_years: 11,
              specialization: 'Penetration Testing, Cryptography, Zero-Trust Architecture',
              email: 'elena.rostova@coursegallery.edu',
              linkedin: 'https://linkedin.com/in/elena-rostova-sec',
              active_status: true,
            },
          ];

          for (const lec of lecturersData) {
            const { idKey, ...data } = lec;
            const entry = await strapi.query('api::lecturer.lecturer').create({
              data: { ...data, publishedAt: new Date() },
            });
            createdLecturers[idKey] = entry.id;
          }

          // Seed Courses
          const coursesData = [
            {
              course_title: 'Full-Stack Web Development with React & Node.js',
              slug: 'full-stack-web-development-react-node',
              course_code: 'FSW-101',
              short_description: 'Master modern full-stack web engineering from frontend components to scalable REST APIs and relational databases.',
              full_description: 'This comprehensive bootcamp immerses you in modern web engineering. You will master React 19, Tailwind CSS, Node.js, Express, and database management, building real-world production systems with authentication and real-time state.',
              category: createdCategories['web-development'],
              lecturer: createdLecturers['sarah'],
              price: 350.0,
              discount_price: 249.0,
              currency: 'USD',
              duration: '6 Months',
              lesson_count: 48,
              course_level: 'Intermediate',
              delivery_mode: 'Online',
              start_date: '2026-10-01',
              end_date: '2027-04-01',
              requirements: 'Basic familiarity with HTML, CSS, and introductory JavaScript fundamentals.',
              what_you_learn: '• Build interactive SPAs with React\n• Architect scalable backend APIs with Express\n• Manage relational databases with MySQL\n• Deploy to containerized production cloud environments',
              certification: true,
              featured_course: true,
              status: 'Published',
              seo_title: 'Full-Stack Web Development Bootcamp',
              seo_description: 'Become a certified full-stack web developer with hands-on projects and expert mentorship.',
            },
            {
              course_title: 'AI & Machine Learning Engineering Masterclass',
              slug: 'ai-machine-learning-engineering-masterclass',
              course_code: 'AIML-201',
              short_description: 'Delve into neural networks, PyTorch, computer vision, and building autonomous LLM agents.',
              full_description: 'Step into the cutting-edge realm of artificial intelligence. Master machine learning mathematics, deep neural networks, transformer architectures, and deploy intelligent agents capable of complex decision making.',
              category: createdCategories['artificial-intelligence'],
              lecturer: createdLecturers['aris'],
              price: 450.0,
              discount_price: 320.0,
              currency: 'USD',
              duration: '8 Months',
              lesson_count: 64,
              course_level: 'Advanced',
              delivery_mode: 'Hybrid',
              start_date: '2026-10-15',
              end_date: '2027-06-15',
              requirements: 'Solid understanding of Python programming and introductory linear algebra.',
              what_you_learn: '• Train deep neural networks with PyTorch\n• Fine-tune large language models and RAG architectures\n• Deploy AI models to edge and cloud inference endpoints',
              certification: true,
              featured_course: true,
              status: 'Published',
              seo_title: 'AI & Machine Learning Masterclass',
              seo_description: 'Gain elite AI engineering skills under the guidance of top researchers.',
            },
            {
              course_title: 'AWS Cloud Architecture & Kubernetes DevOps Bootcamp',
              slug: 'aws-cloud-architecture-kubernetes-bootcamp',
              course_code: 'CLD-301',
              short_description: 'Design enterprise cloud infrastructure, automate CI/CD, and orchestrate containers with Kubernetes.',
              full_description: 'Prepare for AWS Solutions Architect & CKA certifications. You will build high-availability VPC networks, manage Kubernetes clusters, automate with Terraform, and implement proactive observability.',
              category: createdCategories['cloud-computing'],
              lecturer: createdLecturers['david'],
              price: 390.0,
              discount_price: 279.0,
              currency: 'USD',
              duration: '5 Months',
              lesson_count: 42,
              course_level: 'Intermediate',
              delivery_mode: 'Online',
              start_date: '2026-11-01',
              end_date: '2027-04-01',
              requirements: 'Basic Linux shell command line skills and fundamental networking knowledge.',
              what_you_learn: '• Architect fault-tolerant AWS cloud topologies\n• Containerize services with Docker & Kubernetes\n• Write Infrastructure as Code with Terraform',
              certification: true,
              featured_course: true,
              status: 'Published',
              seo_title: 'AWS Cloud Architecture & Kubernetes Bootcamp',
              seo_description: 'Become a certified DevOps engineer with hands-on AWS and Kubernetes labs.',
            },
            {
              course_title: 'Ethical Hacking & Defensive Cybersecurity',
              slug: 'ethical-hacking-defensive-cybersecurity',
              course_code: 'SEC-401',
              short_description: 'Practical penetration testing, defensive hardening, vulnerability analysis, and incident response.',
              full_description: 'Learn offensive techniques to build bulletproof defense. Conduct vulnerability scanning, exploit analysis, web application penetration testing, and configure zero-trust network defenses.',
              category: createdCategories['cybersecurity'],
              lecturer: createdLecturers['elena'],
              price: 420.0,
              discount_price: 299.0,
              currency: 'USD',
              duration: '6 Months',
              lesson_count: 50,
              course_level: 'Advanced',
              delivery_mode: 'Physical',
              start_date: '2026-10-20',
              end_date: '2027-04-20',
              requirements: 'Strong TCP/IP networking foundation and familiarity with Linux security concepts.',
              what_you_learn: '• Penetration testing methodology & Kali Linux tools\n• OWASP Top 10 vulnerabilities and exploitation\n• Cryptography, SSL/TLS, and secure communication',
              certification: true,
              featured_course: true,
              status: 'Published',
              seo_title: 'Ethical Hacking & Defensive Cybersecurity Masterclass',
              seo_description: 'Learn hands-on ethical hacking, penetration testing, and enterprise defensive security.',
            },
          ];

          for (const crs of coursesData) {
            await strapi.query('api::course.course').create({
              data: { ...crs, publishedAt: new Date() },
            });
          }

          console.log('✅ Seeding completed successfully!');
        }
      } catch (seedErr) {
        console.warn('Seeding note:', seedErr.message);
      }
    } catch (err) {
      console.error('Error during Strapi bootstrap:', err);
    }
  },
};
