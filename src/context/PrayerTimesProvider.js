import React, { useState, useEffect } from 'react';
import PrayerTimesContext from './PrayerTimesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FajrIcon from '@/theme/assets/images/fajr_icon.svg';
import DhuhrIcon from '@/theme/assets/images/dhuhr_icon.svg';
import AsrIcon from '@/theme/assets/images/asr_icon.svg';
import MaghribIcon from '@/theme/assets/images/maghrib_icon.svg';
import IshaIcon from '@/theme/assets/images/isha_icon.svg';

const PrayerTimesProvider = ({ children }) => {
    const [city, setCity] = useState(null);
    const [nextPrayer, setNextPrayer] = useState(null);
    const [location, setLocation] = useState(null);
    const [DST, setDST] = useState(null);
    const [duaAfterAthan, setDuaAfterAthan] = useState(null);
    const [automaticDST, setAutomaticDST] = useState(null);
    const [timeFormat24, setTimeFormat24] = useState(null);
    const [volume, setVolume] = useState(null);
    const [automaticBrightness, setAutomaticBrightness] = useState(null);
    const [brightness, setBrightness] = useState(null);
    const [deviceName, setDeviceName] = useState(null);
    const [calculationMethod, setCalculationMethod] = useState(null);
    const [juristicMethod, setJuristicMethod] = useState(null);
    const [enables, setEnables] = useState(null);
    const [offsets, setOffsets] = useState(null);
    const [times, setTimes] = useState(null);
    const [timezone, setTimezone] = useState(null);
    const [athans, setAthans] = useState(null);
    const [posixTimezone, setPosixTimezone] = useState(null);
    const [posixTimezoneTrigger, setPosixTimezoneTrigger] = useState(0);
    const [forceRefresh, setForceRefresh] = useState(false);
    const [deviceId, setDeviceId] = useState(null);

    const icons = {
        "fajr": FajrIcon,
        "dhuhr": DhuhrIcon,
        "asr": AsrIcon,
        "maghrib": MaghribIcon,
        "isha": IshaIcon,
    };

    const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    const calculationMethodList = ["MWL", "ISNA", "Egypt", "Makkah", "Karachi", "Tehran", "Jafari", "Custom"];
    const juristicMethodList = ["Standard", "Hanafi"];
    const fajrAthanList = ['Fajr Makkah', 'Fajr Madina', 'Fajr Al-Mishary'];
    const athanList = ['Makkah', 'Madina', 'Al-Mishary'];


    useEffect(() => {
        const savePrayerTimes = async () => {
            try {
                const prayerTimes = {
                    city,
                    location,
                    DST,
                    duaAfterAthan,
                    automaticDST,
                    timeFormat24,
                    volume,
                    automaticBrightness,
                    brightness,
                    deviceName,
                    calculationMethod,
                    juristicMethod,
                    enables,
                    offsets,
                    timezone,
                    posixTimezone,
                    athans,
                    deviceId
                };

                if (deviceId)
                {

                    await AsyncStorage.setItem(deviceId, JSON.stringify(prayerTimes));
                }

                await AsyncStorage.setItem('prayerTimes', JSON.stringify(prayerTimes));
            } catch (error) {
                console.error('Error saving prayer times:', error);
            }
        };

        savePrayerTimes();
    }, [city, location, DST, duaAfterAthan, automaticDST, timeFormat24, volume, automaticBrightness, brightness, deviceName, calculationMethod, juristicMethod, enables, offsets, timezone, posixTimezone, athans, deviceId]);

    const updatePrayerEnables = (prayer, val) => {
        setEnables(prev => {
            const newEnables = { ...prev };
            newEnables[prayer] = val;
            return newEnables;
        });
    };

    const updatePrayerAthans = (prayer, val) => {
        setAthans(prev => {
            const newAthans = { ...prev };
            newAthans[prayer] = val;
            return newAthans;
        });
    };


    const updatePrayerOffsets = (prayer, val) => {
        setOffsets(prev => {
            const newOffsets = { ...prev };
            newOffsets[prayer] = val;
            return newOffsets;
        });
    };

    const setPrayerTimesData = (data) => {
        setCity(data.city);
        setLocation(data.location);
        setDST(data.DST);
        setDuaAfterAthan(data.duaAfterAthan);
        setAutomaticDST(data.automaticDST);
        setTimeFormat24(data.timeFormat24);
        setVolume(data.volume);
        setAutomaticBrightness(data.automaticBrightness);
        setBrightness(data.brightness);
        setDeviceName(data.deviceName);
        setCalculationMethod(data.calculationMethod);
        setJuristicMethod(data.juristicMethod);
        setEnables(data.enables);
        setOffsets(data.offsets);
        setAthans(data.athans);
        setTimezone(data.timezone);
        setDeviceId(data.deviceId);

        console.log('data set??');
    }

    return (
        <PrayerTimesContext.Provider value={{
            setTimes,
            setCity,
            setLocation,
            setNextPrayer,
            setDST,
            setDuaAfterAthan,
            setAutomaticDST,
            setTimeFormat24,
            setVolume,
            setAutomaticBrightness,
            setBrightness,
            setDeviceName,
            setCalculationMethod,
            setJuristicMethod,
            setEnables,
            setOffsets,
            setAthans,
            setTimezone,
            setPosixTimezone,
            setPosixTimezoneTrigger,
            updatePrayerAthans,
            updatePrayerEnables,
            updatePrayerOffsets,
            setForceRefresh,
            setDeviceId,
            setPrayerTimesData,
            forceRefresh,
            icons,
            prayers,
            athanList,
            fajrAthanList,
            athans,
            calculationMethodList,
            juristicMethodList,
            times,
            timezone,
            posixTimezone,
            posixTimezoneTrigger,
            city,
            location,
            nextPrayer,
            DST,
            duaAfterAthan,
            automaticDST,
            timeFormat24,
            volume,
            automaticBrightness,
            brightness,
            deviceName,
            calculationMethod,
            juristicMethod,
            enables,
            offsets,
            deviceId
        }}>
            {children}
        </PrayerTimesContext.Provider>
    );
};

export default PrayerTimesProvider;