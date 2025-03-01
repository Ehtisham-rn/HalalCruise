import React from 'react';
import { SafeAreaView, View, StatusBar, ImageBackground, StyleSheet, Platform, ScrollView, Text } from 'react-native';

import Colors from '../Compenents/Colors/Colors';
import Header from '../Compenents/Header/Header';
import RefreshComponent from './RefreshComponent';

const MainLayout = ({ children, refreshing, onRefresh }) => {
  return (
    <ImageBackground
      source={require('../Compenents/Assets/papereffect.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
          <Header />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          {/* <Text>Hello</Text> */}
        </View>
       
          {children}
        </ScrollView>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    backgroundColor: Colors.white, // Changed to white
   
  },
});

export default MainLayout; 