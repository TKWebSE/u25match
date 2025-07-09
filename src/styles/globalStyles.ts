// style/index.js
import { StyleSheet } from 'react-native';

const colors = {
  primary: '#4F46E5',
  background: '#fff',
  text: '#111',
  error: '#EF4444',
  success: '#10B981',
  border: '#E5E7EB',
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: colors.error,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
});

export { colors, commonStyles };
