import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Item {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  size: string;
  condition: string;
  points: number;
  tags: string[];
  type: 'swap' | 'donate';
  status: 'available' | 'pending' | 'swapped';
  uploader: {
    id: string;
    name: string;
    avatar: string;
  };
  uploadedAt: string;
  views: number;
  likes: number;
  isLiked: boolean;
}

interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'uploader' | 'uploadedAt' | 'views' | 'likes' | 'isLiked'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  likeItem: (id: string) => void;
  unlikeItem: (id: string) => void;
  getUserItems: (userId: string) => Item[];
  getItemById: (id: string) => Item | undefined;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useAuth();

  const addItem = (itemData: Omit<Item, 'id' | 'uploader' | 'uploadedAt' | 'views' | 'likes' | 'isLiked'>) => {
    if (!user) return;

    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(), // Simple ID generation
      uploader: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      uploadedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      isLiked: false
    };

    setItems(prevItems => [newItem, ...prevItems]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const likeItem = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, likes: item.likes + 1, isLiked: true }
          : item
      )
    );
  };

  const unlikeItem = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, likes: Math.max(0, item.likes - 1), isLiked: false }
          : item
      )
    );
  };

  const getUserItems = (userId: string) => {
    return items.filter(item => item.uploader.id === userId);
  };

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  return (
    <ItemsContext.Provider value={{
      items,
      addItem,
      updateItem,
      deleteItem,
      likeItem,
      unlikeItem,
      getUserItems,
      getItemById
    }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
} 