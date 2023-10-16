import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "react-native-splash-screen";

import Login from '../screens/login/Login';
// import Dashboard from "../screens/Dashboard";
// import CompanySelectionScreen from '../screens/login/CompanySelectionScreen';

import theme from "../styles/theme.styles";

export const AuthContext = React.createContext();


function SplashScreenLocal() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={theme.ACTIVITY_INDICATOR_COLOR} animating/>
        </View>
    );
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff'
    },
  };
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
    
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                        isLoggedin: action.loggegIn
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        isLoggedin: true
                    };
                case 'SIGN_OUT':
                 
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        isLoggedin: true
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            isLoggedin: null
        }
    );

    const onLoadAsync = async () => {
        let userToken;
        let userNumber;
        try {
            userToken = await AsyncStorage.getItem('userVerifiedDetails');
            userNumber = await AsyncStorage.getItem('UserPhoneNumber')
            // console.log('route', userToken, userNumber)
            if (userToken != null) {
                let userData = JSON.parse(userToken);
                let _phNumber = JSON.parse(userNumber);
               
                if (!!userData ){
                    dispatch({ type: 'RESTORE_TOKEN', token: userToken, isLoggedin:_phNumber });
                }
                else{
                   
                    userNumber != null ? dispatch({ type: 'RESTORE_TOKEN', token: null, isLoggedin: _phNumber }) : dispatch({ type: 'RESTORE_TOKEN', token: null });
                }
            } 
            else if (userNumber != null) { 
                
                dispatch({ type: 'RESTORE_TOKEN', token: null, isLoggedin: userNumber  }) 
            }
            else dispatch({ type: 'RESTORE_TOKEN', token: null });
            // userToken = await SecureStore.getItemAsync('userToken');
        } catch (e) {  console.log('main',e) }
        //  dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };


    useEffect(() => {
        onLoadAsync();
    }, []);

    
    useLayoutEffect(()=>{
        SplashScreen.hide();
    },[]);
    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT', loggegIn: true }),
            signUp: async (data) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer  theme={MyTheme}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        backgroundColor: '#fff'
                    }}
                    
                    >
                    {state.isLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreenLocal} />
                    ) : 
                    state.userToken == null ? 
                    <>
                    <Stack.Screen name='Login' component={Login} options={{orientation: 'portrait',}}/>
                    {/* <Stack.Screen name='CompanySelectionScreen' component={CompanySelectionScreen} options={{orientation: 'portrait',}}/> */}
                    </>
                     : 
                    // <Stack.Screen name='Dashboard' component={Dashboard}  options={{orientation: 'portrait',}}/>
                    <></>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
