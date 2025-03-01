import React from 'react';
import { RefreshControl } from 'react-native';
import Colors from '../Compenents/Colors/Colors';

const RefreshComponent = ({ refreshing, onRefresh }) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[Colors.DarkGreenText]}
      tintColor={Colors.DarkGreenText}
    />
  );
};

export default RefreshComponent; 