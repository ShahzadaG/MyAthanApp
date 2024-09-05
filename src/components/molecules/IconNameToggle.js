import React from 'react';
import { Text, View } from 'react-native';
import ToggleSwitch from '../atoms/ToggleSwitch';
import { useTheme } from '@/theme';

const IconNameToggle = ({ Icon, name, value, onToggle }) => {
    const { colors, fonts, components } = useTheme();

    return (
        <View style={components.nameAndToggle} >
            <View style={components.iconAndPrayerName}>
                <Icon width={24} height={24} style={{ color: colors.black }}/>
                <Text style={[components.prayerName, fonts.capitalize]}>{name}</Text>
            </View>
            <View style={[components.toggleContainer, components.toggleSwitch ]}>
                <ToggleSwitch 
                    text={""}
                    value={value}
                    onToggle={onToggle}
                    style={components.toggleSwitch}
                />
            </View>
        </View>
    );
};

export default IconNameToggle;