import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

/* ========================================
   New CSS Architecture
   ======================================== */
// 1. Design Tokens (переменные)
import './styles/tokens.css';

// 2. Reset & Base
import './index.css';

// 3. Utility Classes
import './styles/utilities.css';

// 4. Component Styles
import './styles/components-new.css';

// 5. Theme Styles
import './styles/theme.css';

// 6. Deep Navy Theme Demo
import './styles/theme-demo.css';

// 7. Legacy (постепенно мигрируем)
import './App.css';
import './styles/main.css';
import './styles/components.css';
import './styles/responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
