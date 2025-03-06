import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Compenents/Colors/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import {
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  documentId,
  getDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainLayout from "../Components/MainLayout";
import { FIREBASE_AUTH, FIREBASE_DB } from "../Firebase";


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const auth = FIREBASE_AUTH;

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
        console.log(userData, "This is userdata");
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



  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
  
  };
  return (
    <MainLayout refreshing={refreshing} onRefresh={onRefresh}>
    <View style={styles.maincontainer}>
      <View style={styles.container1}>
        <TouchableOpacity>
          {data.profileimage ? (
            <Image
              source={{ uri: data.profileimage }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 13,
                borderColor: "#37308D",
                borderWidth: 1,
              }}
            />
          ) : (
            <Image
              source={require("../Compenents/Assets/profilepic.png")}
              style={{
                width: 110,
                height: 110,
                borderRadius: 13,
                borderColor: "#37308D",
                borderWidth: 1,
              }}
            />
          )}
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 22,
            color: Colors.Primary,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          {data.displayname}
        </Text>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.container2Text}
          onPress={() => {
            navigation.navigate("HistoryScreen");
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.container2Box}>
              <MaterialCommunityIcons
                name="progress-download"
                size={24}
                color="white"
                // style={{
                //   width: 25,
                //   height: 25,
                // }}
              />
            </View>

            <Text
              style={{ paddingLeft: 20, fontSize: 20, color: Colors.Black }}
            >
              Favourites
            </Text>
          </View>
          <Image source={require("../Compenents/Assets/arrow.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container2Text}
          onPress={() => {
            navigation.navigate("Request Document");
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.container2Box}>
              <Entypo name="documents" size={24} color="white" />
            </View>

            <Text
              style={{ paddingLeft: 20, fontSize: 20, color: Colors.Black }}
            >
              Request Information
            </Text>
          </View>
          <Image source={require("../Compenents/Assets/arrow.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container2Text}
          onPress={() => {
            navigation.navigate("Report a problem");
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.container2Box}>
              <MaterialIcons name="bug-report" size={24} color="white" />
            </View>

            <Text
              style={{ paddingLeft: 20, fontSize: 20, color: Colors.Black }}
            >
              Report Problem
            </Text>
          </View>
          <Image source={require("../Compenents/Assets/arrow.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container2Text}
          onPress={() => {
            navigation.navigate("About");
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.container2Box}>
              <Feather name="info" size={24} color="white" />
            </View>

            <Text
              style={{ paddingLeft: 20, fontSize: 20, color: Colors.Black }}
            >
              About Us
            </Text>
          </View>
          <Image source={require("../Compenents/Assets/arrow.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container2Text}   onPress={() => {
            navigation.navigate("PrivacyPolicy");
          }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.container2Box}>
              <MaterialIcons name="privacy-tip" size={24} color="white" />
            </View>

            <Text
              style={{ paddingLeft: 20, fontSize: 20, color: Colors.Black }}
            >
              Privacy Policy
            </Text>
          </View>
          <Image source={require("../Compenents/Assets/arrow.png")}></Image>
        </TouchableOpacity>
      
        <TouchableOpacity
          style={styles.container2Text}
          onPress={async () => {
            try {
              
              await AsyncStorage.clear();
              
              await FIREBASE_AUTH.signOut();
              
              navigation.navigate("Login");
            } catch (error) {
              console.error("Error signing out:", error.message);
            }
          }}
        >
          

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.container2Box}>
             
              <AntDesign name="logout" size={24} color="white" />
            </View>

            <Text
              style={{ paddingLeft: 20, fontSize: 20, color: Colors.Black }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </MainLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container1: {
    flex: 0.3,

    alignItems: "center",
    justifyContent: "flex-end",
  },
  container2: {
    flex: 0.7,

    width: "90%",
    marginHorizontal: "5%",
    justifyContent: "center",
  },
  container2Text: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  container2Box: {
    height: 45,
    width: 45,
    backgroundColor: Colors.Primary,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
