import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    RefreshControl,
    Dimensions,
  } from "react-native";
import Colors from '../Compenents/Colors/Colors';
import ProfileComponent from '../Compenents/Re-useable-Components/ProfileComponent';
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore"; // Changed import for onSnapshot
import { FIREBASE_DB } from '../../FirebaseConfig';
import LottieView from "lottie-react-native";
import animationData2 from "../Compenents/Assets/loading.json";
import animationData from "../Compenents/Assets/Animation - 1709403538718.json";
import MainLayout from '../Components/MainLayout';
import { CardStyles } from '../Compenents/Styles/Styles';


const { width, height } = Dimensions.get("window");
export const DestinationsScreen = () => {
     const navigation = useNavigation();



     const [destinations, setDestinations] = useState([]);
     const [loading, setLoading] = useState(true);
     
     useEffect(() => {
       const unsubscribe = subscribeToDestinations();
       return () => {
         // Unsubscribe when the component unmounts
         unsubscribe();
       };
     }, []); // Empty dependency array to run this effect only once
     
     const subscribeToDestinations = () => {
       const destinationsRef = collection(FIREBASE_DB, "Destinations");
       return onSnapshot(destinationsRef, (querySnapshot) => {
         const destinationsData = [];
         querySnapshot.forEach((doc) => {
           destinationsData.push({ id: doc.id, ...doc.data() }); // Include document ID
         });
         setDestinations(destinationsData);
         setLoading(false);
       });
     };
     console.log(destinations)
  return (
    <MainLayout>
      <SafeAreaView style={styles.mainPadding}>
                <TouchableOpacity style={styles.destinationButton}>
                    <Text style={styles.destinationButtonText}>Destination</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../Compenents/Assets/coding3.png')} // Update with your image path
                        style={styles.rightSideImage}
                    />
                </View>
        
         
  {loading ? (
    <View style={styles.loadingContainer}>
      <LottieView
        style={styles.loadingAnimation}
        source={animationData2}
        autoPlay
        loop
      />
    </View>
  ) : destinations.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Text>No Destinations Available</Text>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
    {destinations.map((destination) => (
  <TouchableOpacity
    key={destination.id}
    style={CardStyles.internalCard}
    onPress={() =>
      navigation.navigate("SpecificCruiseScreen", { destination: destination.id })
    }
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

</SafeAreaView>
    
    </MainLayout>
  )
}

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
   
      scrollViewContent: {
        marginTop: 20,
      },
      buttonContainer: {
        marginTop: 20,
        position: 'relative',
    },
    destinationButton: {
        width: '100%',
        backgroundColor: Colors.black,
        paddingVertical: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        marginVertical: 20, // Spacing from top
    },
    destinationButtonText: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing:2
    },
    mainPadding: {
        marginHorizontal: 20,
    },
  
    imageContainer: {
       zIndex:2,
        marginBottom: -50, // Adjust this to control vertical spacing
    },
    rightSideImage: {
        width: '100%', // Adjust as needed
        marginRight: -10, // Adjust this to control horizontal overlap
        height:250
    },
  });
