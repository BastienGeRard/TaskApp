import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Auth');
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Home Screen!</Text>
      <Button title="Go to Tasks" onPress={() => navigation.navigate('TaskScreen')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
