// SelectionScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import CheckedIcon from '@/theme/assets/images/radio_button_checked.svg';
import UncheckedIcon from '@/theme/assets/images/radio_button_unchecked.svg';
import CustomCalculationMethod from '../molecules/CustomCalculationMethod';
import CalculationMethodsTable from '../molecules/CalculationMethodsTable';
import { useTheme } from '@/theme';

const SelectionScreen = ({ navigation, options, onSelect, selectedOption, isCalculationMethod = false }) => {

  const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds, } = useTheme();
  const [selectedOptionState, setSelectedOptionState] = useState(selectedOption); // State to keep track of the selected index

  return (
    <ScrollView style={{backgroundColor: '#EAEBF3' }}>    
    <View style={styles.container}>
        <View style={styles.section}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={index === options.length - 1 ? [styles.option, styles.optionLast] : styles.option}
          onPress={() => {
            onSelect(option);
            
            setSelectedOptionState(option);

            if (option != options[options.length - 1] || !isCalculationMethod)
            {
              navigation.goBack();
            }
          }}
        >
          <Text style={styles.optionText}>{option}</Text>

          {selectedOptionState === option ? (
            <CheckedIcon width={24} height={24} />
          ) : (
            <UncheckedIcon width={24} height={24} />
          )}

        </TouchableOpacity>
      ))}
      
      </View>

        {(isCalculationMethod && selectedOptionState === options[options.length - 1]) &&  (
            <CustomCalculationMethod />
        )}

        {isCalculationMethod && 
                <View style={ {padding: 20} }>
                  <CalculationMethodsTable/>
                </View>
        }

        {!isCalculationMethod && 
                <View style={ {padding: 20} }>
                  <Text style={[styles.optionText, {fontSize: 14}]}>
                  Asr time can be calculated by two methods: one used by Shafi'i, Maliki, Ja'fari, and Hanbali schools, and the other by the Hanafi school. Adjusting this option will only affect the Asr prayer time.
                  </Text>
                </View>
        }
    </View>
    </ScrollView>
  );
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
      paddingTop: 20,
    },
    section: {
      marginBottom: 35,
      backgroundColor: 'white',
      borderRadius: 10,
      marginHorizontal: 15,
      overflow: 'hidden',
      padding: 20
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
    optionText: {
      color: '#333',
      fontFamily: 'Poppins',
      fontSize: 15,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    icon: {
      marginRight: 10,
    },
    // ... other styles
  });

export default SelectionScreen;