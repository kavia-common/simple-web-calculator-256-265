/**
 * Entry point for the calculator app - mounts React root with professional setup.
 */
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Inline ErrorBoundary: Only for root-level errors, does not alter App.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error };
  }
  componentDidCatch(error, info) {
    // Log error globally if needed
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          color: "#e53935", background: "#fff3f3", padding: "2rem", borderRadius: "0.8rem", margin: "2rem auto", textAlign: "center"
        }}>
          <h2>Something went wrong.</h2>
          <pre style={{ fontSize: '1rem', marginTop: '1.4rem', color: '#e53935' }}>
            {this.state.errorInfo?.toString() || "Unknown error."}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  // eslint-disable-next-line no-console
  if (typeof window !== "undefined" && window && window.console) {
    console.error('Root element with id "root" not found. App will not render.');
  }
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
