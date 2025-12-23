import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getToken } from '../services/userApi';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            const newSocket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', {
                auth: {
                    token
                },
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: Infinity
            });

            newSocket.on('connect', () => {
                console.log('Connected to server');
                setConnected(true);
            });

            newSocket.on('disconnect', (reason) => {
                console.log('Disconnected from server:', reason);
                setConnected(false);
            });

            newSocket.on('connect_error', (error) => {
                console.error('Connection error:', error);
                setConnected(false);
            });

            newSocket.on('reconnect', (attemptNumber) => {
                console.log('Reconnected to server after', attemptNumber, 'attempts');
                setConnected(true);
            });

            newSocket.on('reconnect_attempt', (attemptNumber) => {
                console.log('Reconnection attempt', attemptNumber);
            });

            newSocket.on('reconnect_error', (error) => {
                console.error('Reconnection error:', error);
            });

            newSocket.on('reconnect_failed', () => {
                console.error('Failed to reconnect to server');
                setConnected(false);
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, []);

    const value = {
        socket,
        connected
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};





