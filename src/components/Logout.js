import React, {useContext} from 'react';
import { AuthContext } from '../routes/Router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Logout = () => {
    const { signOut } = useContext(AuthContext);
    const removeUserData = () => (AsyncStorage.removeItem("userVerifiedDetails"), signOut(), console.log('Logged out successfully'));
    return { removeUserData };
};