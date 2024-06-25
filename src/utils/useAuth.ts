export const useAuth = () => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Check if token exists and is valid (you can extend this logic based on your authentication requirements)
    const isAuthenticated = !!token; // Double negation to convert truthy/falsy to true/false

    return isAuthenticated;
};
