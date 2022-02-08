/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import firebase from 'react-native-firebase';

function App() {
  useEffect(() => {
    checkPermission();
    messagelistener();
  }, []);

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFCMToken();
    } else {
      requestPermission();
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      //User has rejected permission
    }
  }

  getFCMToken = async () => {
const fcmToken = await firebase.messaging().getToken();
console.log("fcmToken",fcmToken);
  }

  messagelistener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log("notification",notification);
      const {title, body} = notification;
      showAlert(title, body);
    })
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log("notificationOpen",notificationOpen);
      const {title, body } = notificationOpen.notification;
      showAlert(title, body);
    })
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if(notificationOpen){
      console.log("notificationOpen",notificationOpen);
      const {title, body} = notificationOpen.notification;
      showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log("message",message);
    });
  }
showAlert = (title, message) => {
Alert.alert(
  title,
  message,
  [
    {text: 'OK', onPress: () => console.log('Ok Pressed')}
  ],
  {cancelable: false},
)
}
  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
