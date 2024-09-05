import React, { useContext, useEffect } from 'react';
import PrayerTimesContext from '@/context/PrayerTimesContext';
import PrayTimes from './PrayTimes'; // Assuming PrayTimes.js is in the same directory

const PrayTimesWrapper = () => {
    const { calculationMethod, juristicMethod, location, offsets, DST, automaticDST, setTimes, timeFormat24, timezone, setNextPrayer, forceRefresh } = useContext(PrayerTimesContext);

    useEffect(() => {
        if (location == null || calculationMethod == null || 
            juristicMethod == null || offsets == null || 
            DST == null || automaticDST == null || 
            timezone == null) {
            return;
        }

        const { prayerTimes, nextPrayer } = getNextPrayer();

        setNextPrayer(nextPrayer);
        setTimes({
            fajr: prayerTimes.fajr,
            sunrise: prayerTimes.sunrise,
            dhuhr: prayerTimes.dhuhr,
            asr: prayerTimes.asr,
            maghrib: prayerTimes.maghrib,
            isha: prayerTimes.isha,
        });
    }, [calculationMethod, juristicMethod, location, offsets, DST, automaticDST, timeFormat24, forceRefresh]);

    const getTimesObject = () => {
        const times = new PrayTimes(); 
        times.setMethod(calculationMethod);
        times.adjust({ asr: juristicMethod });
        times.tune(offsets);

        return times;
    }

    const getNextPrayer = () => {
        const date = new Date();
        const coords = [location.latitude, location.longitude];
        const format = timeFormat24 ? '24h' : '12h';

        let is_dst = false;
        if (!automaticDST) {
            is_dst = 1 * DST;
        }

        const times = getTimesObject();
        let prayerTimes = times.getTimes(date, coords, timezone, is_dst, format);
        let prayerTimesFloat = times.getTimes(date, coords, timezone, is_dst, 'Float');
        let nextPrayer = calculateNextPrayer(prayerTimesFloat);

        if (nextPrayer === 'NFajr') {
            // Get times for the next day
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            prayerTimes = times.getTimes(nextDate, coords, timezone, is_dst, format);
            nextPrayer = 'fajr';
        }

        return { prayerTimes, nextPrayer };
    }

    const calculateNextPrayer = (prayerTimes) => {
        const date = new Date();
        const currentHours = date.getHours() + date.getMinutes() / 60;

        if (currentHours <= prayerTimes.fajr) {
            return 'fajr';
        } else if (currentHours <= prayerTimes.dhuhr) {
            return 'dhuhr';
        } else if (currentHours <= prayerTimes.asr) {
            return 'asr';
        } else if (currentHours <= prayerTimes.maghrib) {
            return 'maghrib';
        } else if (currentHours <= prayerTimes.isha) {
            return 'isha';
        }
        return 'NFajr'; // Assuming Fajr is the next prayer after Isha (for the next day)
    }

    return null; // This component doesn't render anything
};

export default PrayTimesWrapper;
