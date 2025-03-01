import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import Colors from '../Colors/Colors';
import { TextStyles } from '../Styles/Styles';

const QuoteComponent = () => {
  const [quoteData, setQuoteData] = useState<{ quoteText?: string; quoteAuthor?: string }>({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuoteData = () => {
    setRefreshing(true);
    fetch("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json")
      .then((response) => response.json())
      .then((data) => setQuoteData(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchQuoteData();
  }, []);

  const staticQuote = {
    quoteText: "The only way to do great work is to love what you do.",
    quoteAuthor: "Steve Jobs",
  };

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.heading2, styles.title]}>Quote of the Day</Text>
      <View style={styles.quoteContainer}>
        <Text style={[TextStyles.body, styles.quoteText]}>
          {quoteData?.quoteText || staticQuote.quoteText}
        </Text>
        <Text style={[TextStyles.caption, styles.author]}>
          - {quoteData?.quoteAuthor || staticQuote.quoteAuthor}
        </Text>
      </View>
      <RefreshControl
        refreshing={refreshing}
        onRefresh={fetchQuoteData}
        colors={[Colors.primary.default]}
      />
    </View>
  );
};

// Add styles definition
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.homeBoxes.box6,
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  title: {
    color: Colors.primary.default,
    marginBottom: 15,
  },
  quoteContainer: {
    marginTop: 10,
  },
  quoteText: {
    color: Colors.text.dark,
    lineHeight: 24,
  },
  author: {
    marginTop: 10,
    color: Colors.text.secondary,
    textAlign: 'right',
  },
});

export default QuoteComponent; 