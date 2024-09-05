import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard , ScrollView} from 'react-native';
import CalculatorIcon from '@/theme/assets/images/calculator.svg'
import ClockIcon from '@/theme/assets/images/clock.svg'
import JuristicIcon from '@/theme/assets/images/juristic.svg'
import VolumeIcon from '@/theme/assets/images/volume.svg'
import DuaIcon from '@/theme/assets/images/dua.svg'
import LocationInput from '@/components/molecules/LocationInput/LocationInput';
import AthanSettingsOption from '@/components/atoms/AthanSettingsOption';
import PrayerTimesContext from '@/context/PrayerTimesContext';
import { useBluetoothContext } from '@/context/BluetoothContext';
import IconNameToggle from '@/components/molecules/IconNameToggle';
import { useTheme } from '@/theme';


function AthanSettings({ navigation }) {
    const { components, gutters } = useTheme();

    const { calculationMethod, setCalculationMethod, juristicMethod, setJuristicMethod, duaAfterAthan, setDuaAfterAthan } = useContext(PrayerTimesContext);
    const { devices, isScanning, startScan, stopScan, isConnectedToDevice } = useBluetoothContext();

    useEffect(() => {
        if (!isConnectedToDevice)
        {
            navigation.navigate('Home'); // Redirect to home page
        }
    }, [isConnectedToDevice])

    const openCalculationMethodScreen = () => {
        const onSelect = (selectedMethod) => { setCalculationMethod(selectedMethod); };
        navigation.navigate('Calculation Method', { onSelect: onSelect });
    }

    const openJuristicMethodScreen = () => {
        const onSelect = (selectedMethod) => { setJuristicMethod(selectedMethod); };
        navigation.navigate('Juristic Method', { onSelect: onSelect });
    }

    const openAthanSelectionScreen = () => {
        navigation.navigate('Athan Selection');
    }

    const openAthanOffsetScreen = () => {
        navigation.navigate('Athan Offset');
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{backgroundColor: '#EAEBF3' }}>    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={components.clockSettingsContainer}>
            <Text style={components.sectionTitle}>Location</Text>
            <LocationInput />
            <Text style={components.sectionTitle}>General</Text>
            <View style={components.athanSettingsSection}>
                <AthanSettingsOption
                    onPress={openCalculationMethodScreen}
                    Icon={CalculatorIcon}
                    optionText="Calculation Method"
                    selectedOption={calculationMethod}
                />
                <AthanSettingsOption
                    onPress={openJuristicMethodScreen}
                    Icon={JuristicIcon}
                    optionText="Juristic Method"
                    selectedOption={juristicMethod}
                />
                <AthanSettingsOption
                    onPress={openAthanOffsetScreen}
                    Icon={ClockIcon}
                    optionText="Athan Offsets"
                />
                <AthanSettingsOption
                    onPress={openAthanSelectionScreen}
                    Icon={VolumeIcon}
                    optionText="Athan Selection"
                />
                <View style={gutters.paddingVertical_16} > 
                    <IconNameToggle
                        onToggle={(value) => setDuaAfterAthan(value)}
                        Icon={DuaIcon}
                        name="Dua After Athan"
                        value={duaAfterAthan}
                        home={true}
                    />
                </View>
            </View>

        </View>
        </TouchableWithoutFeedback>
        </ScrollView>
    )
};

export default AthanSettings;
