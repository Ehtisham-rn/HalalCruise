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
import React, { useEffect, useState } from "react";
import Colors from "../Compenents/Colors/Colors";
import { useFonts } from "expo-font";
import { Dimensions } from "react-native";
import ProfileComponent from "../Compenents/Re-useable-Components/ProfileComponent";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

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

const ReadCourses = () => {
  const navigation = useNavigation();

  const [quoteData, setQuoteData] = useState([null]);
  // useEffect(() => {
  //   fetchLatestNews();
  // }, []);
  useEffect(() => {
    fetch(
      "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
    )
      .then((response) => response.json())
      .then((data) => setQuoteData(data));
  }, []);

  const [visible, setvisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const closeModal = () => {
    setvisible(false);
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

  console.log(courses.length); // This should output 500

  const courseCounts = {};
  const duplicateCourses = [];

  courses.forEach((course) => {
    const { name } = course;
    if (courseCounts[name]) {
      duplicateCourses.push(name);
    } else {
      courseCounts[name] = 1;
    }
  });

  console.log("Duplicate Courses:", duplicateCourses);

  const Options = [
    {
      name: "Assignment",
      image: require("../Compenents/Assets/assignment.png"),
    },
    {
      name: "Lab",
      image: require("../Compenents/Assets/lab.png"),
    },
    {
      name: "Quiz",
      image: require("../Compenents/Assets/quiz2.png"),
    },
    {
      name: "Slide",
      image: require("../Compenents/Assets/slide.png"),
    },
    {
      name: "Article",
      image: require("../Compenents/Assets/article.png"),
    },
    {
      name: "Book",
      image: require("../Compenents/Assets/book.png"),
    },
    // Add more courses as needed
  ];
  const renderItem2 = ({ item }) => (
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
        navigation.navigate("DocsShow", {
          selectedCourse,
          selectedItem: item.name,
        });
        setvisible(false);
      }}
    >
      <Image
        source={item.image}
        style={{ width: 48, height: 48, resizeMode: "contain" }}
      />
      <Text style={{ fontSize: 11, fontWeight: "bold", color: Colors.Black }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

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
        style={{ fontSize: 11, fontWeight: "bold", color: Colors.Black }}
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

  // Inside your component
  return (
    <View style={{ backgroundColor: Colors.White }}>
      <View style={styles.MainContainer}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <FlatList
              data={searchText ? filteredCourses : courses}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              numColumns={3} // Display three items in each row
              contentContainerStyle={{
                alignItems: "flex-start", // Align items to start from the left
                justifyContent: "flex-start",
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ReadCourses;

const styles = StyleSheet.create({
  MainContainer: {
    // flexGrow: 1,

    justifyContent: "center",
    marginHorizontal: 20,
    backgroundColor: Colors.White,
  },
  Importcontainer4: {
    // height: height * 0.17,

    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: height * 0.7,
  },
  ImportContainer3: {
    height: height * 0.04,

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
    display: "flex",
    justifyContent: "center",
  },
  Container3: {
    height: height * 0.2,

    backgroundColor: Colors.HomeBox4,
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
});
