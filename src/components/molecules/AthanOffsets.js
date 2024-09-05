import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PrayerTimesContext from '@/context/PrayerTimesContext';
import AthanSettingsOption from '../atoms/AthanSettingsOption';
import PickerSelect from 'react-native-picker-select';
import { useTheme } from '@/theme';


const placeholder = { label: "Select a value", value: null };
const values = Array.from({ length: 121 }, (_, i) => {
    const value = i - 60;
    const signPrefix = value > 0 ? "+" : value < 0 ? "-" : "";
    const labelStr = `${signPrefix}${Math.abs(value)} minutes`;
    return { label: labelStr, value: value.toString() };
});


const AthanOffsetScreen = () => {
    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds, } = useTheme();


    const { offsets, icons, prayers, updatePrayerOffsets } = useContext(PrayerTimesContext);
  
    const inputRefs = {
      "fajr": useRef(null),
      "dhuhr": useRef(null),
      "asr": useRef(null),
      "maghrib": useRef(null),
      "isha": useRef(null),
    };

    const valueToStr = (value) => {
        value = parseInt(value, 10);
        if (isNaN(value)) return "No Adjustment";

        const signPrefix = value > 0 ? "+" : value < 0 ? "-" : "";
        return `${signPrefix}${Math.abs(value)} minutes`;
    }

    return (
      <ScrollView style={{backgroundColor: '#EAEBF3' }}>    
        <View style={styles.container}>
            <View style={styles.section}>
                {prayers.map(prayer => (
                    <View style={[components.athanSettingsSection, gutters.marginBottom_0]}>
                        <AthanSettingsOption
                            key={prayer}
                            onPress={() => inputRefs[prayer]?.togglePicker(true)}
                            optionText={prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                            selectedOption={valueToStr(offsets[prayer])}
                            Icon={icons[prayer]}
                        />
                    </View>
                ))}
            </View>

            {prayers.map(prayer => (
                <PickerSelect
                    key={prayer}
                    placeholder={{}}
                    items={values}
                    value={offsets[prayer]}
                    onValueChange={(value) => updatePrayerOffsets(prayer, value)}
                    style={hiddenPickerStyle}
                    ref={(el) => { inputRefs[prayer] = el; }}
                />
            ))}
        </View>
        </ScrollView>
    );
};


const hiddenPickerStyle = {
  inputIOS: {
    position: 'absolute',
    left: -10000,
    top: -10000,
    height: 0,
    width: 0,
    opacity: 0,
  },
  inputAndroid: {
    position: 'absolute',
    left: -10000,
    top: -10000,
    height: 0,
    width: 0,
    opacity: 0,
  },
  iconContainer: {
    height: 0,
    width: 0,
  },
};

const styles = StyleSheet.create({
    // ... existing styles
    safeArea: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      backgroundColor: '#EAEBF3', // Light grey background for the section title
      paddingTop: 15,
    },
    section: {
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      marginHorizontal: 15,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#C6C6C8',
    },
    input: {
      flex: 1, // To ensure the input field expands to fill the available space
      marginLeft: 10, // Add some space between the icon and the input field
      fontSize: 16,
      color: 'black',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#C6C6C8',
    },
    icon: {
      marginRight: 10,
    },
    optionText: {
      fontSize: 17,
      color: 'black',
    },
    selectedOption: {
      color: 'gray', 
      marginRight: 8,
      fontSize: 17
    },
      autocomplete: {
          paddingLeft: 40, // adjust as needed to make room for the icon
          // ... other styles for the autocomplete input
      },
      boldText: {
        fontWeight: 'bold',
      },
    
  });

export default AthanOffsetScreen;
