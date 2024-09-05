import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme';

//TODO: Use colours 

const DeviceConnectionStatus = ({ deviceName, isConnected }) => {
  const { components, colours } = useTheme();

  const statusText = isConnected ? `Connected to ${deviceName}` : 'Not connected to any device';
  
  return (
    <View style={components.DeviceConnectionContainer}>
      <View style={[components.statusIndicator, isConnected && {backgroundColor: 'green'}]} />
      <Text style={components.statusText}>{statusText}</Text>
    </View>
  );
};

export default DeviceConnectionStatus;
