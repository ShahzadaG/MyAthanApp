import { Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/theme';

function ButtonVariant({ onPressCallback, text, colour, Icon }) {
    const { layout, components } = useTheme();
   
    return (
        <TouchableOpacity onPress={onPressCallback} style={[components.button, { backgroundColor: colour }]}>
            <Icon width={layout.iconWidth} height={layout.iconHeight} />
            <Text style={components.buttonText}>{text}</Text>
        </TouchableOpacity>
        )
}

export default ButtonVariant;