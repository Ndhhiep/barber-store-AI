// CSP-safe API utility
const API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000';

class APIService {
  constructor() {
    this.baseURL = API_URL;
  }

  // CSP-safe fetch with multiple fallback strategies
  async safeFetch(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Strategy 1: Standard CORS request
    try {
      const response = await this.corsRequest(url, options);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (corsError) {
      console.warn('CORS request failed:', corsError.message);
      
      // Strategy 2: Try with different headers
      try {
        const response = await this.fallbackRequest(url, options);
        if (response.ok) {
          return await response.json();
        }
        throw new Error(`Fallback request failed: ${response.status}`);
      } catch (fallbackError) {
        console.error('All fetch strategies failed:', fallbackError.message);
        throw new Error('Unable to connect to server. Please check your internet connection and try again.');
      }
    }
  }

  async corsRequest(url, options) {
    return fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      mode: 'cors',
      credentials: 'omit',
      ...options
    });
  }

  async fallbackRequest(url, options) {
    return fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Accept': 'application/json',
        ...options.headers
      },
      mode: 'cors',
      credentials: 'same-origin',
      ...options
    });
  }

  // Specific API methods
  async getProducts() {
    return this.safeFetch('/api/products');
  }

  async getShowcaseProducts() {
    return this.safeFetch('/api/products/showcase-by-category');
  }

  async getProduct(id) {
    return this.safeFetch(`/api/products/${id}`);
  }

  async getServices() {
    return this.safeFetch('/api/services');
  }

  async createOrder(orderData) {
    return this.safeFetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async createBooking(bookingData) {
    return this.safeFetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  }
}

// Export singleton instance
export const apiService = new APIService();
export default apiService;
