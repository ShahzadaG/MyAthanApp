import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import colours from '@/theme/colours';
import { useTheme } from '@/theme';


function ToggleSwitch({ text, Icon, value, onToggle }) {
    const { variant, changeTheme, layout, gutters, fonts, components, backgrounds, } = useTheme();

    return (
        <>
          <View style={components.toggleIconText}>
    
            {Icon != null &&
                    <View style={components.iconContainer}>
                    <Icon />
                </View>
            }
    
            <Text style={components.toggleOptionText}>{text}</Text>
          </View>
          
          <Switch
            trackColor={{ false: "#767577", true: colours.purple }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={onToggle}
            value={value}
          />
        </>
      )
};

export default ToggleSwitch;
