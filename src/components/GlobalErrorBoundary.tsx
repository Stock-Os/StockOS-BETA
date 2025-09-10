import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class GlobalErrorBoundary extends React.Component<any, {error?: Error}> {
  state = { error: undefined as Error | undefined };
  
  static getDerivedStateFromError(error: Error) { 
    return { error }; 
  }
  
  componentDidCatch(error: Error, info: any) { 
    console.error('GlobalErrorBoundary', error, info); 
  }
  
  render() {
    if (!this.state.error) return this.props.children;
    
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>Une erreur est survenue</Text>
        <Text style={styles.msg}>{String(this.state.error.message || this.state.error)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1, 
    backgroundColor: '#000', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 24
  },
  title: {
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 8
  },
  msg: {
    color: '#ccc', 
    fontSize: 14, 
    textAlign: 'center'
  }
});