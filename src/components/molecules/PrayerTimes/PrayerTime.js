import React from 'react';
import { View, Text } from 'react-native';
import FajrIcon from '@/theme/assets/images/fajr_icon.svg';
import SunriseIcon from '@/theme/assets/images/sunrise_icon.svg';
import DhuhrIcon from '@/theme/assets/images/dhuhr_icon.svg';
import AsrIcon from '@/theme/assets/images/asr_icon.svg';
import MaghribIcon from '@/theme/assets/images/maghrib_icon.svg';
import IshaIcon from '@/theme/assets/images/isha_icon.svg';
import { useTheme } from '@/theme';

function PrayerTimeItem({ prayer, time, isNextPrayer }) {
    const { fonts, layout, components, gutters, colours } = useTheme();

    const iconMap = {
        "fajr": FajrIcon,
        "sunrise": SunriseIcon,
        "dhuhr": DhuhrIcon,
        "asr": AsrIcon,
        "maghrib": MaghribIcon,
        "isha": IshaIcon,
    };

    const SelectedPrayerIcon = iconMap[prayer];
    const fillColour = isNextPrayer ? colours.purple : colours.black;
    const isLastItem = prayer == "isha";

    return (
        <View key={prayer} style={[ components.prayerItem, isLastItem && gutters.marginBottom_0]}>
            <View style={components.prayerNameAndIcon}>
                {SelectedPrayerIcon && <SelectedPrayerIcon width={layout.iconWidth} height={layout.iconHeight} style={{ color: fillColour }} />}
                <Text style={[components.prayerItemText, isNextPrayer && components.selectedPrayerItemText, fonts.capitalize]}>{prayer}</Text>
            </View>
            <Text style={[components.prayerItemText, isNextPrayer && components.selectedPrayerItemText]}>{time}</Text>
        </View>
    );
}

function PrayerTimes({ times, nextPrayer }) {
    const { components } = useTheme();

    let timesMap = {
        "fajr": '00:00',
        "sunrise": '00:00',
        "dhuhr": '00:00',
        "asr": '00:00',
        "maghrib": '00:00',
        "isha": '00:00',
    }

    // If prayerTimes is possibly undefined or empty, ensure to handle these cases
    if (times) {
        timesMap = times;
    }

    return (
        <View style={components.prayerContainer}>
            {Object.entries(timesMap).map(([prayer, time]) => {
                return (
                    <View key={prayer} style={components.prayerInnerContainer}>
                        <PrayerTimeItem prayer={prayer} time={time} isNextPrayer={nextPrayer == prayer} />
                    </View>
                );
            })}
        </View>
    );
}

export default PrayerTimes;
