// app/home.tsx など
import UserCard from '@components/UserCard';
import React from 'react';
import { ScrollView } from 'react-native';

export default function ExploreScreen() {
  const users = [
    {
      name: 'さくら',
      age: 24,
      location: '東京',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      isOnline: true,
    },
    {
      name: 'たけし',
      age: 28,
      location: '大阪',
      imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      isOnline: false,
    },
  ];

  return (
    <ScrollView className="p-4">
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
    </ScrollView>
  );
}
