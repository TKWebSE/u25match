// app/components/ScreenWrapper.tsx
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export default function ScreenWrapper({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, style]} // デフォルト＋渡されたstyle
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
