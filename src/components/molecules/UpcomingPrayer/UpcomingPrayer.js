import { View, TouchableOpacity, Text } from 'react-native';
import Background from '@/theme/assets/images/bg_design_2.svg';
import MuteIcon from '@/theme/assets/images/mute_icon.svg'
import VolumeIcon from '@/theme/assets/images/volume.svg'
import PrayerTimesContext from '@/context/PrayerTimesContext';
import Toast from 'react-native-toast-message'

import { useTheme } from '@/theme';

function UpcomingPrayer({ prayerName, prayerTime, enables, updatePrayerEnables, isConnected }) {

    const { components, layout, fonts, colours } = useTheme();
    let visibleName = "default";
    let visibleTime = "00:00";

    if(prayerName != null)
        visibleName = prayerName;
    
    if(prayerTime != null)
        visibleTime = prayerTime;

    const handleMuteIconPress = () => {
        updatePrayerEnables(prayerName, true);
        const text = firstLetterUpper(prayerName) + " Athan Unmuted";
        showSuccessToast(text);
      };

      const handleVolumeIconPress = () => {
        updatePrayerEnables(prayerName, false);
        const text = firstLetterUpper(prayerName) + " Athan Muted";
        showSuccessToast(text);
      };

      const firstLetterUpper = (str) =>
      {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      showSuccessToast = (info) => {
        Toast.show({
          type: 'success',
          text1: info,
        })
      }

    return (
        <View style={components.nextPrayerContainer}>
        <Background style={[layout.absolute, layout.right0, layout.bottom0]}/>
        <View style={[layout.fullHeight, layout.justifyBetween]}>
            <Text style={components.upcomingPrayerText}>Upcoming Prayer</Text>
            <Text style={[components.upcomingPrayerTextInfo]}>{firstLetterUpper(visibleName)} at {visibleTime}</Text>
        </View>
        {isConnected && (
                  <View style={components.muteIconContainer}>
                  {enables[prayerName] ? (
                      <TouchableOpacity onPress={handleVolumeIconPress}>
                      <VolumeIcon width={layout.iconWidth + 4} height={layout.iconHeight + 4} style={{ color: colours.purple }} />
                      </TouchableOpacity>
                  ) : (
                      <TouchableOpacity onPress={handleMuteIconPress}>
                      <MuteIcon width={layout.iconWidth} height={layout.iconHeight} />
                      </TouchableOpacity>
                  )}
              </View>  
        )}
    </View>
    )
}

export default UpcomingPrayer;