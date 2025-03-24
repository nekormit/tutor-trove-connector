
// Simple utility functions for authentication

// Get users from localStorage or return default users if none exist
export const getUsers = () => {
  const users = localStorage.getItem('users');
  if (users) {
    return JSON.parse(users);
  }
  
  // Default users if none exist
  const defaultUsers = [
    { 
      email: 'tutor@example.com', 
      password: 'Password123!', 
      type: 'tutor',
      name: 'Alex Johnson'
    },
    { 
      email: 'lecturer@example.com', 
      password: 'Password123!', 
      type: 'lecturer',
      name: 'Dr. Sarah Williams' 
    }
  ];
  
  localStorage.setItem('users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Authenticate a user
export const authenticateUser = (email: string, password: string) => {
  const users = getUsers();
  return users.find((user: any) => user.email === email && user.password === password) || null;
};

// Store authenticated user in session storage
export const setAuthenticatedUser = (user: any) => {
  // Remove password for security
  const { password, ...userWithoutPassword } = user;
  sessionStorage.setItem('authenticatedUser', JSON.stringify(userWithoutPassword));
};

// Get authenticated user from session storage
export const getAuthenticatedUser = () => {
  const user = sessionStorage.getItem('authenticatedUser');
  return user ? JSON.parse(user) : null;
};

// Remove authenticated user from session storage
export const removeAuthenticatedUser = () => {
  sessionStorage.removeItem('authenticatedUser');
};
