import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Report to analytics if available
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: error.toString(),
          fatal: false
        });
      }
    } catch (reportError) {
      console.warn('Failed to report error to analytics:', reportError);
    }
  }

  handleReload = () => {
    // Reset error state
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    
    // Reload the page as last resort
    window.location.reload();
  };

  handleRetry = () => {
    // Just reset the error state to try rendering again
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-foreground mb-2">
                Упс! Что-то пошло не так
              </h1>
              <p className="text-muted-foreground text-sm">
                Произошла неожиданная ошибка. Попробуйте обновить приложение.
              </p>
            </div>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-3 bg-muted/20 rounded-lg border border-border text-left">
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer mb-2 font-medium">
                    Детали ошибки (только в разработке)
                  </summary>
                  <pre className="whitespace-pre-wrap break-all">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Попробовать снова
              </Button>
              
              <Button
                variant="outline"
                onClick={this.handleReload}
                className="flex items-center gap-2"
              >
                Перезагрузить
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Если проблема повторяется, попробуйте очистить кеш браузера
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}