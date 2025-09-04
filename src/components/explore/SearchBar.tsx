import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@styles/globalStyles';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

/**
 * 検索バーコンポーネント
 * 
 * アニメーション付きの検索入力フィールドを提供します。
 * 虫眼鏡アイコンをタップすると検索バーが展開し、
 * テキスト入力中はクリアボタン（バツ）が表示されます。
 * 
 * 主な機能：
 * - 検索バーの展開/収縮アニメーション
 * - テキスト入力とリアルタイム検索
 * - クリアボタンによる入力内容の削除
 * - 親コンポーネントからの開閉制御
 * - フォーカス外し時の自動閉じ
 */
interface SearchBarProps {
  onSearch: (query: string) => void; // 検索クエリが変更された時のコールバック
  placeholder?: string; // プレースホルダーテキスト
  isVisible?: boolean; // 親コンポーネントからの開閉制御
  onToggle?: () => void; // 検索アイコンのタップ時のコールバック
  onFocus?: () => void; // テキストフィールドにフォーカスが当たった時のコールバック
  onBlur?: () => void; // テキストフィールドからフォーカスが外れた時のコールバック
  onClose?: () => void; // 検索バーが閉じられた時のコールバック
  autoFocus?: boolean; // 検索バー展開時に自動フォーカスするかどうか
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "ユーザーを検索...",
  isVisible = false,
  onToggle,
  onFocus,
  onBlur,
  onClose,
  autoFocus = false
}) => {
  // 状態管理
  const [isExpanded, setIsExpanded] = useState(false); // 検索バーが展開されているか
  const [searchQuery, setSearchQuery] = useState(''); // 検索クエリ

  // アニメーションとリファレンス
  const expandAnim = React.useRef(new Animated.Value(0)).current; // 展開アニメーション（0: 閉じる, 1: 開く）
  const textInputRef = React.useRef<TextInput>(null); // テキスト入力フィールドのリファレンス

  // 検索バーを閉じる（アニメーション付き）
  const closeSearchBar = () => {
    Animated.timing(expandAnim, {
      toValue: 0, // 0にアニメーション（閉じる）
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      // アニメーション完了後に状態を更新
      requestAnimationFrame(() => {
        setIsExpanded(false);
        setSearchQuery(''); // テキストをクリア（バツボタンも消える）
        onSearch(''); // 親コンポーネントに空文字を通知
        if (onClose) onClose(); // 閉じたことを親に通知
      });
    });
  };

  // 検索バーを開く（アニメーション付き）
  const openSearchBar = () => {
    setIsExpanded(true);
    Animated.timing(expandAnim, {
      toValue: 1, // 1にアニメーション（開く）
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      // アニメーション完了後に自動フォーカス
      if (autoFocus && textInputRef.current) {
        setTimeout(() => textInputRef.current?.focus(), 100);
      }
    });
  };

  // 親コンポーネントからの開閉制御（isVisibleプロパティの変更を監視）
  React.useEffect(() => {
    if (isVisible && !isExpanded) {
      openSearchBar();
    } else if (!isVisible && isExpanded) {
      closeSearchBar();
    }
  }, [isVisible]);

  // 検索アイコン（虫眼鏡）のタップ処理
  const handleSearchIconPress = () => {
    openSearchBar(); // 検索バーを開く
  };

  // テキストフィールドからフォーカスが外れた時の処理
  const handleBlur = () => {
    if (isExpanded) {
      closeSearchBar(); // バツボタン押下時と同じ処理
    }
    if (onBlur) onBlur(); // 外部のコールバックも呼び出し
  };

  // クリアボタン（バツ）のタップ処理
  const handleClear = () => {
    closeSearchBar(); // フォーカス外し時と同じ処理
  };

  return (
    <View style={styles.container}>
      {/* 検索アイコン（虫眼鏡） */}
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={handleSearchIconPress}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name={isExpanded ? "close" : "search"}
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>

      {/* アニメーション付き検索バー */}
      <Animated.View
        style={[
          styles.searchBar,
          {
            width: expandAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, screenWidth - 80], // アイコン分を引く
            }),
            opacity: expandAnim,
          },
        ]}
      >
        {/* テキスト入力フィールド */}
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            onSearch(text);
          }}
          onFocus={onFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus && isExpanded}
          returnKeyType="search"
        />

        {/* クリアボタン（テキストがある時のみ表示） */}
        {searchQuery.length > 0 && isExpanded && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="clear"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // メインコンテナ（右寄せで配置）
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  // 検索アイコン（虫眼鏡）のスタイル
  searchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // 検索バー（アニメーション付き）のスタイル
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // テキスト入力フィールドのスタイル
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 4,
  },
  // クリアボタン（バツ）のスタイル
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default SearchBar;
