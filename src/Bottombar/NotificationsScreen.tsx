import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { collection, onSnapshot, query, where, addDoc, getDocs } from "firebase/firestore";

import LottieView from "lottie-react-native";
import animationData from "../Compenents/Assets/Animation - 1709403538718.json"; // Your animation file
import animationData2 from "../Compenents/Assets/loading.json"; // Loading animation file
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import { useNavigation } from "@react-navigation/native";
import MainLayout from "../Components/MainLayout";
import { FIREBASE_DB } from "../Firebase";





const { width, height } = Dimensions.get("window");
const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cruises, setCruises] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Set up real-time listener for the `Cruise` collection
    const unsubscribeCruise = onSnapshot(
      collection(FIREBASE_DB, "Cruise"),
      (snapshot) => {
        const cruiseData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCruises(cruiseData);
        
        // After fetching new cruises, check for new ones and create notifications
        cruiseData.forEach((cruise) => {
          createNotificationIfNeeded(cruise);
        });
      }
    );

    // Set up real-time listener for the `Notifications` collection
    const unsubscribeNotification = onSnapshot(
      collection(FIREBASE_DB, "Notifications"),
      (snapshot) => {
        const notificationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
        setLoading(false);
      }
    );

    // Cleanup listeners on unmount
    return () => {
      unsubscribeCruise();
      unsubscribeNotification();
    };
  }, []); // Empty dependency array to run this effect only once

  // Function to create notification in the `Notifications` collection
  const createNotificationIfNeeded = async (cruise) => {
    try {
      // Check if a notification for this cruise already exists
      const notificationsRef = collection(FIREBASE_DB, "Notifications");
      const q = query(
        notificationsRef,
        where("cruiseId", "==", cruise.id) // Check if notification already exists for this cruise
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // If no notification exists for this cruise, create a new notification
        const notification = {
          message: `New cruise added: ${cruise.Name}`,
          timestamp: new Date(),
          cruiseId: cruise.id, // Store cruise ID to prevent duplicates
        };
        await addDoc(collection(FIREBASE_DB, "Notifications"), notification);
        console.log("Notification added for cruise:", cruise.Name);
      } else {
        console.log("Notification already exists for this cruise:", cruise.Name);
      }
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  // Helper function to safely format the timestamp
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return "Unknown date"; // If timestamp is missing or invalid
  };




  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
  
  };


  return (
    <MainLayout refreshing={refreshing} onRefresh={onRefresh}>
    
     
      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            style={styles.loadingAnimation}
            source={animationData2}
            autoPlay
            loop
          />
        </View>
      ) : notifications.length === 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <LottieView
            style={{
              width: 200,
              height: 200,
            }}
            source={animationData}
            autoPlay
            loop
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationContainer}>
              <Text style={styles.notificationText}>{notification.message}</Text>
              <Text style={styles.timestamp}>
                {formatTimestamp(notification.timestamp)}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
   
    </MainLayout>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  scrollViewContent: {
    marginTop: 10,
  },
  notificationContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  Container1: {
    height: height * 0.18,

    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
});
