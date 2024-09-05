import React, { createContext, useContext } from 'react';
import { useBluetooth } from '@/hooks/useBluetooth'; // Adjust the path as necessary

const BluetoothContext = createContext();

export const BluetoothProvider = ({ children }) => {
    const { devices, isScanning, startScan, stopScan, error, setError, connectToDevice, isConnectedToDevice } = useBluetooth();
    return (
        <BluetoothContext.Provider value={{ devices, isScanning, error, setError, startScan, stopScan, connectToDevice, isConnectedToDevice }}>
            {children}
        </BluetoothContext.Provider>
    );
};

export const useBluetoothContext = () => useContext(BluetoothContext);
