import React, { useState, useEffect, useLayoutEffect, useContext,createContext} from 'react';
import {View, Text, LogBox, ActivityIndicator,Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import VitalStatsCards from '../../components/OrganizationComponents/VitalStatsCards';
import { Logout } from '../../components/Logout';
import { userDataContext } from '../Dashboard';

import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/OrganizationStyles';
import constants from '../../styles/constants';

const DataContext = createContext();
  const VitalStatsTab = () => {
    const companyProfileData = useContext(DataContext);
    return <VitalStatsCards companyProfileData = {companyProfileData}/>
  }
  
  const renderScene = SceneMap({
    first: VitalStatsTab,
  });
  const initialLayout = { width: constants.screenWidth };
const CompanyProfile = ({ route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const {userData} = useContext(userDataContext);
    const {user_id, company_id, name, logo, desc} = route.params;
    const [companyProfileData, setCompanyProfileData] = useState([]);
    const [index, setIndex] = React.useState(0);
    const {removeUserData} = Logout();
    const [routes] = React.useState([
      { key: 'first', title: 'Vital stats' },
    ]);
    const navigation = useNavigation();
    useEffect(()=>{
      index == 2 && (
        navigation.navigate('ReportList', {"user_id": user_id, "company_id": company_id, "name":name}),
        setTimeout(() => { setIndex(0) }, 500)
      )
    },[index])
    useLayoutEffect(()=>{
        async function getUserData() {
            getCompanyProfile();
        }
        getUserData();
        
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        return () => {
          setIndex(0); setCompanyProfileData([]);
        }
    }, [])

    const getCompanyProfile = () =>{
        const headers = { 'Authorization': `Token ${userData.access_token}` }; // auth header with bearer token
        axios.get(`${constants.APIDatas.getCompaniesProfileDataUrl}/${company_id}`, { headers })
          .then(function (response) {
            setCompanyProfileData(response.data.data.item);
            setTimeout(() => { setIsLoading(true); }, 300);
          })
          .catch(function (error) {
            error.response.data.message == "Unauthorized!" && removeUserData();
            console.log(error.response.data);
          });
    }
    let companyLogo = constants.BucketName + logo;
    return (
        !isLoading ?
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={themeStyles.ACTIVITY_INDICATOR_COLOR} />
            </View>
            :
            <DataContext.Provider value={companyProfileData}>
                <View style={styles.companyProfileHeaderContainer}>
                    <View style={styles.companyLogoContainer}>
                        <Image source={{uri: companyLogo }} style={styles.companyLogo} resizeMode='cover' />
                    </View>
                    <View style={styles.companyTitleContainer}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.companyTitle}>{name}</Text>
                        {!!companyProfileData.short_introduction && companyProfileData.short_introduction != "" && companyProfileData.short_introduction != null && <Text ellipsizeMode='tail' numberOfLines={1} style={styles.companyDesc}>{companyProfileData.short_introduction}</Text>}
                    </View>
                </View>
                <TabView
                    lazy
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    showPageIndicator={true}
                    scrollEnabled
                    renderTabBar={props => 
                        <TabBar 
                            {...props}
                            scrollEnabled
                            renderLabel={({ route,focused, color }) => (
                                focused ? 
                                <Text style={styles.tabHeaderFocussedStyle}>
                                    {route.title}
                                </Text>
                                :
                                <Text style={styles.tabHeaderStyle}>
                                    {route.title}
                                </Text>
                            )}
                            indicatorStyle={styles.indicatorStyle}
                            // indicatorStyle={{ backgroundColor: themeStyles.PRIMARY_COLOR, padding: 0, marginBottom: 0,}}
                            style={styles.tabViewStyle}
                            tabStyle={styles.tabStyle}
                            labelStyle={styles.labelStyle}
                        />
                    }
                />
            </DataContext.Provider>
    );
};
export default CompanyProfile;