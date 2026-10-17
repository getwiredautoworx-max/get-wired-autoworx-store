import React from 'react';
import { SafeAreaView, StatusBar, Text, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import theme from './constants/theme';
import NeonCard from './components/NeonCard';
const STORE_URL = 'https://www.getwiredauto.co.za/';
export default function App() {
  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
    <View style={styles.header}><Text style={styles.brand}>GET WIRED <Text style={styles.accent}>AUTOWORX</Text></Text><Text style={styles.subtitle}>SOUND & SECURITY • AUTO ELECTRICAL</Text></View>
    <NeonCard accent="green" style={styles.statusCard} contentStyle={styles.statusContent}><Text style={styles.statusText}>ONLINE STORE</Text></NeonCard>
    <WebView source={{ uri: STORE_URL }} style={styles.webview} javaScriptEnabled domStorageEnabled originWhitelist={['https://*', 'http://*']} mixedContentMode="compatibility" startInLoadingState />
  </SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: theme.colors.background }, header: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10 }, brand: { color: theme.colors.text, fontSize: 21, fontWeight: '900', letterSpacing: 1 }, accent: { color: theme.colors.cyan }, subtitle: { color: theme.colors.muted, fontSize: 10, marginTop: 4, letterSpacing: 1 }, statusCard: { marginHorizontal: 12, marginBottom: 8, borderRadius: 10 }, statusContent: { paddingVertical: 7, paddingHorizontal: 12 }, statusText: { color: theme.colors.green, fontWeight: '700', fontSize: 11, letterSpacing: 1 }, webview: { flex: 1, backgroundColor: theme.colors.background } });
