import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, LogBox, ActivityIndicator, FlatList, StatusBar } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/ReportStyles';
import axios from 'axios';
import constants from '../../styles/constants';
import RenderCompanyCard from '../../components/ReportComponents/RenderCompanyCard';
import { userDataContext } from '../Dashboard';

import SearchCompany from '../../components/SearchComponents/SearchCompany';
import SearchEmptyResult from '../../components/SearchComponents/SearchEmptyResult';

import RenderEmptyData from '../../components/RenderEmptyData';
import { Logout } from '../../components/Logout';
const Reports = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(userDataContext);
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
    const _cId = userData.company_id || null;
    axios.get(`${constants.APIDatas.getCompaniesList}?company_id=${_cId}`, { headers })
      .then(function (response) {
        let _response = response.data.data.items;
        if (userData.user_type_id == 3) {
          let filteredResponse = _response.filter(x => x.id == userData.company_id)
          setReportData(filteredResponse);
          setReportResponseData(filteredResponse);
        }
        else {
          setReportData(_response);
          setReportResponseData(_response);
        }

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
      <RenderCompanyCard item={item} index={index} dataLength={reportData.length} user_id={userData.user_id} />
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
      <View style={styles.reportScreenContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE_COLOR} />
        <SearchCompany title="Companies" searchedKey={searchedKey} setSearchedKey={setSearchedKey} />
        {
          searchResultsEmpty &&
          <SearchEmptyResult title={searchedKey} />
        }
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
export default Reports;
