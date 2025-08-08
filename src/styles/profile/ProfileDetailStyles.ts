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
    marginHorizontal: 24, // 16から24に変更して左右の隙間を増やす
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
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  verificationMark: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    borderWidth: 2,
  },
  verifiedMark: {
    color: '#38A169', // 緑色のチェックマーク
    borderColor: '#38A169', // 緑色の枠線
  },
  unverifiedMark: {
    color: '#9CA3AF', // グレーのチェックマーク
    borderColor: '#9CA3AF', // グレーの枠線
  },
  age: {
    fontSize: 18,
    color: '#718096',
    fontWeight: '500',
  },
  location: {
    fontSize: 18, // 16から18に変更
    color: '#718096',
    fontWeight: '600', // 500から600に変更
    marginTop: 4,
  },
  onlineStatus: {
    fontSize: 14,
    color: '#38a169',
    fontWeight: '500',
    marginTop: 8,
  },
  online: {
    fontSize: 16, // 14から16に変更
    color: '#38a169', // モダンな緑色
    marginTop: 4,
    fontWeight: '600', // 500から600に変更
  },
  likes: {
    fontSize: 16, // 14から16に変更
    color: '#718096',
    marginTop: 8,
    fontWeight: '600', // 500から600に変更
  },
  bioContainer: {
    marginTop: 16,
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 24, // 16から24に変更して左右の隙間を増やす
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
    marginHorizontal: 24, // 16から24に変更して左右の隙間を増やす
    borderRadius: 16,
    paddingTop: 20,
    marginBottom: 100, // いいねボタンが入るくらいの隙間を追加
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
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 16,
    paddingHorizontal: 16,
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

  // 編集ボタン
  editButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  // 編集ボタンテキスト
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // タグ表示用スタイル
  tagsSection: {
    marginBottom: 16, // 24から16に変更して詳細情報との間隔を詰める
    marginHorizontal: 24,
    marginTop: 24, // 自己紹介セクションとの間隔を追加
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  tagsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 12,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  tagImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  tagText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d3748',
    flex: 1,
  },

  // 編集画面用のスタイル
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  saveButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 16,
  },

  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
