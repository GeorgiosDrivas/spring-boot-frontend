export const clearTokenOnWindowClose = () => {
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('token');
    });
};