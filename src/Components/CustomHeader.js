import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../Compenents/Colors/Colors';
import logo1 from '../Compenents/Assets/logo-white.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../Firebase';

const { width, height } = Dimensions.get('window');

const CustomHeader = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState('');

  const getData = async () => {
    try {
      const storedUID = await AsyncStorage.getItem("uid");
      if (!storedUID) {
        console.log("UID not found in AsyncStorage");
        setIsLoggedIn(false);
        return;
      }

      const userRef = doc(FIREBASE_DB, "UserProfile", storedUID);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setData(userData);
        setUserName(userData.displayname || '');
        setIsLoggedIn(true);
      } else {
        console.log("No such document");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
    }
  };

  useFocusEffect(() => {
    getData();
  });

  function checkAuthState() {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        await getData();
      } else {
        console.log("User is signed out");
        setIsLoggedIn(false);
        setUserName('');
      }
    });
  }

  React.useEffect(() => {
    checkAuthState();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Left Logo */}
      <Image source={logo1} style={styles.logo} />
      
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Left Text */}
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            Welcome to Halal Cruises
          </Text>
          <Text style={styles.subText}  ellipsizeMode="tail">
            {isLoggedIn ? `Hello, ${userName}!` : 'Tap here to Create or login Account'}
          </Text>
        </View>
        
        {/* Right Button */}
        <TouchableOpacity 
          style={[styles.button, isLoggedIn && styles.disabledButton]} 
          onPress={() => !isLoggedIn && navigation.navigate('Login')}
          disabled={isLoggedIn}
        >
          <Text style={styles.buttonText} numberOfLines={1}>
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
    padding: width * 0.05,
    paddingHorizontal: width * 0.08,
    height: height * 0.18,
    justifyContent: 'space-between',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: width * 0.05,
  },
  logo: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'column',
    maxWidth: '60%',
  },
  text: {
    color: Colors.text.light,
    fontSize: width * 0.035,
    fontWeight: '500',
    flexShrink: 1,
  },
  subText: {
    color: Colors.text.light,
    fontSize: width * 0.03,
    fontWeight: '400',
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.text.light,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.06,
    minWidth: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.Primary,
    fontSize: width * 0.035,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CustomHeader; 