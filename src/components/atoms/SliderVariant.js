import React from 'react';
import { View } from 'react-native';
import colours from '@/theme/colours';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/theme';


function SliderVariant({ navigation, min, max, step, value, onValueChange }) {
    const { gutters, components } = useTheme();

    return (
        <View style={gutters.paddingVertical_16} > 
            <Slider
                style={components.slider}
                minimumTrackTintColor={colours.purple}
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={value}
                onValueChange={onValueChange}
            />
        </View>
    )
};

export default SliderVariant;
