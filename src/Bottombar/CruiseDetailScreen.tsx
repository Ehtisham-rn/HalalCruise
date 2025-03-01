import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import Colors from "../Compenents/Colors/Colors";
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import { openComposer } from "react-native-email-link";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";
import {  useDispatch, useSelector } from "react-redux";
import { addToFavorites , removeFromFavorites } from "../Redux/actions";
import MainLayout from "../Components/MainLayout";


const { width, height } = Dimensions.get("window");


const CruiseDetailScreen = ({ route, navigation }) => {
  const { cruiseId } = route.params; // Get cruise ID passed from the previous screen
  const [cruise, setCruise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  // Check if the current cruise is in favorites
  const isFavorite = favorites.some((item) => item.id === cruise?.id);

  const handleToggleFavorite = async () => {
    try {
      // Get UID from local storage
      const uid = await AsyncStorage.getItem('uid');

      if (!uid) {
        Alert.alert(
          "Login Required",
          "You need to login to add cruises to favorites.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Login",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
        return;
      }

      if (isFavorite) {
        dispatch(removeFromFavorites(cruise));
        Alert.alert("Removed from Favorites", `${cruise.Name} has been removed.`);
      } else {
        dispatch(addToFavorites(cruise));
        Alert.alert("Added to Favorites", `${cruise.Name} has been added.`);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      Alert.alert("Error", "Unable to check authentication status.");
    }
  };





  const handleEmail = () => {
    // console.log(openComposer);
    const subject = `Inquiry about ${cruise.Name}`;
    const body = `
      Hey Admin,
  
      I would like to inquire about the cruise ${cruise.Name}.
      Could you please provide more details regarding this cruise?
  
      Thank you!
    `;
  
    openComposer({
      to: "booking@halalcruises.ca",
      subject: subject,
      body: body, // Plain-text body
    })
      .then(() => {
        Alert.alert("Success", "Email composer opened successfully.");
      })
      .catch((error) => {
        console.error("Error opening email composer:", error);
        Alert.alert(
          "Error",
          "Unable to open email app. Please configure your email account."
        );
      });
  };
  

  useEffect(() => {
    const fetchCruiseDetails = async () => {
      try {
        const cruiseDoc = doc(FIREBASE_DB, "Cruise", cruiseId);
        const cruiseData = await getDoc(cruiseDoc);

        if (cruiseData.exists()) {
          setCruise({ id: cruiseId, ...cruiseData.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching cruise details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCruiseDetails();
  }, [cruiseId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading cruise details...</Text>
      </View>
    );
  }

  if (!cruise) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Cruise not found</Text>
      </View>
    );
  }


  const onRefresh = () => {
    // Refresh logic if needed
  };

  return (
    <MainLayout refreshing={refreshing} onRefresh={onRefresh}>
    <ScrollView style={styles.container}>
    
      <Image source={{ uri: cruise.Image }} style={styles.image} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={styles.title}>{cruise.Name}</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <AntDesign
            name={isFavorite ? "heart" : "hearto"} // Toggle icon based on favorite state
            size={28}
            color="red" // Change color if required
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{cruise.Description}</Text>
      <Text style={styles.details}>Departure Date: {cruise.Date}</Text>
      <Text style={styles.details}>Number of Stops: {cruise.Stops}</Text>
      <Text style={styles.details}>Cruise Duration: {cruise.Duration}</Text>
      <View style={styles.ButtonMain}>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={handleEmail}>
            <Text style={styles.ButtonText}>Send Enquiry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: 20,
  },
  ButtonContainer:{
width:150,
justifyContent:"center",
alignItems:"center",
backgroundColor:Colors.Primary,
color:Colors.white,
borderRadius:10,
  },
 
  ButtonMain:{
    // backgroundColor:"yellow",
    width: "100%",
    display:"flex",
    alignItems:"flex-end",
    marginBottom:60,


  },
  ButtonText:{
    color:Colors.white,
    fontSize:16,
    padding:10,
    fontWeight:"bold",

  },
  Container1: {
    height: height * 0.18,

    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    // backgroundColor: "red",
    alignSelf: "flex-start", // This makes the width adjust to the content
    paddingHorizontal: 5, // Optional: Adds padding to the text
  },
  
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.text.dark,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default CruiseDetailScreen;
