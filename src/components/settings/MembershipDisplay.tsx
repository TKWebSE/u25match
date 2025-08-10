import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 会員種別表示コンポーネントのプロパティ
 */
interface MembershipDisplayProps {
  /** 会員種別: 'premium' | 'free' */
  membershipType: 'premium' | 'free';
  /** アップグレードボタンがタップされた時のコールバック関数 */
  onUpgradePress?: () => void;
}

/**
 * 会員種別表示コンポーネント
 * 
 * ユーザーの現在の会員種別（プレミアム/無料）を表示し、
 * 無料会員の場合はプレミアム会員へのアップグレードボタンを表示します。
 * 
 * @param membershipType - 会員種別（プレミアムまたは無料）
 * @param onUpgradePress - アップグレードボタンのタップハンドラー
 * @returns 会員種別表示のJSX要素
 */
export const MembershipDisplay: React.FC<MembershipDisplayProps> = ({
  membershipType,
  onUpgradePress
}) => {
  return (
    <TouchableOpacity
      style={styles.membershipContainer}
      activeOpacity={0.9}
      onPress={onUpgradePress}
    >
      {/* 会員種別バッジ - グラデーション背景でアイコンとテキストを表示 */}
      <LinearGradient
        colors={membershipType === 'premium'
          ? ['#FF6B35', '#F7931E', '#FFD700']  // プレミアム: オレンジ系グラデーション
          : ['#4F46E5', '#7C3AED', '#EC4899']  // 無料: 紫系グラデーション
        }
        style={styles.membershipBadge}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* 会員種別アイコン */}
        <Text style={styles.membershipIcon}>
          {membershipType === 'premium' ? '👑' : '🔒'}
        </Text>
        {/* 会員種別テキスト */}
        <Text style={styles.membershipText}>
          {membershipType === 'premium' ? 'プレミアム会員' : '無料会員'}
        </Text>
      </LinearGradient>

      {/* 会員情報セクション - 説明文とアップグレードボタン */}
      <View style={styles.membershipInfo}>
        {/* 会員種別の説明文 */}
        <Text style={styles.membershipDescription}>
          {membershipType === 'premium'
            ? '🚀月額プランでより多くの機能をお楽しみください'
            : '🚀プレミアム会員にアップグレードして機能を拡張'
          }
        </Text>

        {/* 無料会員の場合のみアップグレードボタンを表示 */}
        {membershipType === 'free' && (
          <View style={styles.upgradeButtonContainer}>
            {/* アップグレードボタンの内容は現在非表示 */}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

/**
 * コンポーネントのスタイル定義
 */
const styles = StyleSheet.create({
  // メインコンテナ - 会員種別表示全体のスタイル
  membershipContainer: {
    flexDirection: 'row',                    // 横並びレイアウト
    alignItems: 'flex-start',               // 上端揃え
    paddingVertical: 16,                    // 上下パディング
    paddingHorizontal: 24,                  // 左右パディング
    borderRadius: 24,                       // 角丸
    backgroundColor: 'rgba(255, 255, 255, 0.98)', // 半透明の白背景
    shadowColor: '#000',                    // シャドウ色
    shadowOffset: {                         // シャドウオフセット
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,                    // シャドウ透明度
    shadowRadius: 16,                       // シャドウぼかし
    elevation: 10,                          // Android用シャドウ
    borderWidth: 1,                         // ボーダー幅
    borderColor: 'rgba(255, 255, 255, 0.4)', // ボーダー色
  },

  // 会員種別バッジ - グラデーション背景のバッジスタイル
  membershipBadge: {
    flexDirection: 'row',                   // 横並びレイアウト
    alignItems: 'center',                   // 中央揃え
    paddingVertical: 14,                    // 上下パディング
    paddingHorizontal: 20,                  // 左右パディング
    borderRadius: 28,                       // 角丸
    marginRight: 20,                        // 右マージン
    shadowColor: '#000',                    // シャドウ色
    shadowOffset: {                         // シャドウオフセット
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,                     // シャドウ透明度
    shadowRadius: 12,                       // シャドウぼかし
    elevation: 12,                          // Android用シャドウ
    borderWidth: 2,                         // ボーダー幅
    borderColor: 'rgba(255, 255, 255, 0.5)', // ボーダー色
    minWidth: 130,                          // 最小幅
  },

  // 会員種別アイコン - 絵文字アイコンのスタイル
  membershipIcon: {
    fontSize: 24,                           // フォントサイズ
    marginRight: 12,                        // 右マージン
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // テキストシャドウ色
    textShadowOffset: { width: 0, height: 1 }, // テキストシャドウオフセット
    textShadowRadius: 3,                    // テキストシャドウぼかし
  },

  // 会員種別テキスト - バッジ内のテキストスタイル
  membershipText: {
    fontSize: 16,                           // フォントサイズ
    fontWeight: '800',                      // フォント太さ
    color: '#FFFFFF',                       // テキスト色（白）
    letterSpacing: 1,                       // 文字間隔
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // テキストシャドウ色
    textShadowOffset: { width: 0, height: 1 }, // テキストシャドウオフセット
    textShadowRadius: 3,                    // テキストシャドウぼかし
  },

  // 会員情報セクション - 説明文とボタンを含む右側の領域
  membershipInfo: {
    flex: 1,                                // 残りのスペースを占有
    justifyContent: 'space-between',        // 上下のスペースを均等に分配
  },

  // 会員種別説明文 - 会員種別の詳細説明テキスト
  membershipDescription: {
    fontSize: 18,                           // フォントサイズ
    color: '#374151',                       // テキスト色（グレー）
    lineHeight: 26,                         // 行間
    fontWeight: '500',                      // フォント太さ
    letterSpacing: 0.4,                     // 文字間隔
    marginBottom: 18,                       // 下部マージン
    textAlignVertical: 'center',            // 上下中央揃え
    textAlign: 'left',                      // 左揃え
  },

  // アップグレードボタンコンテナ - ボタンの外側のコンテナ
  upgradeButtonContainer: {
    alignSelf: 'flex-start',                // 左寄せ
    shadowColor: '#000',                    // シャドウ色
    shadowOffset: {                         // シャドウオフセット
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,                    // シャドウ透明度
    shadowRadius: 8,                        // シャドウぼかし
    elevation: 8,                           // Android用シャドウ
  },

  // アップグレードボタングラデーション - ボタンのグラデーション背景
  upgradeButtonGradient: {
    flexDirection: 'row',                   // 横並びレイアウト
    alignItems: 'center',                   // 中央揃え
    paddingVertical: 16,                    // 上下パディング
    paddingHorizontal: 28,                  // 左右パディング
    borderRadius: 35,                       // 角丸
    shadowColor: '#000',                    // シャドウ色
    shadowOffset: {                         // シャドウオフセット
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,                     // シャドウ透明度
    shadowRadius: 6,                        // シャドウぼかし
    elevation: 6,                           // Android用シャドウ
    borderWidth: 1,                         // ボーダー幅
    borderColor: 'rgba(255, 255, 255, 0.3)', // ボーダー色
    minWidth: 200,                          // 最小幅
  },

  // アップグレードボタンコンテンツ - ボタン内のテキスト部分
  upgradeButtonContent: {
    flex: 1,                                // 残りのスペースを占有
    alignItems: 'center',                   // 中央揃え
  },

  // アップグレードボタンテキスト - メインテキスト
  upgradeButtonText: {
    fontSize: 17,                           // フォントサイズ
    fontWeight: '800',                      // フォント太さ
    color: '#FFFFFF',                       // テキスト色（白）
    letterSpacing: 1.2,                     // 文字間隔
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // テキストシャドウ色
    textShadowOffset: { width: 0, height: 2 }, // テキストシャドウオフセット
    textShadowRadius: 4,                    // テキストシャドウぼかし
  },

  // アップグレードボタンサブテキスト - サブテキスト
  upgradeButtonSubtext: {
    fontSize: 12,                           // フォントサイズ
    fontWeight: '600',                      // フォント太さ
    color: 'rgba(255, 255, 255, 0.95)',   // テキスト色（半透明の白）
    letterSpacing: 0.6,                     // 文字間隔
    marginTop: 3,                           // 上部マージン
  },

  // アップグレードボタンアイコン - アイコン部分のコンテナ
  upgradeButtonIcon: {
    marginLeft: 16,                         // 左マージン
    marginRight: 6,                         // 右マージン
  },

  // アップグレードアイコン - 絵文字アイコン
  upgradeIcon: {
    fontSize: 22,                           // フォントサイズ
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // テキストシャドウ色
    textShadowOffset: { width: 0, height: 2 }, // テキストシャドウオフセット
    textShadowRadius: 4,                    // テキストシャドウぼかし
  },
});
