import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
import PrayTimesWrapper from './services/localPrayerTimes/PrayTimesWrapper';
import PrayerTimesProvider from './context/PrayerTimesProvider';
import { BluetoothProvider } from '@/context/BluetoothContext'; // Adjust the path as necessary
import './translations';
const queryClient = new QueryClient();
export const storage = new MMKV();
import Toast from 'react-native-toast-message';

function App() {
    return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider storage={storage}>
						<PrayerTimesProvider>
							<PrayTimesWrapper />
							<BluetoothProvider>
								<ApplicationNavigator />
							</BluetoothProvider>
						</PrayerTimesProvider>
				</ThemeProvider>
			</QueryClientProvider>
			<Toast />
		</>
		);
}
export default App;

