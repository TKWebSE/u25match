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

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isVisible?: boolean;
  onToggle?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClose?: () => void;
  autoFocus?: boolean;
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const expandAnim = React.useRef(new Animated.Value(0)).current;
  const textInputRef = React.useRef<TextInput>(null);

  // 外部からの制御に対応
  React.useEffect(() => {
    if (isVisible && !isExpanded) {
      setIsExpanded(true);
      Animated.timing(expandAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        // アニメーション完了後にフォーカス
        if (autoFocus && textInputRef.current) {
          setTimeout(() => {
            textInputRef.current?.focus();
          }, 100);
        }
      });
    } else if (!isVisible && isExpanded) {
      Animated.timing(expandAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setIsExpanded(false);
        setSearchQuery('');
        onSearch('');
      });
    }
  }, [isVisible, isExpanded, expandAnim, onSearch, autoFocus]);

  const handleSearchIconPress = () => {
    if (onToggle) {
      onToggle();
    } else {
      // フォールバック処理
      if (isExpanded) {
        // 検索バーを閉じる
        Animated.timing(expandAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setIsExpanded(false);
          setSearchQuery('');
          onSearch('');
        });
      } else {
        // 検索バーを開く
        setIsExpanded(true);
        Animated.timing(expandAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
    // フォーカスを外して初期状態に戻す
    textInputRef.current?.blur();
    // 外部の状態も更新
    if (onClose) {
      onClose();
    }
    // 検索バーを閉じる
    Animated.timing(expandAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setIsExpanded(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* 検索アイコン */}
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={handleSearchIconPress}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name={isExpanded ? "close" : "search"}
          size={24}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      {/* 検索バー */}
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
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus && isExpanded}
          returnKeyType="search"
        />

        {searchQuery.length > 0 && (
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
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
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default SearchBar;
