import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import PrayerImage from '@/components/atoms/PrayerImage/PrayerImage';
import UpcomingPrayer from '@/components/molecules/UpcomingPrayer/UpcomingPrayer';
import PrayerTimes from '@/components/molecules/PrayerTimes/PrayerTime';
import ButtonVariant from '@/components/atoms/ButtonVariant/ButtonVariant';
import CalculatorIcon from '@/theme/assets/images/calculator.svg'
import SettingsIcon from '@/theme/assets/images/settings_icon.svg'
import ClockIcon from '@/theme/assets/images/clock_icon.svg'
import colours from '@/theme/colours';
import DeviceConnectionStatus from '@/components/molecules/DeviceConnectionStatus/DeviceConnectionStatus';
import SliderVariant from '@/components/atoms/SliderVariant';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';

import PrayerTimesContext from '@/context/PrayerTimesContext';
import DeviceSelectionModal from '@/components/molecules/DeviceSelectionModal/DeviceSelectionModal';
import { useBluetoothContext } from '@/context/BluetoothContext';
import { useTheme } from '@/theme';


function ClockSettings({ navigation }) {
    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds, } = useTheme();

    const { 
        deviceName,
        setDeviceName,
        brightness,
        setBrightness,
        automaticBrightness,
        setAutomaticBrightness,
        volume,
        setVolume,
        timeFormat24,
        setTimeFormat24,
        automaticDST,
        setAutomaticDST,
        DST,
        setDST
    } = useContext(PrayerTimesContext);

    const sanitizeDeviceName = (name) => {
        const validUtf8String = decodeURIComponent(encodeURIComponent(name));
        const maxLength = 20;
        const truncatedString = validUtf8String.slice(0, maxLength);
    
        return truncatedString;
    };
    
    const updateDeviceName = (name) => {
        const sanitized = sanitizeDeviceName(name);
        setDeviceName(sanitized);
    };
    

    const { devices, isScanning, startScan, stopScan, isConnectedToDevice } = useBluetoothContext();

    useEffect(() => {
        if (!isConnectedToDevice)
        {
            navigation.navigate('Home'); // Redirect to home page
        }
    }, [isConnectedToDevice])
    
    return (
        <ScrollView style={{backgroundColor: '#EAEBF3' }}>    
        <View style={components.clockSettingsContainer}>
            <Text style={components.sectionTitle}>Device Name</Text>
            <View style={components.clockSettingsSection} >
                <View style={[components.toggleOption, {borderBottomWidth: 0, paddingVertical: 0}]} >
                    <View style={components.toggleIconContainer}>
                        <CalculatorIcon width={24} height={24} />
                    </View>
                    <TextInput
                    style={[components.toggleOptionText, {flex: 1, paddingVertical: 20}]}
                    onChangeText={(value) => updateDeviceName(value)}
                    value={deviceName}
                    clearButtonMode="while-editing"
                    />
                </View>
            </View>
            <Text style={components.sectionTitle}>Brightness</Text>
            <View style={components.clockSettingsSection} >
                {!automaticBrightness &&
                <SliderVariant min={1} max={7} step={1} value={brightness}onValueChange={(value) => setBrightness(value)} />
                }
                <View style={components.toggleContainer}>
                    <ToggleSwitch 
                            text={"Automatic Brightness"}
                            Icon={null}
                            value={automaticBrightness}
                            onToggle={(value) => setAutomaticBrightness(value)}
                    />
                </View>
            </View>

            <Text style={components.sectionTitle}>Volume</Text>
            <View style={components.clockSettingsSection} >
                <SliderVariant min={1} max={10} step={1} value={volume} onValueChange={(value) => setVolume(value)} />
            </View>

            <Text style={components.sectionTitle}>Time Format</Text>
            <View style={components.clockSettingsSection}>
                <View style={components.toggleContainer}>
                <ToggleSwitch 
                        text={"24 Hour Time"}
                        Icon={null}
                        value={timeFormat24}
                        onToggle={(value) => setTimeFormat24(value)}
                />
                </View>
                <View style={components.toggleContainer}>
                <ToggleSwitch 
                        text={"Automatic Daylight Savings Time"}
                        Icon={null}
                        value={automaticDST}
                        onToggle={(value) => setAutomaticDST(value)}
                />
                </View>
                {!automaticDST &&
                <View style={components.toggleContainer}>
                    <ToggleSwitch 
                            text={"Daylight Savings Time"}
                            Icon={null}
                            value={DST}
                            onToggle={(value) => setDST(value)}
                    />
                </View>}
            </View>
        </View>
        </ScrollView>
    )
};

export default ClockSettings;
