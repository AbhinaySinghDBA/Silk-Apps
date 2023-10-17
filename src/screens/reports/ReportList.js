import React, { useState, useEffect, useLayoutEffect, useContext} from 'react';
import {View, LogBox, FlatList} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import RenderMetricsCard from '../../components/ReportComponents/ReportMetricsCard';
import { userDataContext } from '../Dashboard';

import SearchCompany from '../../components/SearchComponents/SearchCompany';
import SearchEmptyResult from '../../components/SearchComponents/SearchEmptyResult';
import constants from '../../styles/constants';
import styles from "../../styles/ReportStyles";
import RenderEmptyData from '../../components/RenderEmptyData';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { Logout } from '../../components/Logout';

const ReportList = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(userDataContext);
  const isFocused = useIsFocused();
  const { user_id, company_id, name } = route.params;
  const [yearValue, setYearValue] = useState(constants.currentYear);

  const [reportListData, setReportListData] = useState([]);
  const [reportListResponseData, setReportListResponseData] = useState([]);
  const [searchedKey, setSearchedKey] = useState('');
  const [searchResultsEmpty, setSearchResultsEmpty] = useState(false);

  const [swipeDirection, setSwipeDirection] = useState('');

  const { removeUserData } = Logout();
  useLayoutEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getMetrixData(constants.currentYear);

    return () => {
      setSearchResultsEmpty(false)
      , setIsLoading(false)
      , setReportListData([]), setReportListResponseData([])
    }
  }, [isFocused])

  const getMetrixData = (y) => {
    const headers = { 'Authorization': `Token ${userData.access_token}` };
    !!y && axios.get(`${constants.APIDatas.getMetricsListUrl}?company_id=${company_id}&year=${y}`, { headers })
      .then(function (response) {
        setReportListData(response.data.data.items);
        setReportListResponseData(response.data.data.items);
        setIsLoading(true);
      })
      .catch(function (error) {
        error.response.data.message == "Unauthorized!" && removeUserData();
        console.log('Reports List', error.response.data.message);
        error.response.data.message == "Metrics not found." && setReportListData([]);
        setReportListData([]);
        setReportListResponseData([]);
        setTimeout(() => { setIsLoading(true); }, 100);
      });

  };
  const renderListCard = ({ item, index }) => {
    return (
      <RenderMetricsCard item={item} index={index} user_id={user_id} name={name} metrixData={reportListData} company_id={company_id} swipeDirection={swipeDirection} setSwipeDirection={setSwipeDirection} />
    );
  };
  useEffect(() => {
    let filteredData = [];
    searchedKey != "" && (
      filteredData = (reportListResponseData).filter(x => x.name.toLowerCase().includes(searchedKey.toLowerCase())),
      setReportListData(filteredData),
      filteredData.length == 0 && setSearchResultsEmpty(true)
    );
    searchedKey == "" && !!reportListResponseData && (setReportListData(reportListResponseData), setSearchResultsEmpty(false));
  }, [searchedKey]);
  // useEffect(()=>{
  //   console.log('reportListResponseData',reportListResponseData.length)
  //   reportListResponseData.length > 0 && reportListResponseData.length <= 8 && lastLoadCount < 4 &&  (
  //     setLastLoadCount(lastLoadCount + 1),
  //     setYearValue(yearValue -1)
  //   )
  // },[reportListResponseData])
  const renderEmptyComponent = () => {
    return (
      <RenderEmptyData desc={"Metrics not available"} />
    );
  };

  // useEffect(() =>{
  //   // (setIsLoading(false),getMetrixData(yearValue));
  //   console.log('lastloadcount', lastLoadCount, yearValue,);
  //   lastLoadCount == 4 && yearValue == constants.currentYear ? null : getMetrixData(yearValue)
  // },[yearValue]);

  // useEffect(() =>{
  //   swipeDirection !="" && setIsLoading && 
  //   (console.log("List screen", swipeDirection),(swipeDirection == "left" ? setYearValue(yearValue -1) : (yearValue < constants.currentYear) && setYearValue(yearValue +1)), setSwipeDirection(""));
  // },[swipeDirection])

  // //Start Extra Data + Pagination
  // const [onEndReachedCalledDuringMomentum , setOnEndReachedCalledDuringMomentum] = useState(true);
  // const [lastLoadCount  , setLastLoadCount ] = useState(0);
  // const renderLoaderFooter = () => {
  //   // console.log('renderLoaderFooter', pageCount , lastLoadCount)
  //   return (
  //     <>
  //     {(onEndReachedCalledDuringMomentum && lastLoadCount < 4 && searchedKey == "") ?
  //       <View style={{ marginBottom: 30, marginTop: -50, alignItems: 'center' }}>
  //         {/* <ActivityIndicator size="large" color={themeStyles.PRIMARY_COLOR} /> */}
  //         <LottieView source={require('../../assets/Img/SilkLoader.json')} autoPlay loop style={{ width: 60, height: 60 }} />
  //       </View> : null
  //     }
  //     {/* {
  //       lastLoadCount == 4 && <View style={{flex:1, marginTop:0, marginBottom:0, alignItems: 'center' , justifyContent:'center'}}>
  //         <Text style={{marginBottom:60, fontSize:14, fontWeight:themeStyles.FONT_WEIGHT_MEDIUM}}>Reached End of the Result</Text>
  //       </View>
  //     } */}
  //     </>
  // )};
  // const loadMoreData = () => {
  //   !onEndReachedCalledDuringMomentum && lastLoadCount < 4 && searchedKey == "" &&
  //   (
  //     setLastLoadCount(lastLoadCount + 1),
  //     setYearValue(yearValue -1),
  //     setOnEndReachedCalledDuringMomentum(true)
  //   )
  // }

  return (
    !isLoading ?
      <View style={styles.loaderContainer}>
        <LottieView source={require('../../assets/Img/SilkLoader.json')} autoPlay loop style={styles.loader} />
      </View>
      :
      <View style={styles.reportListContainer} setSwipeDirection={setSwipeDirection}>
        <SearchCompany title="Metrics" searchedKey={searchedKey} setSearchedKey={setSearchedKey} placeholderText={"Search by metrics name"}
          yearValue={yearValue} setYearValue={setYearValue}
        />
        {
          searchResultsEmpty &&
          <SearchEmptyResult title={searchedKey} />
        }
        <FlatList
          keyboardShouldPersistTaps='always'
          style={styles.reportListFlatlistContainer}
          data={reportListData}
          extraData={reportListData}
          renderItem={renderListCard}
          keyExtractor={(item, index) => (item.id + item.name + item.current_year + index)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
        // ListFooterComponent={renderLoaderFooter}
        // onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
        // onEndReached={loadMoreData}
        // onEndReachedThreshold={0.8}
        />
      </View>
  );
};
ReportList.title = 'ReportList';
export default ReportList;