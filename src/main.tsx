import { createRoot } from 'react-dom/client';
import App from './components/App';
import { store } from './store';
import { Provider } from 'react-redux';
import './styles/styles.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
<Provider store={store}>
    <App />
</Provider>
);
