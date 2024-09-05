import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Easing } from 'react-native';
import { Home, Startup, AthanSettings, ClockSettings } from '@/screens';
import CalculationMethodScreen from '@/components/template/CalculationMethodSelection';
import JuristicMethodScreen from '@/components/template/JuristicMethodSelection';
import AthanOffsetScreen from '@/components/molecules/AthanOffsets';
import PrayerAdjustmentScreen from '@/screens/AthanSelection';
import BackIcon from '@/theme/assets/images/arrow_back.svg';
import { useTheme } from '@/theme';

const Stack = createStackNavigator();

function ApplicationNavigator() {
    const { variant, gutters } = useTheme();

    return (
        <NavigationContainer>
            <Stack.Navigator
                key={variant}
                screenOptions={({ navigation }) => ({
                    headerMode: 'screen',
                    headerTintColor: 'black',
                    headerStyle: styles.header,
                    headerTitleStyle: styles.headerTitleText,
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={gutters.paddingHorizontal_16}>
                                <BackIcon width={24} height={24} />
                            </View>
                        </TouchableOpacity>
                    ),
                })}
            >
                <Stack.Screen name="Startup" component={Startup} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Athan Settings" component={AthanSettings} />
                <Stack.Screen name="Clock Settings" component={ClockSettings} />
                <Stack.Screen name="Calculation Method" component={CalculationMethodScreen} />
                <Stack.Screen name="Juristic Method" component={JuristicMethodScreen} />
                <Stack.Screen name="Athan Selection" component={PrayerAdjustmentScreen} />
                <Stack.Screen name="Athan Offset" component={AthanOffsetScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerTitleText: {
        color: '#333',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    header: {
        backgroundColor: '#EAEBF3',
        borderBottomWidth: 0, // Removes the border line
        elevation: 0, // Removes shadow on Android
    },
    tabBarStyle: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
});

export default ApplicationNavigator;
