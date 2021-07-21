import React from 'react';
import { View, StyleSheet } from 'react-native';

import NavigatorTravel from './src/navigation/Navigator';

const App = () => {
  return (
    <View style={styles.container}>
      <NavigatorTravel />
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})