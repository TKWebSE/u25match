// app/components/ScreenWrapper.tsx
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

/**
 * 画面全体をラップする共通コンポーネント
 * キーボード回避とスタイリングを提供
 */
export default function ScreenWrapper({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, style]} // デフォルトスタイル＋カスタムスタイル
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // iOSではキーボード回避
    >
      {/* キーボードをタップで閉じる機能（現在は無効化） */}
      {/* <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}> */}
      {children}
      {/* </Pressable> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    padding: 24,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center'
  },
});
