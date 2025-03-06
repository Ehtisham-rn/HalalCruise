import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Colors from "../Compenents/Colors/Colors";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  documentId,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import LottieView from "lottie-react-native";
import animationData from "../Compenents/Assets/uploaded.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainLayout from "../Components/MainLayout";
import { FIREBASE_AUTH, FIREBASE_DB } from "../Firebase";

const RequestDocs = () => {
  const auth = FIREBASE_AUTH;
  const [displayName, setDisplayName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const DataStore = async () => {
    // Remove the displayName parameter here
    try {
      if (!displayName) {
        Alert.alert("Please ensure all required fields are completed.");
        return; // Do not proceed if any field is empty
      }
      setLoading(true);
      const storedUID = await AsyncStorage.getItem("uid");
      if (!storedUID) {
        console.log("UID not found in AsyncStorage");
        // Handle the case where UID is not available
        return;
      }

      // Update the collection reference to "Notifications"
      const userRef = doc(FIREBASE_DB, "Notifications", storedUID);
      const docSnapshot = await getDoc(userRef);

      // Check if the document exists
      if (docSnapshot.exists()) {
        // Document exists, update Notifications field
        await updateDoc(userRef, {
          Notifications: arrayUnion(
            `Your Colleague is Requesting a Document: ${displayName}`
          ),
        });
      } else {
        // Document doesn't exist, create a new document
        await setDoc(userRef, {
          Notifications: [
            `Your Colleague is Requesting a Document: ${displayName}`,
          ],
        });
      }

      setModalVisible(true);
      setLoading(false);
      console.log("Data stored successfully");
    } catch (error) {
      Alert.alert("Error While Requesting Document:Try again");
      setLoading(false);
      console.error("Error storing data:", error);
    }
  };
  return (
    <MainLayout refreshing={false} onRefresh={() => {}}>
    <SafeAreaView style={styles.mainContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); // Close modal on request close
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 30,
              borderRadius: 10,
              width: 250,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Your request has been submitted!
            </Text>
            <LottieView
              style={{
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
              source={animationData}
              autoPlay
              loop
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 20, alignSelf: "center" }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.Container1}>
        <Text style={styles.text}>
          We are committed to assisting you promptly once you have detailed the
          issue within the subsequent paragraph.
        </Text>
      </View>
      <View style={styles.Container2}>
        <KeyboardAvoidingView>
          <TextInput
            label="Request Information"
            mode="outlined"
            outlineColor={Colors.Primary}
            activeOutlineColor={Colors.Primary}
            style={{ marginBottom: 10, height: 150 }}
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
            multiline
            numberOfLines={5}
            autoFocus
          />
        </KeyboardAvoidingView>
      </View>

      <View style={styles.Container4}>
        <Button
          mode="contained"
          onPress={DataStore}
          buttonColor={Colors.Primary}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            "Submit"
          )}
        </Button>
      </View>
    </SafeAreaView>
    </MainLayout>
  );
};

export default RequestDocs;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  Container1: {
    height: height * 0.12,
    // backgroundColor: "red",
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: Colors.MoveDefaultFontColor,
    fontSize: 15,
    fontWeight: "600",
  },
  Container2: {
    height: height * 0.22,
    // backgroundColor: "red",
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  Container3: {
    height: height * 0.12,
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
  Container4: {
    height: height * 0.12,
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
});
