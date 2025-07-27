// app/explore.tsx
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@contexts/AuthContext';
import { mockUsers } from '@mock/users';
import { MockUser } from '@types/User';
import { FlatList, Image, Text, View } from 'react-native';

const ExploreScreen = () => {
  const { user } = useAuth(); // ログインユーザー情報
  const currentGender = user?.gender ?? 'male'; // 未定義なら仮に'male'

  const filteredUsers = mockUsers.filter(
    (u: MockUser) => u.gender !== currentGender
  );

  const renderItem = ({ item }: { item: MockUser }) => (
    <View className="bg-white rounded-2xl p-4 shadow mb-4 flex-row items-center">
      <Image
        source={{ uri: item.imageUrl }}
        className="w-16 h-16 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold">
          {item.name}（{item.age}歳）
        </Text>
        <Text className="text-sm text-gray-500">
          {item.location}・{item.isOnline ? 'オンライン' : 'オフライン'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </ScreenWrapper>
  );
};

export default ExploreScreen;
