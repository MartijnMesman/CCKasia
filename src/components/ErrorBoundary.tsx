'use client'

import { Component, ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: string | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: string) => void
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show error UI
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error)
    console.error('Error info:', errorInfo)
    
    // Update state with error details
    this.setState({
      error,
      errorInfo: errorInfo.componentStack
    })

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack)
    }
  }

  handleRetry = () => {
    // Reset error state to retry rendering
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-red-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>

            {/* Error Title */}
            <h2 className="text-2xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h2>

            {/* Error Message */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              We encountered an unexpected error. Don't worry, this has been logged 
              and we're working to fix it. You can try refreshing the page or 
              clicking the retry button below.
            </p>

            {/* Error Details (Development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 text-left">
                <h3 className="text-red-400 font-semibold text-sm mb-2">
                  Error Details (Development):
                </h3>
                <p className="text-red-300 text-xs font-mono break-all mb-2">
                  {this.state.error.message}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-gray-400">
                    <summary className="cursor-pointer hover:text-gray-300 mb-1">
                      Component Stack
                    </summary>
                    <pre className="whitespace-pre-wrap text-xs overflow-auto max-h-32">
                      {this.state.errorInfo}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
              >
                Refresh Page
              </button>
            </div>

            {/* Help Text */}
            <p className="text-gray-500 text-sm mt-6">
              If the problem persists, please contact support or try again later.
            </p>
          </div>
        </div>
      )
    }

    // No error, render children normally
    return this.props.children
  }
}