import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Colors/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  documentId,
  getDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileComponent = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      // Retrieve UID from AsyncStorage
      const storedUID = await AsyncStorage.getItem("uid");
      if (!storedUID) {
        console.log("UID not found in AsyncStorage");
        // Handle the case where UID is not available
        return;
      }

      const userRef = doc(FIREBASE_DB, "UserProfile", storedUID);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        // Assuming setData is a state updater function
        setData(userData);
        // console.log(userData, "This is userdata");
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  useFocusEffect(() => {
    getData();
  });

  function checkAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch user data
        const userData = await getData();
        // console.log("User data:", data);
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });
  }

  // Call the checkAuthState function when the app starts

  const auth = FIREBASE_AUTH;
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <View>
        <>
          {data.profileimage ? (
            <Image
              source={{ uri: data.profileimage }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 5,
                borderColor: "#37308D",
                borderWidth: 1,
              }}
            />
          ) : (
            <Image
              source={require("../Assets/profilepic.png")}
              style={{
                width: 70,
                height: 70,
                borderRadius: 5,
                borderColor: "#37308D",
                borderWidth: 1,
              }}
            />
          )}
        </>
      </View>
      <TouchableOpacity
        style={{ paddingHorizontal: 10 }}
        onPress={() => {
          navigation.navigate("ProfileScreen");
        }}
      >
        <View>
          <Text style={{ color: Colors.UniLInkPrimary, fontFamily: "Roboto" }}>
            Welcome
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: Colors.UniLInkPrimary,
            }}
          >
            {data.displayname}
          </Text>
          <Image
            source={require("../Assets/arrow.png")}
            style={{ tintColor: Colors.UniLInkPrimary }}
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({});
