import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import LocationIcon from '@/theme/assets/images/location.svg'
import SearchIcon from '@/theme/assets/images/search.svg'
import GooglePlacesInput from './GooglePlacesInput';
import { useTheme } from '@/theme';


function LocationInput() {
    const { variant, changeTheme, layout, gutters, fonts, components, backgrounds, } = useTheme();

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
        setKeyboardVisible(true);
      });
      const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
        setKeyboardVisible(false);
      });
  
      // Cleanup
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    return (
        <View style={components.location}>
            <View style={components.fixedIconContainer}>
                <LocationIcon width={24} height={24} />
            </View>
            <GooglePlacesInput />
            {!keyboardVisible && (
            <><View style={components.verticalLine} /><View style={[components.fixedIconContainer, { left: undefined, right: 15 }]}>
                <SearchIcon width={24} height={24} />
                </View></>
            )}
            
        </View>
    )
};
        
export default LocationInput;