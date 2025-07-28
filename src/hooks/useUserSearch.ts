import { users } from '@mock/exploreUserMock';
import { useMemo, useState } from 'react';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

export const useUserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 検索フィルタリング
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.location.toLowerCase().includes(query) ||
      user.age.toString().includes(query)
    );
  }, [searchQuery]);

  const hasSearchResults = filteredUsers.length > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;

  return {
    searchQuery,
    setSearchQuery,
    filteredUsers,
    hasSearchResults,
    hasSearchQuery,
  };
}; 
