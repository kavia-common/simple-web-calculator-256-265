import React from 'react';
import './App.css';
import Calculator from './components/Calculator';

// PUBLIC_INTERFACE
function App() {
  /**
   * App root component for the calculator. Handles theme CSS and loads Calculator UI.
   */
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--calc-bg)' }}>
      <Calculator />
    </div>
  );
}

export default App;
