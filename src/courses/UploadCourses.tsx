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
  Button,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Colors from "../Compenents/Colors/Colors";
import axios from "axios";
import { Dimensions } from "react-native";
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import LottieView from "lottie-react-native";
import animationData from "../Compenents/Assets/uploaded.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
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

const UploadCourses = () => {
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
  const [modalVisible, setModalVisible] = useState(false);
  const auth = FIREBASE_AUTH;
  const [fileName, setFileName] = useState("");
  const [blobFile, setBlobFile] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log(result);

      if (!result.cancelled) {
        // Check the structure of the result object
        console.log("Document result:", result);

        const documentUrl = result.assets[0].uri;
        console.log("Document URL picked successfully", documentUrl);

        // Set the image state with the picked document URL
        setImage(documentUrl);

        // Call DataStore with the picked document URL
        DataStore(documentUrl, selectedCourse, selectedItem);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  }, [selectedCourse, selectedItem]);

  function generateUniqueFileName() {
    const timestamp = new Date().getTime();
    return `document_${timestamp}`;
  }
  const DataStore = async (documentUrl, courseName, selectedItem) => {
    try {
      setLoading(true);
      const storedUID = await AsyncStorage.getItem("uid");
      if (!storedUID) {
        console.log("UID not found in AsyncStorage");
        // Handle the case where UID is not available
        return;
      }

      const userRef = doc(FIREBASE_DB, "UserDocuments", storedUID);

      // Step 1: Upload the document to Firebase Storage
      const storage = getStorage();
      const uniqueFileName = generateUniqueFileName();
      const storageRef = ref(
        storage,
        `profileDocuments/${courseName}/${selectedItem}/${uniqueFileName}`
      );

      // Step 2: Upload the document to Firebase Storage
      const documentBlob = await fetch(documentUrl).then((response) =>
        response.blob()
      );
      await uploadBytes(storageRef, documentBlob);

      // Step 3: Retrieve the download URL of the uploaded document
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl, "This is download URL");

      // Step 4: Store user data including the document URL in Firestore
      await setDoc(userRef, {
        profiledocument: downloadUrl,
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
      // Assuming you want to show a success modal
      setModalVisible2(true);
      setLoading(false);
      console.log("Data and Document URL stored successfully");
      closeModal(); // Close the modal only after successful operations
    } catch (error) {
      console.error("Error storing data and uploading document:", error);
      // Optionally, handle the error in a way that makes sense for your app,
      // such as showing an error modal or setting an error state.
    }
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
      name: "Calculus And Analytical Geometry",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Physics",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Circuit Theory",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "General Mathematics",
      image: require("../Compenents/Assets/coding3.png"),
    },

    {
      name: "Ethics (for Non-Muslims)",
      image: require("../Compenents/Assets/coding3.png"),
    },

    {
      name: "Introduction to e-Learning",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Introduction to Programming",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Digital Logic Design",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Business and Technical English Writing",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Calculus II",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Economics",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Introduction To Business",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Sets and Logic",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Introduction to Programming (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Digital Logic Design (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Object Oriented Programming",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Database Management Systems",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Data Communication",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Discrete Mathematics",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Principles of Marketing",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Principles of Management",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Object Oriented Programming (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Database Management Systems (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Data Structures",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Computer Architecture and Assembly Language Programming",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Software Engineering - I",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Computer Networks",
      image: require("../Compenents/Assets/coding3.png"),
    },

    {
      name: "Data Structures (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Computer Architecture and Assembly Language Programming (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Computer Networks (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Information Security",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Theory of Automata",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Fundamentals of Algorithms",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Communication skills",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Differential Equations",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Statistics and Probability",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Operating Systems",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Compiler Construction",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Linear Algebra",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Fundamentals of Front End Development",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Routing and Switching",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Visual Programming",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Cloud Computing",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Modern Programming Languages",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Computer Graphics",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Software Architecture and Design",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Software EngineeringII",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Operating Systems (Practical)",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Final Project - CS619",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Parallel and Distributed Computing",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Numerical Analysis",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Advance Computer Architecture",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Web Design and Development",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "System Programming",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Software Quality Engineering",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Organizational Behaviour",
      image: require("../Compenents/Assets/coding3.png"),
    },

    {
      name: "Final Project",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Artificial Intelligence",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Data Warehousing",
      image: require("../Compenents/Assets/coding3.png"),
    },
    {
      name: "Professional Practices",
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
      name: "Physical Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Biochemistry",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Anatomy & Histology",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Communication & Writing Skills",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Organic Chemistry",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Physiology",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Dosage Forms Science",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Basic Pharmacognosy",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Pharmaceutical Mathematics",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Islamic Studies",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Pharmaceutical Microbiology & Immunology",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Bio-statistics",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Dispensing Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Pharmaceutical Analysis",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Pharmacology and Therapeutics",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Pathology",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Community, Social & Administrative Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Advanced Pharmacognosy",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Computer and its Applications in Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },
    {
      name: "Hospital Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Industrial Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Pharmaceutical Quality Management",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Clinical Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Biopharmaceutics & Pharmacokinetics",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Pharmaceutical Technology",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Forensic Pharmacy",
      image: require("../Compenents/Assets/medical.png"),
    },

    {
      name: "Medicinal Chemistry",
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
      name: "Business Math-I",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Fundamentals of Management",
      image: require("../Compenents/Assets/business.png"),
    },
    // { name: "English-I", image: require("../Compenents/Assets/business.png") },
    {
      name: "Financial of Accounting",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Business Statistics",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Marketing Management",
      image: require("../Compenents/Assets/business.png"),
    },
    { name: "Psychology", image: require("../Compenents/Assets/business.png") },
    // { name: "English-II", image: require("../Compenents/Assets/business.png") },
    {
      name: "Microeconomic",
      image: require("../Compenents/Assets/business.png"),
    },
    { name: "Sociology", image: require("../Compenents/Assets/business.png") },
    {
      name: "Management Accounting",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Statistical Inference",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Business Communication-I",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Business Finance",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Organizational Behavior",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Consumer Behavior",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Business Math – II",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Macroeconomics",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Financial Management",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Operations Management",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Human Resource Management",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "MG/AF/BA Elective – I",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Management Information Systems",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Financial Institutions & Markets",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Business Law",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Methods in Business Research",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Islamic Studies/Ethics",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Business Communication-II",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Pakistan Studies",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Strategic Management",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Economy of Pakistan",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Final Year Project – I",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "MG/AF/BA Elective – II",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "SS/MG Elective",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Business Ethics",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Entrepreneurship",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "Final Year Project – II",
      image: require("../Compenents/Assets/business.png"),
    },
    {
      name: "MG/AF/BA Elective – III",
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
          {/* <TouchableOpacity onPress={signUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity> */}
          {/* <View>
            <Text
              style={{
                fontSize: 26,
                color: Colors.Primary,
                fontWeight: "bold",
              }}
            >
              Hello
            </Text>
          </View>
          <View>
            <Image
              source={registrationImage}
              style={{ width: 80, height: 80, zIndex: 1 }}
            />
          </View>
          <TouchableOpacity onPress={closeModal}>
            <Text>Enter Password</Text>
          </TouchableOpacity> */}
        </View>
      </ModalPoup>
      <View style={styles.MainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={styles.Container1}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <View><Image source={require('../Components/assets/profilepic.png')} style={{width:70,height:70}}/></View>
                <View style={{paddingHorizontal:10}}>
                <View><Text style={{color:Colors.DefaultFontColor}}>Welcome Nadeem</Text></View>
                <View style={{display:'flex',flexDirection:'row'}}><Text style={{fontSize:15,fontWeight:'bold'}}>Hospital 01</Text>
                    <Image source={require('../Components/assets/arrow.png')} style={{tintColor:Colors.Primary}}></Image></View>
                </View>
            </View>
            <ProfileComponent />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NotificationsScreen");
              }}
            >
              <Image
                source={require("../Compenents/Assets/Frame.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View> */}
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

export default UploadCourses;

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
    height: height * 0.12,
    display: "flex",
    justifyContent: "center",
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
