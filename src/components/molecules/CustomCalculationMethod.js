// SelectionScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AthanSettingsOption from '../atoms/AthanSettingsOption';
import PickerSelect from 'react-native-picker-select';
import { useTheme } from '@/theme';

const CustomCalculationMethod = () => {

    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds, } = useTheme();


  const customOptions = ['Fajr Angle', 'Isha Angle'];

  const inputRefs = {
    'Fajr Angle': null,
    'Isha Angle': null,
    };

    const [optionValues, setOptionValues] = useState({
        'Fajr Angle': "0",
        'Isha Angle': "0",
    });

    const values = Array.from({ length: 41 }, (_, i) => {
        const value = i - 20;
        const signPrefix = value > 0 ? "+" : value < 0 ? "-" : "";
        const labelStr = `${signPrefix}${Math.abs(value)} degrees`;
        return { label: labelStr, value: value.toString() };
    });


    const valueToStr = (value) => {
        value = parseInt(value, 10);
        if (isNaN(value)) return "No Adjustment";

        const signPrefix = value > 0 ? "+" : value < 0 ? "-" : "";
        return `${signPrefix}${Math.abs(value)} degrees`;
    }

    const updateOptionValue = async (option, value) => {
        const newOptionsState = { ...optionValues, [option]: value };
        setOptionValues(newOptionsState);

        // try {
        //     await saveSetting('prayerOffsets', newPrayersState);
        // } catch (error) {
        //     console.error("Failed to save setting:", error);
        // }
    };

  return (
    <View style={components.container}>
            <View style={styles.section}>
            {customOptions.map((option, index, array) => (
            <View style={[components.athanSettingsSection, gutters.marginBottom_0]}>
                <AthanSettingsOption
                    key={option}
                    onPress={() => inputRefs[option]?.togglePicker(true)}
                    optionText={option}
                    selectedOption={valueToStr(optionValues[option])}
                    styles={{
                        ...styles,
                        option: index === array.length - 1 ? [styles.option, styles.optionLast] : styles.option,
                    }}
                />
                </View>
            ))}
        </View>
        {customOptions.map(option => (
            <PickerSelect
                key={option}
                placeholder={{}}
                items={values}
                value={optionValues[option]}
                onValueChange={(value) => updateOptionValue(option, value)}
                style={hiddenPickerStyle}
                ref={(el) => { inputRefs[option] = el; }}
            />
        ))}
    </View>
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
    option: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically
        justifyContent: 'space-between', // Space between items
        backgroundColor: 'white',
        marginBottom: 25,
    },
    optionLast: {
        marginBottom: 0,
    },
    icon: {
      marginRight: 10,
    },
    optionText: {
        color: '#333',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        paddingLeft: 15
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

export default CustomCalculationMethod;