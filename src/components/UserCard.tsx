// src/components/UserCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
};

export default function UserCard({ name, age, location, imageUrl, isOnline }: Props) {
  return (
    <View className="bg-white rounded-2xl shadow-md mb-4 flex-row items-center p-4">
      <View className="relative mr-4">
        <Image
          source={{ uri: imageUrl }}
          className="w-20 h-20 rounded-full"
        />
        {isOnline && (
          <View className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">
          {name} <Text className="text-gray-500">{age}</Text>
        </Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-sharp" size={14} color="#999" />
          <Text className="ml-1 text-sm text-gray-500">{location}</Text>
        </View>
      </View>
    </View>
  );
}
