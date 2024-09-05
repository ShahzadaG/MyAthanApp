import React, { useEffect, useState, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useBluetoothContext } from '@/context/BluetoothContext';
import PrayerTimesContext from '@/context/PrayerTimesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/theme';
import { clear } from 'console';

const DeviceSelectionModal = () => {
    const { colors, layout, components, gutters } = useTheme();
    const { devices, isScanning, stopScan, error, setError, connectToDevice } = useBluetoothContext();
    const { setPrayerTimesData } = useContext(PrayerTimesContext);

    const showToastError = (error) => {
        // Assuming 'toast' is defined somewhere in your context or it's a part of a library
        toast.show(`Failed to connect: ${error}`, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 10,
            animationType: "zoom-in",
        });
    }

    useEffect(() => {
        if (error) {
            console.log(error);  
            setError(null);
        }
    }, [error, setError]);

    const onModalClose = () => {
        stopScan(); // Properly stopping scan when modal closes
    };

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
        console.log("clearing storage");
    };
    
    const onDeviceSelect = async (selectedDevice) => {
        stopScan();
        connectToDevice(selectedDevice);

        // clearAsyncStorage();

        // return;
        const loadedData = await loadDeviceSpecificStorage(selectedDevice.id);
        if (loadedData !== null) {
            setPrayerTimesData(loadedData);
            console.log("DEVICE ID: " + JSON.stringify(loadedData));
        }
    };

    const loadDeviceSpecificStorage = async (deviceId) => {
        try {
            const storedPrayerTimes = await AsyncStorage.getItem(deviceId);
            if (storedPrayerTimes !== null) {
                return JSON.parse(storedPrayerTimes);
            }
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            throw new Error('Failed to fetch prayer times');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={components.deviceItem} onPress={() => onDeviceSelect(item)}>
            <Text style={components.deviceName}>{item.localName}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isScanning}
            onRequestClose={onModalClose}
        >
            <View style={components.centeredView}>
                <View style={components.modalView}>
                    <Text style={components.title}>Select a Device</Text>
                    <FlatList
                        data={devices}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                    <TouchableOpacity style={components.button2} onPress={onModalClose}>
                        <Text style={components.buttonText2}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default DeviceSelectionModal;
