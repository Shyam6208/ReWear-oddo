import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  onClose: () => void;
  duration?: number;
}

export default function Notification({ 
  type, 
  title, 
  message, 
  onClose, 
  duration = 5000 
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      default:
        return '';
    }
  };

  return (
    <div className={`notification ${getStyles()} animate-fadeIn`}>
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {title}
          </h4>
          {message && (
            <p className="text-sm text-gray-600">
              {message}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 ml-3">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors focus-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 