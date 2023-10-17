import React, { useLayoutEffect, useReducer, useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, View, TouchableOpacity, Platform, StatusBar } from "react-native";
import { actionCreators, reducer, initialState } from '../components/GlobalState'
import ScreenNavigator from '../routes/ScreenNavigator';
import themeStyles from '../styles/theme.styles';

export const userDataContext = createContext();

const Dashboard = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let jsonValue = null;
    async function GetUserStoredData() {
      try {
        jsonValue = await AsyncStorage.getItem('userVerifiedDetails');
        jsonValue != null ?
          (setUserData(JSON.parse(jsonValue)),
            jsonValue = JSON.parse(jsonValue),
            jsonValue.sms_consent && AsyncStorage.removeItem("UserEmail")
          ) : setUserData(null);
      } catch (e) {
        
      }
    }

    userData == null && GetUserStoredData();
    return () => {
      jsonValue = null;
    };
  }, [state]);

  return (
    <userDataContext.Provider value={{ userData: userData }} >
      <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE_COLOR} />
      {
        Platform.OS == 'android' &&
        <SafeAreaView style={{ flex: 1 }}>
          <ScreenNavigator />
        </SafeAreaView>
      }
      {
        Platform.OS == 'ios' && <ScreenNavigator />
      }
    </userDataContext.Provider>
  );
}

export default Dashboard;