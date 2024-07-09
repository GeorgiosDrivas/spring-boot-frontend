export const clearTokenOnWindowClose = (): void => {
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('token');
    });
};