import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../Compenents/Colors/Colors";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  documentId,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FIREBASE_AUTH } from "../Firebase";

const { width, height } = Dimensions.get("window");

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [ProfilePic, setprofilePic] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("Hi");
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

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
  }, []); // Empty dependency array to ensure stability

  const signUp = async () => {
    try {
      // Check if any of the required fields are empty
      if (!displayName || !email || !password || !image) {
        Alert.alert("Please ensure all required fields are completed.");
        return; // Do not proceed if any field is empty
      }
      setLoading(true);

      // Continue with the sign-up process if passwords match
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);

      // Navigate to the "BottomBar" screen only after DataStore is completed
      await DataStore();
      setLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);

      Alert.alert("Registration unsuccessful: Please verify your credentials");
      setLoading(false);
    }
  };

  const DataStore = async () => {
    try {
      const userRef = doc(FIREBASE_DB, "UserProfile", auth.currentUser.uid);

      // Step 1: Upload the image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      const imageBlob = await fetch(image).then((response) => response.blob());
      await uploadBytes(storageRef, imageBlob);

      // Step 2: Retrieve the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Step 3: Store user data including the image URL in Firestore
      await setDoc(userRef, {
        displayname: displayName,
        profileimage: imageUrl,
      });

      console.log("Data and Image URL stored successfully");
    } catch (error) {
      console.error("Error storing data and uploading image:", error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible(!passwordVisible);
  };
  // const eyeImageSource = passwordVisible
  //   ? require("../Compenents/assets/toggle-eye-visible.png") // Image for visible password
  //   : require("../Components/assets/toggle-eye.png"); // Default image

  const eyeImageSource2 = passwordVisible
    ? require("../Compenents/Assets/toggle-eye-visible.png") // Image for visible password
    : require("../Compenents/Assets/toggle-eye.png"); // Default image
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
      // Increase this value as needed
      >
        <View style={styles.Container1}>
          <Text style={styles.mainText}>Enter Your{"\n"}Credentials</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 63,
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
                  borderRadius: 63,
                  borderColor: "#37308D",
                  borderWidth: 1,
                }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.Container2}>
          {/* <TextField label="Phone number" keyboardType="phone-pad" /> */}
          {/* <TextField id="outlined-basic" label="Name" variant="outlined" /> */}
          <TextInput
            label="User name"
            mode="outlined"
            outlineColor={Colors.Primary} // Setting the color
            activeOutlineColor={Colors.Primary}
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            outlineColor={Colors.Primary} // Setting the color
            activeOutlineColor={Colors.Primary}
            style={{ marginBottom: 10 }}
          />

          <View>
            <TextInput
              label="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              outlineColor={Colors.Primary} // Setting the color
              activeOutlineColor={Colors.Primary}
              right={
                <TextInput.Icon
                  // name={eyeImageSource2}
                  onPress={togglePasswordVisibility2}
                  forceTextInputFocus={false}
                  color={Colors.Primary}
                  icon={eyeImageSource2}
                />
              }
            />
          </View>
        </View>
        <View style={styles.Container3}>
          <View style={{ width: 200 }}>
            <Text style={styles.text2}>
              By continuing, you agree to our{" "}
              <Text style={{ fontWeight: "bold" }}>Terms</Text> and
              <Text style={{ fontWeight: "bold" }}> Privacy Policy</Text>
            </Text>
          </View>
        </View>
        <View style={styles.Container4}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("BottomBar");
            }}
            onPress={signUp}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.white}/>
              ) : (
                "Sign Up"
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ImportContainer3}>
          <Text style={styles.newPatientText}>
            Are you an existing User?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.MoveBackgroundColor,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  Container1: {
    height: height * 0.2, // 20% of the screen height
    justifyContent: "center",
    paddingLeft: width * 0.1,
    // backgroundColor: "red",
  },
  Container2: {
    height: height * 0.2, // 30% of the screen height
    // backgroundColor: "green",
    paddingHorizontal: width * 0.1,
    paddingVertical: width * 0.1,
    marginVertical: 20,
    display: "flex",
  },
  Container3: {
    height: height * 0.15, // 20% of the screen height
    // backgroundColor: "pink",
    paddingHorizontal: width * 0,
    justifyContent: "flex-end",
    alignItems: "center",
    // paddingVertical: width * 0.1,
  },
  Container4: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.15, // 20% of the screen height
    // backgroundColor: "red",
  },
  mainText: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    color: Colors.Primary,
  },
  text2: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: Colors.Primary,
  },
  button: {
    height: 50,
    width: width * 0.82,
    backgroundColor: Colors.Primary,
    paddingHorizontal: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  ImportContainer3: {
    height: height * 0.12,
    alignItems: "flex-end",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  buttonText: {
    color: Colors.MoveBackgroundColor,
    fontSize: 15,
    fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.1,
  },
  newPatientText: {
    fontSize: 16,
    color: Colors.Primary,
  },
  signUpText: {
    fontSize: 16,
    color: Colors.Primary,
    fontWeight: "bold",
  },
});
