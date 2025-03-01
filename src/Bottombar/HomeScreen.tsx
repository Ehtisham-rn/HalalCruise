import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Compenents/Colors/Colors";
import { useFonts } from "expo-font";
import { Dimensions } from "react-native";
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import { useNavigation } from "@react-navigation/native";
import QuoteComponent from '../Compenents/Quote/QuoteComponent';

import CustomHeader from "../Components/CustomHeader";
import MainLayout from '../Components/MainLayout';
import { CardStyles } from '../Compenents/Styles/Styles';

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const courses = [
    {
      name: "Destinations",
      image: require("../Compenents/Assets/destinations.png"),
    },
    {
      name: "Cruise Ships",
      image: require("../Compenents/Assets/ship.png"),
    },
    {
      name: "Travel Dates",
      image: require("../Compenents/Assets/article.png"),
    },
  ];

  const onRefresh = () => {
    // Refresh logic if needed
  };

  return (
    <MainLayout refreshing={refreshing} onRefresh={onRefresh}>
      <CustomHeader />
      
      
      <Image
        source={require('../Compenents/Assets/cruise-party.png')}
        style={styles.headerImage}
        resizeMode="cover"
      />
      
      <View style={styles.sectionContainer}>
        {courses.map((item, index) => (
          <View key={index} style={styles.buttonContainer}>
            <TouchableOpacity
              style={CardStyles.serviceButton}
              onPress={() => {
                if (item.name === "Destinations") {
                  navigation.navigate("DestinationsScreen");
                } else if (item.name === "Cruise Ships") {
                  navigation.navigate("CruiseShipsScreen");
                } else if (item.name === "Travel Dates") {
                  navigation.navigate("TravelDatesScreen");
                }
              }}
            >
              <Text style={CardStyles.serviceButtonText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingTop: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.37, // 30% of screen height
    resizeMode: 'cover',
  },
  quoteContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.Primary,
    marginBottom: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: Colors.HomeBox6,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Black,
    textAlign: 'center',
  },
});

export default HomeScreen;
