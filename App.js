import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/login/Login";
import Signup from "./src/login/Signup";
import Bottombar from "./src/Bottombar/Bottombar";
import DocsShow from "./src/DocumentsShow/DocsShow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./src/Redux/Reducer";
import ReadCourses from "./src/courses/ReadCourses";
import UploadCourses from "./src/courses/UploadCourses";
import About from "./src/Profilescreens/AboutUs";
import RequestDocs from "./src/Profilescreens/RequestDocs";
import ReportProblem from "./src/Profilescreens/ReportProblem";
import LottieView from "lottie-react-native";
import animationData from "./src/Compenents/Assets/loading.json";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./src/Compenents/Colors/Colors";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./src/Redux/Store";
import { TravelDatesScreen } from "./src/Bottombar/TravelDatesScreen";
import { DestinationsScreen } from "./src/Bottombar/DestinationsScreen";
import { CruiseShipsScreen } from "./src/Bottombar/CruiseShipsScreen";
import CruiseDetailScreen from "./src/Bottombar/CruiseDetailScreen";
import { SpecificCruiseScreen } from "./src/Bottombar/SpecificCruiseScreen";
import NotificationsScreen from "./src/Bottombar/NotificationsScreen";
import PrivacyPolicy from "./src/Profilescreens/PrivacyPolicy";

const store = configureStore({
  reducer: rootReducer,
});





export default function App() {
  const Stack = createNativeStackNavigator();
  const [storedUid, setStoredUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      setStoredUid(uid);
    } catch (e) {
      Alert.alert("Failed to fetch the input from storage");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LottieView
          style={{ width: 200, height: 200 }}
          source={animationData}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={storedUid ? "BottomBar" : "BottomBar"}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TravelDatesScreen"
              component={TravelDatesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SpecificCruiseScreen"
              component={SpecificCruiseScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CruiseDetailScreen"
              component={CruiseDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DestinationsScreen"
              component={DestinationsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CruiseShipsScreen"
              component={CruiseShipsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomBar"
              component={Bottombar}
              options={{ headerShown: false }}
            />

<Stack.Screen
          name="NotificationScreen"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
            <Stack.Screen
              name="DocsShow"
              component={DocsShow}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ReadCourses"
              component={ReadCourses}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="UploadCourses"
              component={UploadCourses}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name="Request Document"
              component={RequestDocs}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Report a problem"
              component={ReportProblem}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
  },
});
