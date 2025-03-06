import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";

import Colors from "../Compenents/Colors/Colors";
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import LottieView from "lottie-react-native";
import animationData2 from "../Compenents/Assets/loading.json";
import MainLayout from "../Components/MainLayout";
import { CardStyles } from "../Compenents/Styles/Styles";
import { FIREBASE_DB } from "../Firebase";



const { width, height } = Dimensions.get("window");
export const SpecificCruiseScreen = ({ route, navigation }) => {
  const { destination } = route.params; // Get the destination from navigation params
  const [cruises, setCruises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCruises = async () => {
      try {
        const cruisesRef = collection(FIREBASE_DB, "Cruise");
        const q = query(cruisesRef, where("destination", "==", destination));
        const querySnapshot = await getDocs(q);

        const cruisesData = [];
        querySnapshot.forEach((doc) => {
          cruisesData.push({ id: doc.id, ...doc.data() });
        });

        setCruises(cruisesData);
      } catch (error) {
        console.error("Error fetching cruises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCruises();
  }, [destination]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading cruises...</Text>
      </View>
    );
  }

  return (
  
    <MainLayout>
   
    
   <TouchableOpacity style={styles.destinationButton}>
                    <Text style={styles.destinationButtonText}>Cruise For {destination}</Text>
                </TouchableOpacity>
        <View style={styles.wrapperContainer}>
{loading ? (
  <View style={styles.loadingContainer}>
    <LottieView
      style={styles.loadingAnimation}
      source={animationData2}
      autoPlay
      loop
    />
  </View>
) : cruises.length === 0 ? (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    }}
  >
    <Text>No Cruises Available</Text>
  </View>
) : (
  <ScrollView
    contentContainerStyle={styles.scrollViewContent}
    showsVerticalScrollIndicator={false}
  >
  {cruises.map((destination) => (
<TouchableOpacity
  key={destination.id} // Ensure key is unique for each item
  style={CardStyles.internalCard}

    onPress={() => navigation.navigate("CruiseDetailScreen", { cruiseId: destination.id })}
  
>

<Image
      source={{ uri: destination.Image }}
      style={CardStyles.internalCardImage}
    />
    <View style={CardStyles.internalCardTextContainer}>
      <Text style={CardStyles.internalCardTitle}>{destination.Name}</Text>
      <Text style={CardStyles.internalCardSubtitle}>
      Cruises at this Destination: {destination.Cruises_number}
      </Text>
    </View>
  </TouchableOpacity>

))}


  </ScrollView>
)}
</View>
</MainLayout>
   
    
 
  );
};

const styles = StyleSheet.create({
    MainContainer_main: {
        minHeight:height * 1.1,
          marginHorizontal: 20,
          backgroundColor: Colors.White,
        },
        Importcontainer4: {
          height: height * 0.6,
      backgroundColor:"red",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginBottom: 20,
        },
        ImportContainer3: {
          height: height * 0.03,
      
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15,
        },
        Container1: {
          height: height * 0.18,
      
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          marginTop: 15,
        },
        Container2: {
          height: height * 0.12,
        },
        Container3: {
          height: height * 0.2,
      
          backgroundColor: Colors.HomeBox6,
          borderRadius: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          // marginTop:25
        },
        container4: {
          height: height * 0.49,
      
          alignItems: "center",
          justifyContent: "center",
        },
        // InputField: {
        //   flex:1,
        //   borderWidth: 1,
        //   borderColor: Colors.InputFieldBorder,
        //   backgroundColor: Colors.InputFieldBackground,
        //   padding:10,
        //   paddingHorizontal: 40,
        //   borderRadius: 10,
        // },
        TextInputView: {
          flexDirection: "row", // Display children (TextInput and Image) in a row
          alignItems: "center", // Vertically center children
          borderWidth: 1,
          borderColor: Colors.InputFieldBorder,
          backgroundColor: Colors.InputFieldBackground,
          borderRadius: 10,
          padding: 10,
        },
      
        InputField: {
          flex: 1, // Takes up all available space
          color: Colors.Black,
          fontSize: 18,
          paddingLeft: 10, // Add padding on the left to make space for the image
        },
      
        SearchIcon: {
          width: 20,
          height: 20,
          marginHorizontal: 10, // Add margin to separate the icon from the input text
        },
        modalBackGround: {
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          justifyContent: "flex-end",
          alignItems: "center",
        },
        modalContainer: {
          width: "100%",
          backgroundColor: Colors.White,
          height: 340,
          borderTopEndRadius: 30,
          borderTopLeftRadius: 30,
          elevation: 20,
          padding: 20,
          position: "absolute",
          bottom: 0,
        },
        modelMainContainer: {
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
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
          mainContainer: {
            width: "100%",
            height: 100,
            backgroundColor: Colors.HomeBox2,
            paddingLeft: 20,
            paddingRight: 20,
            marginVertical: 10,
            gap:20,
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 15,
            display:"flex",
            flexDirection:"row",
          },
          mainContainerText: {
            fontSize: 18,
            fontWeight: "600",
          },
          secContainerText: {
            fontSize: 16,
            fontWeight: "500",
          },
          wrapperContainer: {
            // flex: 1,
            // padding: 10,
            backgroundColor: Colors.White,
          },
          scrollViewContent: {
            width:"90%",
            alignSelf:"center",
            marginTop: 20,
          },

          destinationButton: {
            width: '90%',
            backgroundColor: Colors.black,
            paddingVertical: 20,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            marginVertical: 20,
            alignSelf: 'center',
        },
        destinationButtonText: {
            color: Colors.white,
            fontSize: 16,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing:2
        },
});
