import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('kora_live_matches_v2');
      localStorage.removeItem('kora_live_matches');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans dir-rtl text-right">
          <div className="max-w-md w-full bg-slate-900 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-500/30">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-black text-white">حدث خطأ غير متوقع أثناء عرض الصفحة</h2>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              قد يكون السبب بيانات مخزنة مؤقتاً غير متوافقة في متصفحك. اضغط على الزر أدناه لإعادة ضبط البيانات واستعادة الجدول الافتراضي المحدث.
            </p>

            {this.state.error && (
              <div className="p-3 bg-slate-950 rounded-xl text-[11px] text-red-400 font-mono text-left max-h-24 overflow-y-auto border border-slate-800">
                {this.state.error.message || 'Unknown error'}
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط البيانات واستعادة الموقع</span>
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
              >
                <Home className="w-3.5 h-3.5" />
                <span>تحديث الصفحة</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
