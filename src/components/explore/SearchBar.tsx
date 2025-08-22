import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// 検索バーのプロパティ型定義
interface SearchBarProps {
  searchQuery: string;        // 検索クエリの文字列
  onSearchChange: (query: string) => void;  // 検索クエリが変更された時のコールバック
  placeholder?: string;       // プレースホルダーテキスト（オプション）
}

// 検索バーコンポーネント
const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "検索"  // デフォルトのプレースホルダー
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={onSearchChange}
        style={styles.input}
        clearButtonMode="while-editing"  // 編集中にクリアボタンを表示
      />
    </View>
  );
};

// スタイル定義
const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,  // 左右のパディング
  },
  input: {
    backgroundColor: '#fff',  // 背景色（白）
    padding: 16,             // 内側の余白
    borderRadius: 12,         // 角丸の半径
    fontSize: 16,            // フォントサイズ
    marginBottom: 16,        // 下のマージン
    borderWidth: 1,          // ボーダーの太さ
    borderColor: '#ddd',     // ボーダーの色
    width: '50%',            // 幅（画面の50%）
    alignSelf: 'center',     // 中央揃え
  },
});

export default SearchBar; 
