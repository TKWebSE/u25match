import { getPlatformValue } from '@utils/platform';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const ProfileDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // モダンな背景色
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  contentContainer: {
    // コンテンツ全体のスタイル
  },
  imageContainer: {
    width: '100%',
    height: getPlatformValue(700, width),
    overflow: 'hidden',
    marginHorizontal: 4,
    marginTop: 16, // 画像コンポーネントの上に隙間を追加
    // モダンなシャドウ効果
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  profileImage: {
    width: width - 8,
    height: getPlatformValue(700, width),
    resizeMode: 'contain',
    borderRadius: 16, // より丸みを帯びた角
  },
  header: {
    padding: 20,
    alignItems: 'center',
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    // モダンなシャドウ
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 4,
  },
  age: {
    fontSize: 18,
    color: '#718096',
    fontWeight: '500',
  },
  onlineStatus: {
    fontSize: 14,
    color: '#38a169',
    fontWeight: '500',
    marginTop: 8,
  },
  online: {
    fontSize: 14,
    color: '#38a169', // モダンな緑色
    marginTop: 4,
    fontWeight: '500',
  },
  likes: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
    fontWeight: '500',
  },
  bioContainer: {
    marginTop: 16,
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    // モダンなシャドウ
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
    fontWeight: '400',
  },
  detailsSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingTop: 20,
    marginBottom: 90, // いいねボタンが入るくらいの隙間を追加
    // モダンなシャドウ
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  detailLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: '600',
  },
  likeButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
}); 
