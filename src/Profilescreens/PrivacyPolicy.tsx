import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
  } from "react-native";
  import React from "react";
  import Colors from "../Compenents/Colors/Colors";
  import { FontAwesome } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import * as OpenAnything from "react-native-openanything";
  import MainLayout from "../Components/MainLayout";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Privacy Policy</Text>
            <Text style={styles.subHeader}>Last Updated: February 22, 2025</Text>
          </View>

          <View style={styles.contentContainer}>
            {sections.map((section, index) => (
              <View key={index} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionText}>{section.content}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information to provide you with a better experience and to improve our services. The types of information we collect include:

A. Information You Provide
Profile Information: When you choose to create a profile or report a problem, we may collect media (e.g., images) you upload, such as profile photos or images submitted with a report.

B. Information Collected Automatically
Device and Usage Data: We may collect technical information such as your device type, operating system, IP address, and app usage patterns (e.g., pages viewed, time spent) to optimize the App.
Media Permissions: With your consent, we access your device's media (e.g., camera or photo gallery) to allow you to upload profile pictures or images for reporting issues.

C. Information Not Requiring Authentication
All cruise details and destination information are accessible without authentication. No personal data is required to browse this content.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect for the following purposes:

To Provide Services: Display cruise details, manage your favorites (if authenticated), and allow profile customization.
To Improve the App: Analyze usage data to enhance functionality, fix bugs, and improve user experience.
To Respond to You: Address reports or inquiries you submit, using any images or details you provide.
To Ensure Security: Protect against unauthorized access or misuse of the App.`,
  },
  {
    title: "3. How We Share Your Information",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:

Service Providers: With trusted third-party providers (e.g., cloud storage, analytics) who assist us in operating the App, under strict confidentiality agreements.
Legal Obligations: If required by law, regulation, or legal process (e.g., a court order), we may disclose your information.
`,
  },
  {
    title: "4. Your Choices and Permissions",
    content: `Media Permissions: You can grant or revoke access to your camera and photo gallery via your device settings. Without permission, you won’t be able to upload images for profiles or reports.
Authentication: Adding cruises to favorites requires authentication. You can use this feature optionally; all other content remains accessible without logging in.`,
  },
  {
    title: "5. Data Security",
    content: `We implement reasonable security measures (e.g., encryption, access controls) to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "6. Data Retention",
    content: `Profile and Favorites Data: We retain your profile information and favorites list as long as you maintain an account or until you delete it.
Report Data: Images and details from problem reports are kept only as long as necessary to resolve the issue, then deleted.
Usage Data: Anonymized usage data may be retained indefinitely for analytics purposes.`,
  },
  {
    title: "7. Children’s Privacy",
    content: `Halal Cruise is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn such data has been collected, we will delete it promptly.`,
  },
  {
    title: "8. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time. The updated version will be posted in the App with a revised "Last Updated" date. We encourage you to review it periodically. Continued use of the App after changes constitutes acceptance of the new terms.`
  }
  // Add other sections here...
];

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.Primary,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: Colors.DefaultFontColor,
    textAlign: "center",
    marginTop: 8,
  },
  contentContainer: {
    backgroundColor: Colors.White,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.Primary,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.DefaultFontColor,
  },
});

export default PrivacyPolicy;