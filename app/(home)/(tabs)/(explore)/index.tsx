// app/(explore)/index.tsx
import { getOnlineStatus } from '@utils/getOnlineStatus';
import React from 'react';
import { Image, Text, View } from 'react-native';

type UserProfile = {
  uid: string;
  displayName: string;
  age: number;
  gender: string;
  photoURL: string;
  lastActive: Date; // toDate() 済み Date
  location?: string;
};

export function UserCard({ user }: { user: UserProfile }) {
  const onlineStatus = getOnlineStatus(user.lastActive);

  return (
    <View className="mb-4 p-4 bg-white rounded-2xl shadow-md">
      <Image
        source={{ uri: user.photoURL }}
        style={{ width: '100%', height: 200, borderRadius: 16 }}
      />
      <Text className="mt-2 text-lg font-semibold">
        {user.displayName}（{user.age}歳）
      </Text>
      <Text className="text-gray-600">
        {user.location ?? '未設定'}・{onlineStatus}
      </Text>
    </View>
  );
}
