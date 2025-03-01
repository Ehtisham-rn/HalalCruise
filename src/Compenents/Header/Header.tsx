import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Colors/Colors';
import { TextStyles } from '../Styles/Styles';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Drawer Icon */}
      <TouchableOpacity
        // onPress={() => navigation.toggleDrawer()}
        style={styles.iconContainer}
      >
        {/* <Image
          source={require('../Assets/drawer.png')} // Add your drawer icon
          style={styles.icon}
        /> */}
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/logo1.png')} // Add your logo
          style={styles.logo}
        />
      </View>

      {/* Notification Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('NotificationScreen')}
        style={styles.iconContainer}
      >
        <Image
          source={require('../Assets/Frame.png')} // Add your notification icon
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders.light,
    paddingBottom:10,
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header; 