import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import PrayerImage from '@/components/atoms/PrayerImage/PrayerImage';
import UpcomingPrayer from '@/components/molecules/UpcomingPrayer/UpcomingPrayer';
import PrayerTimes from '@/components/molecules/PrayerTimes/PrayerTime';
import ButtonVariant from '@/components/atoms/ButtonVariant/ButtonVariant';
import BluetoothIcon from '@/theme/assets/images/bluetooth.svg';
import SettingsIcon from '@/theme/assets/images/settings_icon.svg';
import ClockIcon from '@/theme/assets/images/clock_icon.svg';
import colours from '@/theme/colours';
import DeviceConnectionStatus from '@/components/molecules/DeviceConnectionStatus/DeviceConnectionStatus';
import PrayerTimesContext from '@/context/PrayerTimesContext';
import DeviceSelectionModal from '@/components/molecules/DeviceSelectionModal/DeviceSelectionModal';
import { useBluetoothContext } from '@/context/BluetoothContext';
import { useTheme } from '@/theme';

function Home({ navigation }) {
    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } = useTheme();

    const { nextPrayer, times, deviceName, enables, updatePrayerEnables, forceRefresh, setForceRefresh } = useContext(PrayerTimesContext);
    const { devices, isScanning, startScan, stopScan, isConnectedToDevice } = useBluetoothContext();

    const [refreshing, setRefreshing] = useState(false);

    const openAthanSettings = () => {
        navigation.navigate('Athan Settings');
    };

    const openClockSettings = () => {
        navigation.navigate('Clock Settings');
    };

    const getNextPrayerTime = () => {
        if (times && nextPrayer) {
            return times[nextPrayer];
        }
        return '00:00';
    };

    const onRefresh = () => {
        setRefreshing(true);
        setForceRefresh(!forceRefresh); // force recalculation
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={[
                layout.justifyCenter,
                layout.itemsCenter,
            ]}>
                <PrayerImage prayer={nextPrayer} />
                <UpcomingPrayer isConnected={isConnectedToDevice} prayerName={nextPrayer} prayerTime={getNextPrayerTime()} enables={enables} updatePrayerEnables={updatePrayerEnables} />
                <PrayerTimes times={times} nextPrayer={nextPrayer} />
                <DeviceConnectionStatus deviceName={deviceName} isConnected={isConnectedToDevice} />
                <View style={layout.row}>
                    {!isConnectedToDevice && (
                        <ButtonVariant onPressCallback={startScan} colour={colours.gray} text="Connect" Icon={BluetoothIcon} />
                    )}
                    {isConnectedToDevice && (
                        <ButtonVariant onPressCallback={openClockSettings} colour={colours.gray} text="Clock Settings" Icon={ClockIcon} />
                    )}
                    {isConnectedToDevice && (
                        <ButtonVariant onPressCallback={openAthanSettings} colour={colours.purple} text="Athan Settings" Icon={SettingsIcon} />
                    )}
                </View>
                <DeviceSelectionModal isScanning={isScanning} devices={devices} />
            </View>
        </ScrollView>
    );
};

export default Home;
