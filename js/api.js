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
      title: 'ShopSphere',
      category: 'fullstack',
      description: 'Full stack ecommerce platform with responsive UI, cart system, authentication, and product management.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
      liveLink: '/projects/shopsphere/index.html',
      githubLink: 'https://github.com/Rinmorikichi6'
    },
    {
      id: 2,
      title: 'AdminFlow',
      category: 'frontend',
      description: 'Professional admin dashboard with analytics cards, charts, tables, and responsive dashboard layout.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveLink: '/projects/adminflow/index.html',
      githubLink: 'https://github.com/Rinmorikichi6'
    },
    {
      id: 3,
      title: 'TaskZen',
      category: 'web',
      description: 'Task management application with task creation, filtering, completion tracking, and responsive interface.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveLink: '/projects/taskzen/index.html',
      githubLink: 'https://github.com/Rinmorikichi6'
    },
    {
      id: 4,
      title: 'ChatNest',
      category: 'fullstack',
      description: 'Modern chat application with responsive messaging interface and interactive chat layout.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      liveLink: '/projects/chatnest/index.html',
      githubLink: 'https://github.com/Rinmorikichi6'
    },
    {
      id: 5,
      title: 'NexaAgency',
      category: 'web',
      description: 'Professional business website with modern UI, services section, responsive design, and contact system.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveLink: '/projects/nexaagency/index.html',
      githubLink: 'https://github.com/Rinmorikichi6'
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