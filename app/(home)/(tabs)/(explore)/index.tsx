// app/ExploreScreen.tsx など
import UserCard from '@components/UserCard';
import { users } from '@mock/exploreUserMock';
import React from 'react';
import { ScrollView } from 'react-native';

export default function ExploreScreen() {

  return (
    <ScrollView className="p-4">
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
    </ScrollView>
  );
}
