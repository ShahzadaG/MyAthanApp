import React, { useContext } from 'react';
import SelectionScreen from "./SelectionScreen";
import PrayerTimesContext from '@/context/PrayerTimesContext';

const JuristicMethodScreen = ({ navigation, route }) => {
    const { juristicMethod, juristicMethodList } = useContext(PrayerTimesContext);
    const { onSelect } = route.params;

    return (
        <SelectionScreen 
            options={juristicMethodList} 
            onSelect={onSelect} 
            selectedOption={juristicMethod}
            navigation={navigation}
        />
    )
}

export default JuristicMethodScreen;
