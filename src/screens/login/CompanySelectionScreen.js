import React, { useState, useEffect, useLayoutEffect, useContext} from 'react';
import {View,LogBox, ActivityIndicator,FlatList,StatusBar,Text,Platform} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import RenderCompanyCard from '../../components/ReportComponents/RenderCompanyCard';
import RenderEmptyData from '../../components/RenderEmptyData';
import { Logout } from '../../components/Logout';

import styles from '../../styles/ReportStyles';
import constants from '../../styles/constants';
import themeStyles from '../../styles/theme.styles';

const CompanySelectionScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = route.params;
//   console.log(route.params)
//   const { userData } = useContext(userDataContext);
  const isFocused = useIsFocused();

  const [reportData, setReportData] = useState([]);
  const [reportResponseData, setReportResponseData] = useState([]);
  const [searchedKey, setSearchedKey] = useState('');
  const [searchResultsEmpty, setSearchResultsEmpty] = useState(false);

  const { removeUserData } = Logout();
  useLayoutEffect(() => {
    getCompaniesListData();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    return () => {
      setSearchResultsEmpty(false)
    }
  }, [isFocused])
  const getCompaniesListData = () => {
    const headers = { 'Authorization': `Token ${userData.access_token}` }; // auth header with bearer token
    axios.get(`${constants.APIDatas.getCompaniesList}`, { headers })
      .then(function (response) {
        setReportData(response.data.data.items);
        setReportResponseData(response.data.data.items);
        setTimeout(() => { setIsLoading(true); }, 100);
      })
      .catch(function (error) {
        error.response.data.message == "Unauthorized!" && removeUserData();
        console.log(error.response.data);
        setReportData([]); setReportResponseData([]);
        setTimeout(() => { setIsLoading(true); }, 300);
      });
  }
  const renderReportsCard = ({ item, index }) => {
    return (
      <RenderCompanyCard item={item} index={index} dataLength={reportData.length} user_id={userData.user_id} screen={'Login'} userData={userData}/>
    );
  };
  useEffect(() => {
    let filteredData = [];
    searchedKey != "" && (
      filteredData = reportResponseData.filter(x => x.name.toLowerCase().includes(searchedKey.toLowerCase())),
      setReportData(filteredData),
      filteredData.length == 0 && setSearchResultsEmpty(true)
    );
    searchedKey == "" && reportResponseData.length > 0 && (setReportData(reportResponseData), setSearchResultsEmpty(false))
  }, [searchedKey]);

  const renderEmptyComponent = () => {
    return (
      <RenderEmptyData desc={'No Data Available'} />
    );
  };
  return (
    !isLoading ?
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={themeStyles.ACTIVITY_INDICATOR_COLOR} />
      </View>
      :
      <View style={[styles.reportScreenContainer,{marginTop:Platform.OS == 'ios' ? 60 : 20}]}>
        <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE_COLOR} />
        <Text style={{color:themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM, fontSize : 20, paddingVertical:20}}>Your Companies</Text>
        <FlatList
          keyboardShouldPersistTaps='always'
          style={{}}
          data={reportData}
          extraData={reportData}
          renderItem={renderReportsCard}
          keyExtractor={item => (item.id)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
  );
};
export default CompanySelectionScreen;
