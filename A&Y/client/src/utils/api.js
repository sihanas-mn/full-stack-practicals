import { units, amenities, constructionPhases, financialMetrics, risks, faqs, siteSettings } from '../data/staticData';

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  get: async (url) => {
    await delay(300); // Simulate network latency
    
    switch (url) {
      case '/units':
        return { data: units };
      case '/amenities':
        return { data: amenities };
      case '/timeline/phases':
        return { data: constructionPhases };
      case '/financials':
        return { data: financialMetrics };
      case '/risks':
        return { data: risks };
      case '/faq':
        return { data: faqs };
      case '/settings':
        return { data: siteSettings };
      default:
        console.warn(`Mock API: 404 Not Found for GET ${url}`);
        return { data: null };
    }
  },
  
  post: async (url, data) => {
    await delay(500); // Simulate network latency
    
    switch (url) {
      case '/leads':
        console.log('Mock API: Lead submitted successfully:', data);
        return { data: { success: true, message: 'Lead submitted' } };
      case '/auth/login':
        console.log('Mock API: Auth simulated');
        if (data.email === 'admin@ayconsolidated.lk') {
          return { data: { token: 'mock-token-123', user: { name: 'A&Y Admin', role: 'Admin' } } };
        }
        throw new Error('Invalid credentials');
      case '/auth/logout':
        return { data: { success: true } };
      default:
        console.warn(`Mock API: 404 Not Found for POST ${url}`);
        return { data: null };
    }
  }
};

export default api;
