import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        // Update state to trigger fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        this.setState({ error, errorInfo });
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI with a friendly design
            return (
                <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 text-gray-800">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                        <p className="text-lg mb-4">We are sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
                        <button
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </button>
                    </div>
                    <div className="mt-4">
                        <details className="text-sm text-gray-600">
                            <summary className="cursor-pointer">Click for error details</summary>
                            <p className="mt-2">{this.state.error?.toString()}</p>
                            <pre className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
