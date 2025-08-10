import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface SectionTitleProps {
  title: string;
  icon?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => {
  return (
    <Text style={styles.sectionTitle}>
      {icon && `${icon} `}
      {title}
      {icon && ` ${icon}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
