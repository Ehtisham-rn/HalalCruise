import {
  Alert,
  Dimensions,
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
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  documentId,
} from "firebase/firestore";
import LottieView from "lottie-react-native";
import animationData from "../Compenents/Assets/uploaded.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainLayout from "../Components/MainLayout";
const ReportProblem = () => {
  const [image, setImage] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        const imageUrl = result.assets[0].uri;
        console.log("Image URL stored successfully", imageUrl);

        // Set the imageUrl in the component state
        setImage(imageUrl);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  }, []);

  const auth = FIREBASE_AUTH;

  const DataStore = async () => {
    try {
      if (!image || !displayName) {
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

      const userRef = doc(FIREBASE_DB, "Problems", storedUID);

      // Step 1: Upload the image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `Problems/${storedUID}`);
      const imageBlob = await fetch(image).then((response) => response.blob());
      await uploadBytes(storageRef, imageBlob);

      // Step 2: Retrieve the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Step 3: Store user data including the image URL in Firestore
      await setDoc(userRef, {
        Comments: displayName,
        reportImage: imageUrl,
      });
      setModalVisible(true);
      setLoading(false);
      console.log("Data and Image URL stored successfully");
    } catch (error) {
      Alert.alert("Error While Reporting Problem:Try again");
      setLoading(false);
      console.error("Error storing data and uploading image:", error);
    }
  };
  return (
    <MainLayout>
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
              Thanks for your submission!
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
          We will help you as soon as you described the problem in the paragraph
          below.
        </Text>
      </View>
      <View style={styles.Container2}>
        <TextInput
          label="Comments"
          mode="outlined"
          outlineColor={Colors.Primary} // Setting the color
          activeOutlineColor={Colors.Primary}
          style={{ marginBottom: 10 }}
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
          multiline
          numberOfLines={5} // Set the number of lines to 5
          style={{ height: 150 }}
          autoFocus
        />
      </View>
      <View style={styles.Container3}>
        <Button
          icon="plus"
          mode="contained"
          onPress={pickImage}
          style={{ width: "40%" }}
          buttonColor={Colors.Primary}
        >
          Add a Photo
        </Button>
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

export default ReportProblem;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  Container1: {
    height: height * 0.12,
    // backgroundColor: "red",
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: Colors.DefaultFontColor,
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
