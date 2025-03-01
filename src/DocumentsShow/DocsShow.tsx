import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import { ActivityIndicator } from "react-native-paper";
import * as OpenAnything from "react-native-openanything";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { ADD_TO_FAVORITES } from "../Redux/actions"; // Assuming you have an action type for adding to history
import LottieView from "lottie-react-native";
import animationData from "../Compenents/Assets/Animation - 1709403538718.json";
import animationData2 from "../Compenents/Assets/loading.json";
import { Entypo } from "@expo/vector-icons";
import Colors from "../Compenents/Colors/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DocsShow = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const { selectedCourse, selectedItem } = route.params;
  const [pdfUrls, setPdfUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(selectedCourse, selectedItem);
  }, [selectedCourse, selectedItem]);
  console.log(pdfUrls, "Data");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedItem, // Set the header title dynamically to selectedItem
    });
  }, [navigation, selectedItem]);

  const fetchData = async (courseName, selectedItem) => {
    try {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profileDocuments/${courseName}/${selectedItem}`
      );

      const itemsList = await listAll(storageRef);

      const downloadUrls = await Promise.all(
        itemsList.items.map(async (itemRef) => {
          return getDownloadURL(itemRef);
        })
      );

      setPdfUrls(downloadUrls);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching data from Storage:", error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  const saveToHistory = (item) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: item }); // Dispatch the action to add to history
  };

  const extractFileName = (url) => {
    const lastSlashIndex = url.lastIndexOf("/") + 1; // Find the index of the last slash
    const queryStringIndex = url.indexOf("?"); // Find the index of the question mark
    let fileNameWithExtension = url.substring(lastSlashIndex, queryStringIndex); // Extract the file name with extension
    fileNameWithExtension = decodeURIComponent(fileNameWithExtension); // Decode URI component

    const parts = fileNameWithExtension.split("/"); // Split the string by "/"
    const fileName = parts[parts.length - 1]; // Get the last part which is the file name
    return fileName;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
            alignSelf: "center",
            height: "100%",
          }}
        >
          <LottieView
            style={{
              width: 200,
              height: 200,
              justifyContent: "center",
              display: "flex",
              alignContent: "center",
              alignSelf: "center",
            }}
            source={animationData2}
            autoPlay
            loop
          />
        </View>
      ) : pdfUrls.length === 0 ? (
        <View
          style={{
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
            alignSelf: "center",
            height: "100%",
            // backgroundColor: "red",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              display: "flex",
              alignContent: "center",
              alignSelf: "center",
              height: 250,
              backgroundColor: "rgba(0, 0, 0, 0.05)",

              padding: 30,
              borderRadius: 30,
            }}
          >
            <LottieView
              style={{
                width: 170,
                height: 170,
                justifyContent: "center",
                display: "flex",
                alignContent: "center",
                alignSelf: "center",
              }}
              source={animationData}
              autoPlay
              loop
            />
            <Text style={styles.text}>No Such Document Found!</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={pdfUrls}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.wrapperContainer}>
              <View style={styles.mainContainer}>
                <Text style={styles.mainContainerText}>
                  {extractFileName(item)}
                </Text>

                <FontAwesome6
                  name="download"
                  size={24}
                  color="black"
                  onPress={() => {
                    OpenAnything.Pdf(item);
                    saveToHistory(item);
                  }}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DocsShow;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 100,
    backgroundColor: Colors.HomeBox2,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
  },
  text: {
    color: Colors.DefaultFontColor,
    fontSize: 15,
    fontWeight: "600",
    width: 170,
    textAlign: "center",
  },
  mainContainerText: {
    fontSize: 16,
    fontWeight: "600",
    width: "80%",
  },
  wrapperContainer: {
    marginHorizontal: 10, // Add margin horizontally
    // marginVertical: 10,
  },
});
