import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Compenents/Colors/Colors";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import auth from "@firebase/auth";

import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../Firebase";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // useEffect(() => {
  //   checkLoginState(); // Call checkLoginState when App mounts
  // }, []);

  // const checkLoginState = async () => {
  //   try {
  //     const storedUid = await AsyncStorage.getItem("uid");
  //     console.log("first from app", storedUid);

  //     if (storedUid) {
  //       navigation.navigate("BottomBar");
  //     } else {
  //       // Navigate to the login screen if the user is not logged in
  //       navigation.navigate("Login");
  //     }
  //   } catch (e) {
  //     Alert.alert("Failed to fetch the input from storage");
  //   }
  // };
  const signIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Please ensure all required fields are completed.");
        return; // Do not proceed if any field is empty
      }
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("This is response", response);

      // Check if the sign-in was successful
      if (response) {
        setLoading(false);
        // If successful, navigate to the 'BottomBar' screen
        navigation.navigate("BottomBar");
        // Save the user's ID to AsyncStorage
        await saveData(auth.currentUser.uid);
      } else {
        // If not successful, display an alert
        alert("Check your email");
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Access Denied: Please Verify Your Email Address and Password."
      );
      setLoading(false);
    }
  };

  const saveData = async (uid) => {
    try {
      await AsyncStorage.setItem("uid", auth.currentUser.uid);
      console.log("Data successfully saved");
    } catch (e) {
      Alert.alert("Failed to save the data to the storage");
    }
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible(!passwordVisible);
  };
  const eyeImageSource2 = passwordVisible
    ? require("../Compenents/Assets/toggle-eye-visible.png")
    : require("../Compenents/Assets/toggle-eye.png");

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setEmail("");
      setPassword("");
      console.log("Storage successfully cleared!");
    } catch (e) {
      Alert.alert("Failed to clear the async storage.");
    }
  };

  // const readData = async (uid) => {
  //   try {
  //     const storedUid = await AsyncStorage.getItem("uid", uid);

  //     if (storedUid) {
  //       navigation.navigate("BottomBar");
  //     } else {
  //       return;
  //     }
  //   } catch (e) {
  //     Alert.alert("Failed to fetch the input from storage");
  //   }
  // };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("User:", user);
      if (!user) {
        navigation.navigate("Login");
      } else {
        readData();
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView>
        <View style={styles.Container1}>
          <Text style={styles.mainText}>Enter Your{"\n"}Credentials</Text>
        </View>
        <View style={styles.Container2}>
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
              outlineColor={Colors.Primary}
              activeOutlineColor={Colors.Primary}
              right={
                <TextInput.Icon
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
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.White} />
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ImportContainer3}>
          <Text style={styles.newPatientText}>Are you a new User? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.MoveBackgroundColor,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  ImportContainer3: {
    height: height * 0.12,
    alignItems: "flex-end",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  Container1: {
    height: height * 0.25,
    justifyContent: "flex-end",
    paddingLeft: width * 0.1,
  },
  Container2: {
    height: height * 0.15,
    paddingHorizontal: width * 0.1,
    paddingVertical: width * 0.1,
    marginVertical: 20,
    display: "flex",
  },
  Container3: {
    height: height * 0.2,
    paddingHorizontal: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  Container4: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: height * 0.2,
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
  buttonText: {
    color: Colors.MoveBackgroundColor,
    fontSize: 15,
    fontWeight: "bold",
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
