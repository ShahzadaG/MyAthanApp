import React, { useContext } from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';
import SelectionScreen from "./SelectionScreen";
import PrayerTimesContext from '@/context/PrayerTimesContext';
import CalculationMethodsTable from '../molecules/CalculationMethodsTable';
import { useTheme } from '@/theme';


const CalculationMethodScreen = ({ navigation, route }) => {
    const { calculationMethod, calculationMethodList } = useContext(PrayerTimesContext);
    const { onSelect } = route.params;


    return (
        <SelectionScreen 
            options={calculationMethodList} 
            onSelect={onSelect} 
            selectedOption={calculationMethod}
            navigation={navigation}
            isCalculationMethod={true}
        />
    )
}

export default CalculationMethodScreen;
