// src/components/common/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(err) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error: err };
  }

  componentDidCatch(err, info) {
    // You could log to an external service here
    console.error('ErrorBoundary caught:', err, info);
  }

  handleReset = () => {
    // Reset and try rendering children again
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-md mx-auto text-center bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-6 text-gray-700">
            An unexpected error occurred. Try refreshing the page or contact support.
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
