const API_BASE = 'http://localhost:5000/api';

/**
 * Helper to make API requests with optional auth token.
 */
async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();

    if (!res.ok) {
        // Collect error message from backend
        const message =
            data.message ||
            (data.errors && data.errors.map((e) => e.msg).join(', ')) ||
            'Something went wrong';
        throw new Error(message);
    }

    return data;
}

/** POST /api/auth/register */
export async function registerUser({ name, email, password, phone, role }) {
    return request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phone, role }),
    });
}

/** POST /api/auth/login */
export async function loginUser({ email, password }) {
    return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

/** GET /api/auth/profile — requires token */
export async function getProfile() {
    return request('/auth/profile');
}
