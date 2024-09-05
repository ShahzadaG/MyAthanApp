import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import ArrowDownIcon from '@/theme/assets/images/arrow_down.svg'
import IconNameToggle from './IconNameToggle';
import { useTheme } from '@/theme';

const AthanSelectionItem = ({ onPress, Icon, prayerName, selectedAthan, value, onToggle }) => {
    const { components } = useTheme();
    
    return (
        <View>
            <IconNameToggle
                Icon={Icon}
                name={prayerName}
                value={value}
                onToggle={onToggle}
            />
            <TouchableOpacity
                style={components.option}
                onPress={onPress}
            >
            <View style={[components.iconAndPrayerName, {flex: 1, justifyContent: 'space-between'}]}>
                <Text style={components.selectedOption}>{selectedAthan}</Text>
                <ArrowDownIcon width={24} height={24} />
            </View>
            </TouchableOpacity>
        </View>

    );
};

export default AthanSelectionItem;
