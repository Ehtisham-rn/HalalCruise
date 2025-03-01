import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import Colors from "../Compenents/Colors/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as OpenAnything from "react-native-openanything";
import MainLayout from "../Components/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <View style={styles.mainContainer}>
        <View style={styles.Container1}>
          <Text style={styles.CompanyText}>Halal {"\n"}Cruises</Text>
          <Text style={styles.CompanyDesc}>
            This app is the creation of Cocktail Intl, a trusted
            technology provider.
          </Text>
        </View>
        
        <View style={styles.spacer} />
        
        <View style={styles.Container2}>
          <TouchableOpacity onPress={() => OpenAnything.Call("+1 647 632 9295")}>
            <FontAwesome name="phone" size={44} color={Colors.Primary} />
          </TouchableOpacity>
          <Text style={styles.Descmain}>Phone</Text>
          <Text style={styles.CompanyDesc}>Connect by phone</Text>
        </View>
        
        <View style={styles.spacer} />
        
        <View style={styles.Container3}>
          <TouchableOpacity onPress={() => OpenAnything.Email("booking@halalcruises.ca")}>
            <MaterialIcons name="email" size={44} color={Colors.Primary} />
          </TouchableOpacity>
          <Text style={styles.Descmain}>Email</Text>
          <Text style={styles.CompanyDesc}>Send an email</Text>
        </View>
        
        <View style={styles.spacer} />
        
        <View style={styles.Container4}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.instagram.com/halal_cruises/")
            }
          >
            <Entypo name="instagram" size={44} color={Colors.Primary} />
          </TouchableOpacity>
          <Text style={styles.Descmain}>Social account</Text>
          <Text style={styles.CompanyDesc}>Tap the icon to connect with us</Text>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  spacer: {
    height: 20,
  },
  Container1: {
    backgroundColor: Colors.White,
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
   
  },
  Container2: {
    backgroundColor: Colors.primary.light,
    borderRadius: 15,
    padding: 20,
    display: "flex",
    gap: 8,
    shadowColor: "#000",
 
  },
  Container3: {
    backgroundColor: Colors.primary.light,
    borderRadius: 15,
    padding: 20,
    display: "flex",
    gap: 8,
    shadowColor: "#000",
  
  },
  Container4: {
    backgroundColor: Colors.primary.light,
    borderRadius: 15,
    padding: 20,
    display: "flex",
    gap: 8,
    shadowColor: "#000",
   
  },
  CompanyText: {
    fontSize: 32,
    fontWeight: "600",
    color: Colors.Primary,
    marginBottom: 20,
  },
  CompanyDesc: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.DefaultFontColor,
  },
  Descmain: {
    fontSize: 19,
    fontWeight: "600",
    color: Colors.black,
  },
});

export default About;
