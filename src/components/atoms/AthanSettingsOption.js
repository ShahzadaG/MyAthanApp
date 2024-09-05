import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import ToggleSwitch from './ToggleSwitch';
import { useTheme } from '@/theme';
import ArrowIcon from '@/theme/assets/images/arrow_right.svg'



const AthanSettingsOption = ({ onPress, Icon, optionText, selectedOption }) => {

    const { colors, components } = useTheme();

    return (
        <TouchableOpacity
            style={components.athanSettingsOption}
            onPress={onPress}
        >
            
            {Icon != null &&
                <View style={components.athanSettingsIconContainer}>
                    <Icon width={24} height={24} style={{ color: colors.black }}/>
                </View>
            }

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={components.athanSettingsOptionText}>{optionText}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={components.athanSettingsSelectedOption}>{selectedOption}</Text>
                    <ArrowIcon width={24} height={24} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default AthanSettingsOption;
