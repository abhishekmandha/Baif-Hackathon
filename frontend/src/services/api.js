/**
 * API Service Layer
 * Handles all HTTP requests to the FastAPI backend
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
console.log('Frontend API_URL:', API_URL); // Added for debugging

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Make HTTP request to backend
 * @param {string} endpoint - API endpoint (e.g., '/users')
 * @param {object} options - Request options
 * @returns {Promise<any>} Response data
 */
async function makeRequest(endpoint, options = {}) {
  const {
    method = 'GET',
    body = null,
    headers = {},
    token = null,
  } = options;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: 'Unknown error' };
      }

      throw new APIError(
        errorData.detail || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Request failed: ${error.message}`, 0, error);
  }
}

/**
 * Authentication APIs
 */
export const authAPI = {
  /**
   * Register a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} fullName - User full name
   * @returns {Promise<object>} User data
   */
  register: async (email, password, fullName) => {
    return makeRequest('/users', {
      method: 'POST',
      body: {
        email,
        password,
        full_name: fullName,
      },
    });
  },

  /**
   * Login user to get an access token.
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} User data
   */
  login: async (email, password) => {
    // The backend expects form data for the token endpoint.
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    return makeRequest('/token', {
      method: 'POST',
      body: formData.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  /**
   * Get current user
   * @param {number} userId - User ID
   * @returns {Promise<object>} User data
   */
  getCurrentUser: async (userId) => {
    return makeRequest(`/users/${userId}`);
  },
};

/**
 * User APIs
 */
export const userAPI = {
  /**
   * Get all users
   * @param {number} skip - Skip count (pagination)
   * @param {number} limit - Limit count (pagination)
   * @returns {Promise<array>} List of users
   */
  getAll: async (skip = 0, limit = 100) => {
    return makeRequest(`/users?skip=${skip}&limit=${limit}`);
  },

  /**
   * Get user by ID
   * @param {number} userId - User ID
   * @returns {Promise<object>} User data
   */
  getById: async (userId) => {
    return makeRequest(`/users/${userId}`);
  },

  /**
   * Update user
   * @param {number} userId - User ID
   * @param {object} updates - User updates
   * @returns {Promise<object>} Updated user data
   */
  update: async (userId, updates) => {
    return makeRequest(`/users/${userId}`, {
      method: 'PUT',
      body: updates,
    });
  },

  /**
   * Delete user
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  delete: async (userId) => {
    return makeRequest(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Jobs APIs (placeholder for future implementation)
 */
export const jobsAPI = {
  /**
   * Submit a new translation job
   * @param {FormData} formData - Form data with file and options
   * @returns {Promise<object>} Job data
   */
  submitJob: async (formData) => {
    return fetch(`${API_URL}/jobs`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type for FormData - browser will set it with boundary
    }).then((response) => {
      if (!response.ok) {
        throw new APIError(`HTTP ${response.status}`, response.status, null);
      }
      return response.json();
    });
  },

  /**
   * Get all jobs
   * @returns {Promise<array>} List of jobs
   */
  getAll: async () => {
    return makeRequest('/jobs');
  },

  /**
   * Get job by ID
   * @param {string} jobId - Job ID
   * @returns {Promise<object>} Job data
   */
  getById: async (jobId) => {
    return makeRequest(`/jobs/${jobId}`);
  },

  /**
   * Get job status
   * @param {string} jobId - Job ID
   * @returns {Promise<object>} Job status
   */
  getStatus: async (jobId) => {
    return makeRequest(`/jobs/${jobId}/status`);
  },
};

/**
 * Repository APIs
 */
export const repositoryAPI = {
  /**
   * Get all repository items
   * @returns {Promise<array>} List of items
   */
  getAll: async () => {
    return makeRequest('/repository');
  },

  /**
   * Download repository item
   * @param {string} itemId - Item ID
   * @returns {Promise<Blob>} File blob
   */
  download: async (itemId) => {
    const response = await fetch(`${API_URL}/repository/${itemId}/download`);
    if (!response.ok) {
      throw new APIError(`HTTP ${response.status}`, response.status, null);
    }
    return response.blob();
  },

  /**
   * Delete repository item
   * @param {string} itemId - Item ID
   * @returns {Promise<void>}
   */
  delete: async (itemId) => {
    return makeRequest(`/repository/${itemId}`, {
      method: 'DELETE',
    });
  },
};

export { APIError };
export default { authAPI, userAPI, jobsAPI, repositoryAPI };
