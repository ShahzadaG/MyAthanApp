import { useState, useEffect, useContext } from 'react';
import { AppState } from 'react-native';
import PrayerTimesContext from '@/context/PrayerTimesContext';
import { BLEService } from '@/services/BluetoothLE/BluetoothLE';
import {atob, btoa} from 'react-native-quick-base64';

export const useBluetooth = (onError) => {
    const { 
        calculationMethod,
        juristicMethod,
        calculationMethodList,
        juristicMethodList,
        location,
        offsets,
        automaticDST,
        timeFormat24,
        posixTimezone,
        posixTimezoneTrigger,
        enables,
        athans,
        duaAfterAthan,
        brightness,
        automaticBrightness,
        volume,
        deviceName,
        fajrAthanList,
        athanList,
        setDeviceName,
        setDeviceId,
    } = useContext(PrayerTimesContext);

    const [devices, setDevices] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState();
    const [isConnectedToDevice, setIsConnectedToDevice] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const appStateListener = AppState.addEventListener('change', handleAppStateChange);
        return () => {
          // Cleanup the listener on component unmount
          appStateListener.remove();
        };
    }, [appState])

    const handleAppStateChange = (nextAppState) => {

        console.log(nextAppState);
        if (nextAppState === 'background') 
        {
            disconnectFromDevice();
        }
        
        setAppState(nextAppState);
      };

    const INSTRUCTIONS = {
        CALCULATION_METHOD: 'a',
        JURISTIC_METHOD: 'b',
        HIGH_LATITUDE_METHOD: 'c',
        LOCATION: 'd',
        OFFSETS: 'e',
        DEVICE_NAME: 'f',
        BRIGHTNESS: 'g',
        IS_AUTOMATIC_BRIGHTNESS: 'h',
        VOLUME: 'i',
        IS_24_HOUR_TIME: 'j',       
        IS_AUTOMATIC_DST: 'k',
        IS_DUA_AFTER_ATHAN: 'l',
        ATHAN_SELECTION: 'm',
        ATHAN_ENABLES: 'n',
        TIMEZONE: 'o',
        TIME: 'p'
    };

    const handleDeviceDisconnected = (error, device) => {
        setIsConnectedToDevice(false);
        stopScan();
        console.log("device disconnected");
    }

    const handleDeviceFound = (device) => {
        setDevices(prevDevices => {
            const deviceExists = prevDevices.some(prevDevice => prevDevice.id === device.id);
            if (deviceExists) {
                return prevDevices;
            } else {
                return [...prevDevices, device];
            }
        });
    };
    


    const scanError = (errorMessage) => {
        stopScan();
        setIsScanning(false);
        setError(errorMessage);
    };

    const startScan = () => {
        setIsScanning(true);
        setDevices([]);
        const allowedUUIDs = ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'];
        
        BLEService.initializeBLE()
            .then(() => BLEService.scanDevices(handleDeviceFound, allowedUUIDs))
            .catch(error => {
                console.error("Failed to initialize BLE or start scan:", error);
                scanError(error.message); // Handle the error accordingly
            });
    };
    

    const stopScan = () => {
        BLEService.stopDeviceScan();
        setIsScanning(false);
    };

    const connectToDevice = (device) => {

        BLEService.connectToDevice(device.id)
        .then(() => {
            setDeviceName(device.localName);
            setDeviceId(device.id);
            setIsConnectedToDevice(true);
            BLEService.onDeviceDisconnected(handleDeviceDisconnected);
        })
        .catch(error => {
            scanError(error);
        });
    };

    const disconnectFromDevice = () => {
        if (BLEService.getDevice())
            BLEService.disconnectDevice();
    }

    const sendData = async (data) => {
        console.log("sending data: " + data);

        if (!BLEService.getDevice()) {
            return;
        }

        const serviceUUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
        const characteristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
        const base64Data = btoa(data);

        try {
            await BLEService.writeCharacteristicWithResponseForDevice(serviceUUID, characteristicUUID, base64Data);
            console.log("Data sent successfully");
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    const sendDeviceName = (name) => {
        setDeviceName(name);
        const data = name + INSTRUCTIONS.DEVICE_NAME;
        sendData(data);
    };

    const sendBrightness = (value) => {
        const brightness = value.toString();
        const data = brightness + INSTRUCTIONS.BRIGHTNESS;
        sendData(data);
    };

    const sendIsAutomaticBrightness = (value) => {
        const isAutomaticBrightness = value ? "1" : "0";
        const data = isAutomaticBrightness + INSTRUCTIONS.IS_AUTOMATIC_BRIGHTNESS;
        sendData(data);
    };

    const sendVolume = (value) => {
        const volume = value.toString();
        const data = volume + INSTRUCTIONS.VOLUME;
        sendData(data);
    };

    const sendIs24HourTime = (value) => {
        const is24HourTime = value ? "1" : "0";
        const data = is24HourTime + INSTRUCTIONS.IS_24_HOUR_TIME;
        sendData(data);
    };

    const sendIsAutomaticDST = (value) => {
        const isAutomaticDST = value ? "1" : "0";
        const data = isAutomaticDST + INSTRUCTIONS.IS_AUTOMATIC_DST;
        sendData(data);
    };

    const sendLocation = (location) => {
        const latStr = location.latitude.toFixed(4);
        const lngStr = location.longitude.toFixed(4);
        const data = latStr + ":" + lngStr + INSTRUCTIONS.LOCATION;
        sendData(data);
    };

    const sendCalculationMethod = (methodIndex) => {
        const calculationMethod = methodIndex.toString();
        const data = calculationMethod + INSTRUCTIONS.CALCULATION_METHOD;
        sendData(data);
    };

    const sendJuristicMethod = (methodIndex) => {
        const juristicMethod = methodIndex.toString();
        const data = juristicMethod + INSTRUCTIONS.JURISTIC_METHOD;
        sendData(data);
    };

    const sendHighLatitudeMethod = (methodIndex) => {
        const highLatitudeMethod = methodIndex.toString();
        const data = highLatitudeMethod + INSTRUCTIONS.HIGH_LATITUDE_METHOD;
        sendData(data);
    };

    const sendIsDuaAfterAthan = (value) => {
        const isDuaAfterAthan = value ? "1" : "0";
        const data = isDuaAfterAthan + INSTRUCTIONS.IS_DUA_AFTER_ATHAN;
        sendData(data);
    };

    const sendOffsets = (offsets) => {
        const offsetStr = Object.values(offsets).join(":");
        const data = offsetStr + INSTRUCTIONS.OFFSETS;
        sendData(data);
    };

    const sendAthanSelection = (selection) => {
        const indexStr = [
            fajrAthanList.indexOf(selection.fajr),
            athanList.indexOf(selection.dhuhr),
            athanList.indexOf(selection.asr),
            athanList.indexOf(selection.maghrib),
            athanList.indexOf(selection.isha),
          ].join(":");
          
        const data = indexStr + INSTRUCTIONS.ATHAN_SELECTION;
        sendData(data);
    };

    const sendAthanEnables = (enables) => {
        const valueBinaryStr = Object.values(enables)
        .map(value => value ? '1' : '0')
        .join("");

        const valueDecimal = parseInt(valueBinaryStr, 2);
        const data = valueDecimal + INSTRUCTIONS.ATHAN_ENABLES;
        sendData(data);
    };

    const sendPosixTimezone = (timezone) => {
        const data = timezone + INSTRUCTIONS.TIMEZONE;
        sendData(data);
    };

    const sendTime = () => {
        const now = new Date();

        now.setHours(12 + 4);
        now.setMinutes(54);
        now.setSeconds(45);

        const timeString = Math.floor(now.getTime() / 1000).toString();
        const data = timeString + INSTRUCTIONS.TIME;
        sendData(data);
    };

    useEffect(() => {
        if (calculationMethod != null) {
            const index = calculationMethodList.indexOf(calculationMethod);
            sendCalculationMethod(index);
        }
    }, [calculationMethod]);

    useEffect(() => {
        if (juristicMethod != null) {
            const index = juristicMethodList.indexOf(juristicMethod);
            sendJuristicMethod(index);
        }
    }, [juristicMethod]);

    useEffect(() => {
        sendTime();
        if (location != null) {
            sendLocation(location);
        }
    }, [location]);

    useEffect(() => {
        if (offsets != null) {
            sendOffsets(offsets);
        }
    }, [offsets]);

    // useEffect(() => {
    //     if (DST != null) {
    //         sendIsDST(DST);
    //     }
    // }, [DST]);

    useEffect(() => {
        if (automaticDST != null) {
            sendIsAutomaticDST(automaticDST);
        }
    }, [automaticDST]);

    useEffect(() => {
        if (timeFormat24 != null) {
            sendIs24HourTime(timeFormat24);
        }
    }, [timeFormat24]);

    useEffect(() => {
        if (posixTimezone != null) {
            sendPosixTimezone(posixTimezone);
        }
    }, [posixTimezoneTrigger]);

    useEffect(() => {
        if (enables != null) {
            sendAthanEnables(enables);
        }
    }, [enables]);

    useEffect(() => {
        if (athans != null) {
            sendAthanSelection(athans);
        }
    }, [athans]);

    useEffect(() => {
        if (duaAfterAthan != null) {
            sendIsDuaAfterAthan(duaAfterAthan);
        }
    }, [duaAfterAthan]);

    useEffect(() => {
        if (brightness != null) {
            sendBrightness(brightness);
        }
    }, [brightness]);

    useEffect(() => {
        if (automaticBrightness != null) {
            sendIsAutomaticBrightness(automaticBrightness);
        }
    }, [automaticBrightness]);

    useEffect(() => {
        if (volume != null) {
            sendVolume(volume);
        }
    }, [volume]);

    useEffect(() => {
        if (deviceName != null) {
            sendDeviceName(deviceName);
        }
    }, [deviceName]);

    return {
        devices,
        isScanning,
        error,
        setError,
        startScan,
        stopScan,
        connectToDevice,
        isConnectedToDevice
    };
};
