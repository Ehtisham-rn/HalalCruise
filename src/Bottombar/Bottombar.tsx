import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import UploadScreen from "./UploadScreen";
import NotificationsScreen from "./NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import Colors from "../Compenents/Colors/Colors";
import { KeyboardAvoidingView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const Tab = createBottomTabNavigator();

const CustomtabbarButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ top: -20, justifyContent: "center", alignItems: "center" }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.UniLInkPrimary,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
const Bottombar = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.Primary,
          borderTopWidth: 0,
          elevation: 0,
          position: keyboardVisible ? "absolute" : "relative",
          bottom: keyboardVisible ? -1000 : 0,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: "center", 
              justifyContent: "center",
              height: 50,
              width: 50,
            }}>
              <MaterialCommunityIcons
                name="home"
                size={28}
                color={Colors.white}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: "center", 
              justifyContent: "center",
              height: 50,
              width: 50,
            }}>
              <MaterialCommunityIcons
                name="heart"
                size={28}
                color={Colors.white}
              />
            </View>
          ),
          headerBackground: () => (
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.5)"]}
              style={{ flex: 1 }}
              start={[0, 0]}
              end={[0, 1]}
            />
          ),
          headerStyle: {
            backgroundColor: "transparent",
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />

      {/* <Tab.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plus"
              size={34}
              color={focused ? Colors.White : Colors.White}
            />
            
          ),
          tabBarButton: (props) => <CustomtabbarButton {...props} />,
        }}
      /> */}
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: "center", 
              justifyContent: "center",
              height: 50,
              width: 50,
            }}>
              <Ionicons
                name="notifications"
                size={28}
                color={Colors.white}
              />
            </View>
          ),
          headerBackground: () => (
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.5)"]}
              style={{ flex: 1 }}
              start={[0, 0]}
              end={[0, 1]}
            />
          ),
          headerStyle: {
            backgroundColor: "transparent",
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: "center", 
              justifyContent: "center",
              height: 50,
              width: 50,
            }}>
              <MaterialCommunityIcons
                name="account"
                size={28}
                color={Colors.white}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottombar;

const styles = StyleSheet.create({});
