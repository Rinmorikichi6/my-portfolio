/* ========================================
   PORTFOLIO - API FUNCTIONS
   ======================================== */

const API_BASE_URL = 'http://localhost:5000/api';

async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const options = {
    method: method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/* Auth API */
async function registerUser(userData) {
  return await apiRequest('/auth/register', 'POST', userData);
}

async function loginUser(credentials) {
  return await apiRequest('/auth/login', 'POST', credentials);
}

async function getCurrentUser(token) {
  return await apiRequest('/auth/me', 'GET', null, token);
}

/* Projects API */
async function getProjects() {
  return await apiRequest('/projects');
}

async function getProject(id) {
  return await apiRequest(`/projects/${id}`);
}

/* Contact API */
async function submitContact(data) {
  return await apiRequest('/contact', 'POST', data);
}

async function getContactMessages(token) {
  return await apiRequest('/contact', 'GET', null, token);
}

/* Blog API */
async function getBlogPosts() {
  return await apiRequest('/blog');
}

async function getBlogPost(id) {
  return await apiRequest(`/blog/${id}`);
}

/* UI Helpers */
function showLoading(button) {
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<span>Loading...</span>';
  button.dataset.originalText = originalText;
}

function hideLoading(button) {
  button.disabled = false;
  button.innerHTML = button.dataset.originalText || 'Submit';
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/* Token Helpers */
function setToken(token) {
  localStorage.setItem('portfolio_token', token);
}

function getToken() {
  return localStorage.getItem('portfolio_token');
}

function removeToken() {
  localStorage.removeItem('portfolio_token');
}

function isLoggedIn() {
  return !!getToken();
}

function logout() {
  removeToken();
  window.location.href = '/';
}

/* Fallback Data */
const localStorageData = {
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'fullstack',
      description: 'Full-featured e-commerce with cart, checkout, admin panel.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveLink: '/projects/ecommerce/index.html',
      githubLink: 'https://github.com'
    },
    {
      id: 2,
      title: 'Chat Application',
      category: 'web',
      description: 'Real-time messaging with beautiful UI.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
      technologies: ['JavaScript', 'Socket.io'],
      liveLink: '/projects/chat-app/index.html',
      githubLink: 'https://github.com'
    },
    {
      id: 3,
      title: 'Admin Dashboard',
      category: 'fullstack',
      description: 'Analytics dashboard with charts and tables.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      technologies: ['React', 'Chart.js'],
      liveLink: '/projects/admin-dashboard/index.html',
      githubLink: 'https://github.com'
    },
    {
      id: 4,
      title: 'Task Manager',
      category: 'web',
      description: 'Productivity app with local storage.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      liveLink: '/projects/task-manager/index.html',
      githubLink: 'https://github.com'
    },
    {
      id: 5,
      title: 'Portfolio Template',
      category: 'frontend',
      description: 'Beautiful portfolio with responsive design.',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveLink: '/projects/portfolio-template/index.html',
      githubLink: 'https://github.com'
    }
  ]
};

async function getProjectsWithFallback() {
  try {
    return await getProjects();
  } catch (error) {
    console.log('Using local data for projects');
    return localStorageData.projects;
  }
}

async function getBlogPostsWithFallback() {
  try {
    return await getBlogPosts();
  } catch (error) {
    return [];
  }
}