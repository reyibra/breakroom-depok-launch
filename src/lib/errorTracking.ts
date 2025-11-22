/**
 * Error Tracking Utility
 * 
 * Centralized error logging and reporting
 * Ready for integration with services like Sentry, LogRocket, or custom endpoints
 */

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  level?: 'error' | 'warning' | 'info';
  metadata?: Record<string, any>;
}

class ErrorTracker {
  private isProduction = import.meta.env.PROD;
  private isDevelopment = import.meta.env.DEV;

  /**
   * Log error to console and tracking service
   */
  captureException(error: Error, context?: ErrorContext) {
    // Always log to console in development
    if (this.isDevelopment) {
      console.error('🚨 Error Tracked:', {
        error,
        context,
        timestamp: new Date().toISOString(),
      });
    }

    // In production, send to error tracking service
    if (this.isProduction) {
      this.sendToTrackingService(error, context);
    }
  }

  /**
   * Log warning (non-critical errors)
   */
  captureWarning(message: string, context?: ErrorContext) {
    if (this.isDevelopment) {
      console.warn('⚠️ Warning:', message, context);
    }

    if (this.isProduction) {
      this.sendToTrackingService(new Error(message), {
        ...context,
        level: 'warning',
      });
    }
  }

  /**
   * Log info message (for tracking user actions)
   */
  captureMessage(message: string, context?: ErrorContext) {
    if (this.isDevelopment) {
      console.info('ℹ️ Info:', message, context);
    }

    if (this.isProduction) {
      this.sendToTrackingService(new Error(message), {
        ...context,
        level: 'info',
      });
    }
  }

  /**
   * Send error to tracking service
   * 
   * TODO: Integrate with your preferred service:
   * - Sentry: Sentry.captureException(error, { extra: context })
   * - LogRocket: LogRocket.captureException(error, { extra: context })
   * - Custom endpoint: fetch('/api/errors', { method: 'POST', body: ... })
   */
  private sendToTrackingService(error: Error, context?: ErrorContext) {
    // Placeholder for error tracking service integration
    // Example with Sentry:
    /*
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: context,
        tags: {
          component: context?.component,
          action: context?.action,
        },
      });
    }
    */

    // Example with custom endpoint:
    /*
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
    */

    // For now, just log that tracking would happen
    console.log('📊 [Production] Would send to tracking service:', {
      error: error.message,
      context,
    });
  }

  /**
   * Set user context for error tracking
   */
  setUserContext(userId: string, email?: string) {
    if (this.isProduction) {
      // Example with Sentry:
      // window.Sentry?.setUser({ id: userId, email });
      
      console.log('👤 User context set:', { userId, email });
    }
  }

  /**
   * Clear user context (on logout)
   */
  clearUserContext() {
    if (this.isProduction) {
      // Example with Sentry:
      // window.Sentry?.setUser(null);
      
      console.log('👤 User context cleared');
    }
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();

// Convenience functions
export const captureException = (error: Error, context?: ErrorContext) => 
  errorTracker.captureException(error, context);

export const captureWarning = (message: string, context?: ErrorContext) => 
  errorTracker.captureWarning(message, context);

export const captureMessage = (message: string, context?: ErrorContext) => 
  errorTracker.captureMessage(message, context);
