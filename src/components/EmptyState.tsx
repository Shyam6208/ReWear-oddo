import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  className?: string;
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-icon">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            action.variant === 'secondary'
              ? 'btn-secondary'
              : 'btn-primary'
          }`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Common empty states
export function NoItemsEmptyState({ onAddItem }: { onAddItem: () => void }) {
  return (
    <EmptyState
      icon={require('lucide-react').Package}
      title="No items yet"
      description="Start by adding your first item to the community"
      action={{
        label: 'Add Your First Item',
        onClick: onAddItem,
        variant: 'primary'
      }}
    />
  );
}

export function NoWishlistItemsEmptyState({ onBrowseStore }: { onBrowseStore: () => void }) {
  return (
    <EmptyState
      icon={require('lucide-react').Heart}
      title="Your wishlist is empty"
      description="Browse the store to find items you'd like to add to your wishlist"
      action={{
        label: 'Browse Store',
        onClick: onBrowseStore,
        variant: 'primary'
      }}
    />
  );
}

export function NoSearchResultsEmptyState({ onClearSearch }: { onClearSearch: () => void }) {
  return (
    <EmptyState
      icon={require('lucide-react').Search}
      title="No results found"
      description="Try adjusting your search criteria or browse all items"
      action={{
        label: 'Clear Search',
        onClick: onClearSearch,
        variant: 'secondary'
      }}
    />
  );
} 