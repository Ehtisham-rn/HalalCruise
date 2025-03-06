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
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Colors from "../Compenents/Colors/Colors";
import axios from "axios";
import { Dimensions } from "react-native";
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import { useNavigation } from "@react-navigation/native";
import animationData from "../Compenents/Assets/uploaded.json";
import * as DocumentPicker from "expo-document-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { FIREBASE_AUTH } from "../Firebase";
const { width, height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

const ModalPoup = ({ visible, children, onRequestClose }) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modalBackGround}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const UploadScreen = () => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [registrationText, setRegistrationText] = useState(
    "Touch ID for Sehati"
  );

  const [visible, setvisible] = useState(false);
  let fontSize = 16; // Default font size

  // Adjust font size based on screen width
  if (screenWidth < 350) {
    fontSize = 11; // Adjust font size for small screens
  } else if (screenWidth >= 350 && screenWidth < 600) {
    fontSize = 11; // Adjust font size for medium screens
  } else {
    fontSize = 14; // Adjust font size for large screens
  }

  const [data, setData] = useState([]);
  const [quoteData, setQuoteData] = useState([]);

  const closeModal = () => {
    setvisible(false);
  };
  const [image, setImage] = useState(null);
  const auth = FIREBASE_AUTH;
  const [fileName, setFileName] = useState("");
  const [blobFile, setBlobFile] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const DataStore = async (
    documentUrl,
    courseName,
    selectedItem,
    documentName
  ) => {
    try {
      setLoading(true);
      const storedUID = await AsyncStorage.getItem("uid");
      if (!storedUID) {
        console.log("UID not found in AsyncStorage");
        // Handle the case where UID is not available
        return;
      }
      const storage = getStorage();
      const uniqueFileName = generateUniqueFileName(documentName);
      const storageRef = ref(
        storage,
        `profileDocuments/${courseName}/${selectedItem}/${uniqueFileName}`
      );

      const documentBlob = await fetch(documentUrl).then((response) =>
        response.blob()
      );
      await uploadBytes(storageRef, documentBlob);

      const downloadUrl = await getDownloadURL(storageRef);

      const userRef = doc(FIREBASE_DB, "UserDocuments", storedUID);
      await setDoc(userRef, {
        profiledocument: downloadUrl,
        documentName: documentName, // Save the document name in the database
      });

      const userRef2 = doc(FIREBASE_DB, "Notifications", storedUID);

      const docSnapshot = await getDoc(userRef2);
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        if (Array.isArray(docData.Notifications)) {
          // If Notifications is an array, use arrayUnion to append the new notification
          await updateDoc(userRef2, {
            Notifications: arrayUnion(
              `A new ${selectedItem} is uploaded in ${courseName}`
            ),
          });
        } else {
          // If Notifications is not an array, initialize it as an array with the new notification
          await updateDoc(userRef2, {
            Notifications: [
              `A new ${selectedItem} is uploaded in ${courseName}`,
            ],
          });
        }
      } else {
        // If the document does not exist, initialize Notifications as an array with the new notification
        await setDoc(userRef2, {
          Notifications: [`A new ${selectedItem} is uploaded in ${courseName}`],
        });
      }
      setModalVisible2(true);
      setLoading(false);
      console.log("Data and Document URL stored successfully");
    } catch (error) {
      console.error("Error storing data and uploading document:", error);
    }
  };

  function generateUniqueFileName(documentName) {
    const timestamp = new Date().getTime();
    const fileName = documentName.split(".")[0]; // Get the file name without extension
    return `${fileName}_${timestamp}.pdf`; // Append timestamp to the file name
  }

  // Usage:
  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log("Document result:", result);

      if (!result.cancelled) {
        const documentUrl = result.assets[0].uri;
        console.log("Document URL picked successfully", documentUrl);

        const documentName = result.assets[0].name; // Get the name of the picked document
        setImage(documentUrl);
        DataStore(documentUrl, selectedCourse, selectedItem, documentName);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  }, [selectedCourse, selectedItem]);

  // const uploadDocumentToFirebase = async (documentUri) => {
  //   try {
  //     // Step 1: Upload the document to Firebase Storage
  //     const storage = getStorage();
  //     const storageRef = ref(storage, `documents/${auth.currentUser.uid}`);
  //     const documentBlob = await fetch(documentUri).then((response) =>
  //       response.blob()
  //     );
  //     await uploadBytes(storageRef, documentBlob);

  //     // Step 2: Retrieve the download URL of the uploaded document
  //     const documentUrl = await getDownloadURL(storageRef);

  //     // Step 3: Store the download URL in Firestore
  //     const userRef = doc(FIREBASE_DB, "UserProfile", auth.currentUser.uid);
  //     const userSnapshot = await getDoc(userRef);

  //     if (userSnapshot.exists()) {
  //       const userData = userSnapshot.data();

  //       // Update Firestore with the new document URL
  //       await setDoc(userRef, {
  //         ...userData,
  //         documentUrl: documentUrl,
  //       });

  //       console.log("Document URL stored successfully");
  //     } else {
  //       console.error("User document not found");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading document:", error);
  //   }
  // };
  const signUp = async () => {
    // Continue with the sign-up process if passwords match

    // Navigate to the "BottomBar" screen only after DataStore is completed
    await DataStore();
  };

  const courses = [
    {
      name: "Introduction to Computing",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "English Comprehension",
      image: require("../Compenents/Assets/coding3.png"),
    },

    {
      name: "Artificial Intelligence (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Functional English",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Advanced Clinical Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Pharmaceutical Management & Marketing",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "IT in Business",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Fundamentals of Accounting",
      image: require("../Compenents/Assets/business.png"),
    },

    {
      name: "MG/AF/BA Elective – IV",
      image: require("../Compenents/Assets/business.png"),
    },

    // Add more courses as needed
  ];
  const Options = [
    {
      name: "Assignment",
      image: require("../Compenents/Assets/plus2.png"),
    },
    {
      name: "Lab",
      image: require("../Compenents/Assets/plus2.png"),
    },
    {
      name: "Quiz",
      image: require("../Compenents/Assets/plus2.png"),
    },
    {
      name: "Slide",
      image: require("../Compenents/Assets/plus2.png"),
    },
    {
      name: "Article",
      image: require("../Compenents/Assets/plus2.png"),
    },
    {
      name: "Book",
      image: require("../Compenents/Assets/plus2.png"),
    },
    // Add more courses as needed
  ];
  useEffect(() => {
    // Check if selectedItem is set, then call pickDocument
    if (selectedItem) {
      pickDocument();
    }
  }, [selectedItem]);
  const renderItem2 = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.HomeBox6,
          width: width * 0.26,
          height: 107,
          borderRadius: 10,
          justifyContent: "space-between",
          padding: 15,
          margin: 7,
        }}
        onPress={() => {
          // Toggle the selected item
          setSelectedItem((prevItem) =>
            prevItem === item.name ? null : item.name
          );
          setvisible(false);
        }}
      >
        <Image
          source={item.image}
          style={{ width: 38, height: 38, resizeMode: "contain" }}
        />
        <Text style={{ fontSize, fontWeight: "bold", color: Colors.Black }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.HomeBox6,
        width: width * 0.26,
        height: 107,
        borderRadius: 10,
        justifyContent: "space-between",
        padding: 15,
        margin: 7,

        // Add marginBottom to create space between rows
      }}
      onPress={() => {
        setvisible(true);
        setSelectedCourse(item.name);
      }}
    >
      <Image
        source={item.image}
        style={{ width: 38, height: 38, resizeMode: "contain" }}
      />
      <Text
        style={{ fontSize, fontWeight: "bold", color: Colors.Black }}
        numberOfLines={3}
        ellipsizeMode="tail"
        adjustsFontSizeToFit
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const [searchText, setSearchText] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const handleSearch = (text) => {
    // Update the searchText state and filter the courses based on the input text
    setSearchText(text);

    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredCourses(filtered);
  };

  return (
    <View style={{ backgroundColor: Colors.White }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(false); // Close modal on request close
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
              onPress={() => setModalVisible2(false)}
              style={{ marginTop: 20, alignSelf: "center" }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ModalPoup visible={visible} onRequestClose={closeModal}>
        <View style={styles.modelMainContainer}>
          <FlatList
            data={Options}
            renderItem={renderItem2}
            keyExtractor={(item) => item.name}
            numColumns={3} // Display three items in each row
            contentContainerStyle={{
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
          />
        </View>
      </ModalPoup>

      <View style={styles.MainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Container1}>
            <ProfileComponent />
            <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate("NotificationsScreen");
            // }}
            >
              <Image
                source={require("../Compenents/Assets/Frame.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Container2}>
            <View style={styles.TextInputView}>
              <Image
                source={require("../Compenents/Assets/search.png")}
                style={styles.SearchIcon}
              />
              <TextInput
                placeholder="Search your Course"
                style={styles.InputField}
                onChangeText={handleSearch}
                value={searchText}
                // placeholderTextColor={Colors.InputPlaceholderColor}
              />
              {/* <Image
                source={require("../Compenents/Assets/speak.png")}
                style={styles.SearchIcon}
              /> */}
            </View>
          </View>

          {/* <View style={styles.ImportContainer3}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: Colors.MovePrimary,
              }}
            >
              Programs
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("All Specialities");
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.DefaultFontColor }}>
                See All
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* <View style={styles.container4}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.HomeBox1,
                  width: "30%",
                  height: 107,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 15,
                }}
                onPress={() => {
                  navigation.navigate("Dentists");
                }}
              >
                <Image source={require("../Compenents/Assets/dentist.png")} />
                <Text
                  style={{ fontSize, fontWeight: "bold", color: Colors.Black }}
                >
                  Dentist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.HomeBox2,
                  width: "30%",
                  height: 107,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 15,
                  marginHorizontal: 15,
                }}
              >
                <Image
                  source={require("../Compenents/Assets/dermatologist.png")}
                />
                <Text
                  style={{ fontSize, fontWeight: "bold", color: Colors.Black }}
                >
                  Dermatologist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.HomeBox3,
                  width: "30%",
                  height: 107,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 15,
                }}
              >
                <Image
                  source={require("../Compenents/Assets/gynecologist.png")}
                />
                <Text
                  style={{ fontSize, fontWeight: "bold", color: Colors.Black }}
                >
                  Gynecologist
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginVertical: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.HomeBox4,
                  width: "30%",
                  height: 107,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 15,
                }}
              >
                <Image
                  source={require("../Compenents/Assets/psychiatrist.png")}
                />
                <Text
                  style={{ fontSize, fontWeight: "bold", color: Colors.Black }}
                >
                  Psychiatrist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.HomeBox5,
                  width: "30%",
                  height: 107,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 15,
                  marginHorizontal: 15,
                }}
              >
                <Image
                  source={require("../Compenents/Assets/cardiologist.png")}
                />
                <Text
                  style={{ fontSize, fontWeight: "bold", color: Colors.Black }}
                >
                  Cardiologist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.HomeBox6,
                  width: "30%",
                  height: 107,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 15,
                }}
              >
                <Image source={require("../Compenents/Assets/physician.png")} />
                <Text
                  style={{ fontSize, fontWeight: "bold", color: Colors.Black }}
                >
                  Physician
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={styles.ImportContainer3}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: Colors.UniLInkPrimary,
              }}
            >
              Courses
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UploadCourses");
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.DefaultFontColor }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Importcontainer4}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={Colors.UniLInkPrimary}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "50%",
                }}
              />
            ) : (
              <FlatList
                data={searchText ? filteredCourses : courses}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                numColumns={3} // Display three items in each row
                contentContainerStyle={{
                  alignItems: "flex-start", // Align items to start from the left
                  justifyContent: "flex-start",
                }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flexGrow: 1,

    justifyContent: "center",
    marginHorizontal: 20,
    backgroundColor: Colors.White,
  },
  Container1: {
    height: height * 0.17,

    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
  },
  Container2: {
    height: height * 0.07,
  },
  modelMainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  modelImage: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    backgroundColor: "rgba(15, 160, 184, 0.13)",
    borderRadius: 50,
  },
  Container3: {
    height: height * 0.07,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
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
  container4: {
    height: height * 0.3,

    alignItems: "center",
    justifyContent: "center",
  },
  InputField: {
    borderWidth: 1,
    borderColor: Colors.InputFieldBorder,
    backgroundColor: Colors.InputFieldBackground,
    paddingHorizontal: 40,
    padding: 10,
    borderRadius: 10,
  },
  container5: {
    height: height * 0.3,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Importcontainer4: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: height * 1,
    marginTop: 15,
  },
  ImportContainer3: {
    height: height * 0.07,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 15,
  },
  container6: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.White,
    width: "100%",
  },
  item: {
    backgroundColor: Colors.HomeBox1,
    marginVertical: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 170,
    flexDirection: "row",
    borderRadius: 15,
    width: "86%",
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  nameText: {
    fontSize: 19,
    fontWeight: "bold",
    color: Colors.Black,
  },
  specialitiesText: {
    fontSize: 15,
    color: Colors.Primary,
  },
  degreeText: {
    fontSize: 15,
    color: Colors.Black,
  },
  bookButton: {
    backgroundColor: Colors.Primary,
    width: 70,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,

    marginVertical: 10,
    marginHorizontal: 20,
  },
  bookButtonText: {
    color: Colors.Golden,
    fontWeight: "bold",
    fontSize: 16,
  },
  InputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.InputFieldBorder,
    backgroundColor: Colors.InputFieldBackground,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
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
});
