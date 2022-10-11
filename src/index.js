import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { TodoProvider } from './Context/TodoProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TodoProvider>
        <App />
    </TodoProvider>

);
