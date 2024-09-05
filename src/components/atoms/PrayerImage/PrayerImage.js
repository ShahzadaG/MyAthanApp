import FajrImage from '@/theme/assets/images/fajr.svg';
import DhuhrImage from '@/theme/assets/images/dhuhr.svg';
import AsrImage from '@/theme/assets/images/asr.svg';
import MaghribImage from '@/theme/assets/images/maghrib.svg';
import IshaImage from '@/theme/assets/images/isha.svg';
import Background from '@/theme/assets/images/bg_design_1.svg';
import { View } from 'react-native';

import { useTheme } from '@/theme';

function PrayerImage({ prayer }) {
    const { layout } = useTheme();

    const prayerImageMap = {
        "fajr": FajrImage,
        "dhuhr": DhuhrImage,
        "asr": AsrImage,
        "maghrib": MaghribImage,
        "isha": IshaImage,
    };

    let SelectedImage = prayerImageMap["fajr"];

    if(prayer != null)
        prayerImageMap[prayer];
   
    return (
        <View>
        <Background style={layout.absolute} width={layout.screenWidth} height={layout.screenWidth * (383 / 375)}/>
        <SelectedImage width={layout.screenWidth + 5} height={layout.screenWidth * (345 / 375)} />
        </View>
    )
}

export default PrayerImage;
