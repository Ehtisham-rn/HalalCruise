import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../Compenents/Colors/Colors";
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import { useNavigation } from "@react-navigation/native";
import MainLayout from "../Components/MainLayout";


const { width, height } = Dimensions.get("window");

const HistoryScreen = () => {
   const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites);

  const renderItem = ({ item }) => (

    <TouchableOpacity
        key={item.id} // Ensure key is unique for each item
        style={styles.mainContainer}
        onPress={() => navigation.navigate("CruiseDetailScreen", { cruiseId: item.id })}
      >
         <View>
             <Image
          source={{ uri: item.Image }}
          style={{ width: 58, height: 58, resizeMode: "cover",borderRadius:10 }}
        />
        </View>
        <View>
        <Text style={styles.mainContainerText}>{item.Name}</Text>
        {/* Uncomment this line if Date exists and is required */}
        {/* <Text style={styles.mainContainerText}>
          {destination.Date.toDate().toLocaleDateString()} 
        </Text> */}
        <Text style={styles.secContainerText}>
          Destination: {item.destination}
        </Text>
        </View>
      </TouchableOpacity>



    // <View style={styles.cruiseCard}>
    //   <Image source={{ uri: item.Image }} style={styles.cruiseImage} />
    //   <View style={styles.cruiseDetails}>
    //     <Text style={styles.cruiseTitle}>{item.Name}</Text>
    //     <Text style={styles.cruiseText}>Duration: {item.Duration}</Text>
    //     <Text style={styles.cruiseText}>Stops: {item.Stops}</Text>
    //     <Text style={styles.cruiseText}>Departure: {item.Date}</Text>
    //   </View>
    // </View>
  );


  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
  
  };

  return (
    <MainLayout refreshing={refreshing} onRefresh={onRefresh}>
    <View style={styles.container}>
       
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites found!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
    </MainLayout>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.White,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: Colors.DefaultFontColor,
  },
  cruiseCard: {
    flexDirection: "row",
    backgroundColor: Colors.HomeBox2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  Container1: {
    height: height * 0.18,

    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  cruiseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cruiseDetails: {
    marginLeft: 10,
    flex: 1,
  },
  cruiseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cruiseText: {
    fontSize: 14,
    color: Colors.DefaultFontColor,
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
});
