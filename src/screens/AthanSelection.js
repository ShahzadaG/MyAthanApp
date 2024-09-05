import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PrayerTimesContext from '@/context/PrayerTimesContext';
import AthanSelectionItem from '@/components/molecules/AthanSelectionItem';
import PickerSelect from 'react-native-picker-select';

const PrayerAdjustmentScreen = () => {

    const { enables, athanList, fajrAthanList, athans, updatePrayerAthans, prayers, icons, updatePrayerEnables } = useContext(PrayerTimesContext);
  
    const inputRefs = {
      "fajr": useRef(null),
      "dhuhr": useRef(null),
      "asr": useRef(null),
      "maghrib": useRef(null),
      "isha": useRef(null),
    };

      const getItems = (items) => {
        return items.map(item => ({
          label: item,
          value: item,
        }));
      };

    // Open picker for a specific prayer
    const openPicker = (prayer) => {
        const ref = inputRefs[prayer].current;
        if (ref) 
        {
            ref.togglePicker(true);
        }
    };

    return (
      <ScrollView style={{backgroundColor: '#EAEBF3' }}>    
        <View style={styles.container}>
            {prayers.map(prayer => (
            <View style={styles.section}>
                <AthanSelectionItem
                value={enables[prayer]}
                onToggle={(value) => updatePrayerEnables(prayer, value)}
                onPress={() => openPicker(prayer)}
                prayerName={prayer}
                selectedAthan={athans[prayer]}
                Icon={icons[prayer]}
                />
            </View>
            ))}

        {prayers.map(prayer => (
            <PickerSelect
            key={prayer}
            placeholder={{}}
            items={prayer === 'fajr' ? getItems(fajrAthanList) : getItems(athanList)}
            value={athans[prayer]}
            onValueChange={(value) => updatePrayerAthans(prayer, value)}
            style={hiddenPickerStyle}
            ref={inputRefs[prayer]}
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
    container: {
      flex: 1,
      backgroundColor: '#EAEBF3', // Light grey background for the section title
      paddingTop: 15,
    },
    section: {
      borderRadius: 15,
      backgroundColor: '#FFF',
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 16
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingLeft: 0,
      marginTop: 20,
      paddingTop: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#C6C6C8',
    },

    
  });

export default PrayerAdjustmentScreen;
