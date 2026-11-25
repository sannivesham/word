import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DC Word Doc ErrorBoundary caught error]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400 mb-4">
            <AlertOctagon className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Something unexpected occurred
          </h2>
          <p className="mt-1.5 max-w-md text-xs text-slate-500 dark:text-slate-400">
            {this.state.error?.message ||
              'An unexpected error occurred while rendering this component. Your documents in local storage remain safe.'}
          </p>
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw className="h-4 w-4" />}
              onClick={this.handleReset}
            >
              Try Again
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
