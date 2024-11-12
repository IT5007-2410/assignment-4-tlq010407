/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Issue Tracker</Text>
            <IssueList />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 26,  // Increased font size for title
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
