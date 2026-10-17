import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../constants/theme';

export default function NeonCard({ children, accent = 'cyan', style, contentStyle, ...props }) {
  const neon = accent === 'green' ? theme.colors.green : theme.colors.cyan;
  const glow = accent === 'green' ? theme.glow.green : theme.glow.cyan;
  return <View {...props} style={[styles.card, { borderColor: neon }, glow, style]}><View style={[styles.content, contentStyle]}>{children}</View></View>;
}
const styles = StyleSheet.create({ card: { backgroundColor: theme.colors.surface, borderWidth: 1, borderRadius: theme.radius.lg, overflow: 'hidden' }, content: { padding: theme.spacing.md } });
