import React, { useEffect, useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import PrayerTimesContext from '@/context/PrayerTimesContext';

const defaultPrayerTimes = {
    times: {
        "fajr": '05:00',
        "sunrise": '06:15',
        "dhuhr": '12:30',
        "asr": '15:45',
        "maghrib": '18:30',
        "isha": '20:00',
    },
    city: '',
    location: {
        latitude: 0,
        longitude: 0,
    },
    juristicMethodList: ["Standard", "Hanafi"],
    calculationMethod: "ISNA",
    juristicMethod: "Standard",
    duaAfterAthan: true,
    brightness: 7,
    automaticBrightness: true,
    volume: 100,
    timeFormat24: false,
    automaticDST: true,
    deviceName: "MyAthanClock",
    timezone: null,
    posixTimezone: "GMT",
    DST: false,
    enables: {
        "fajr": true,
        "dhuhr": true,
        "asr": true,
        "maghrib": true,
        "isha": true
    },
    athans: {
        "fajr": "Fajr Makkah",
        "dhuhr": "Makkah",
        "asr": "Makkah",
        "maghrib": "Makkah",
        "isha": "Makkah"
    },
    offsets: {
        "fajr": 0,
        "dhuhr": 0,
        "asr": 0,
        "maghrib": 0,
        "isha": 0,
    },
    nextPrayer: "asr"
};

function Startup({ navigation }) {
    const { layout, gutters, fonts } = useTheme();
    const { setPrayerTimesData } = useContext(PrayerTimesContext);
    const { t } = useTranslation(['startup']);

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
        console.log("clearing storage");
    };

    // useQuery to fetch or initialize prayerTimes data
    const { data, isSuccess, isFetching, isError } = useQuery({
        queryKey: ['prayerTimes'],
        queryFn: async () => {
            try {
                // Attempt to fetch prayerTimes data from AsyncStorage
                const storedPrayerTimes = await AsyncStorage.getItem('prayerTimes');
                if (storedPrayerTimes) {
                    return JSON.parse(storedPrayerTimes);
                } else {
                    // Store default values in AsyncStorage for future use
                    await AsyncStorage.setItem('prayerTimes', JSON.stringify(defaultPrayerTimes));
                    console.log("setting default");
                    return defaultPrayerTimes;
                }
            } catch (error) {
                console.error('Error fetching prayer times:', error);
                throw new Error('Failed to fetch prayer times');
            }
        },
    });

    useEffect(() => {
        // Update context with fetched or initialized prayerTimes
        if (data) {
            setPrayerTimesData(data);
        }
    }, [data]);

    useEffect(() => {
        // Redirect to 'Home' screen when isSuccess changes to true
        if (isSuccess) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    }, [isSuccess, navigation]);

    return (
        <SafeScreen>
            <View style={[
                layout.flex_1,
                layout.col,
                layout.itemsCenter,
                layout.justifyCenter,
            ]}>
                <Brand />
                {isFetching && (
                    <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
                )}
                {isError && (
                    <Text style={[fonts.size_16, fonts.red500]}>
                        {t('startup:error')}
                    </Text>
                )}
            </View>
        </SafeScreen>
    );
}

export default Startup;
