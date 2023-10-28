import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, ScrollView, LogBox, ActivityIndicator, TouchableOpacity, Image, TextInput, Platform, processColor, KeyboardAvoidingView, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { userDataContext } from '../Dashboard';
import { Grid1, StatusUp, Send, ArrowCircleLeft, ArrowCircleRight } from 'iconsax-react-native';
import ReportDetailListViewCard from '../../components/ReportComponents/ReportDetailListViewCard';
import RenderMetricsCard from '../../components/ReportComponents/ReportMetricsCard';
import BottomModal from '../../components/BottomModal';
import CombinedCharts from '../../components/ReportComponents/CombinedCharts';
import GraphTypeSelectionCard from '../../components/ReportComponents/GraphTypeSelectionCard';
import Swipeable from '../../components/ReportComponents/Swipeable';
import { Logout } from '../../components/Logout';



import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/ReportDetailStyles';
import constants from '../../styles/constants';


const ReportDetails = ({ navigation, route }) => {
  const { user_id, type_id, name, type, company_id, periodicity_id, current_year } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(userDataContext);
  const isFocused = useIsFocused();

  const [viewType, setViewType] = useState('List');
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [reportListData, setReportListData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const [yearValue, setYearValue] = useState(current_year);
  const [firstDataYear, SetFirstDataYear] = useState(current_year - 10)
  const [listInrDenominationDetails, setListInrDenominationDetails] = useState([]);
  const [compareWith, setCompareWith] = useState('');

  const [compareMetrixListLength, setCompareMetrixListLength] = useState([]);

  const [swipeDirection, setSwipeDirection] = useState('');
  // Modal
  const [showMetrixModal, setShowMetrixModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showGraphSelectionModal, setShowGraphSelectionModal] = useState(false);


  // Chart Variables
  const [labelArray, setLabelArray] = useState([]);
  const [labelArrayLandscape, setLabelArrayLandscape] = useState([]);
  const [metricDetailArray, setMetricDetailArray] = useState([]);
  const [firstDataSet, setFirstDataSet] = useState([]);
  const [secondDataSet, setSecondDataSet] = useState([]);
  const [axisLength, setAxisLength] = useState(12);

  const [chartType, setChartType] = useState(1);
  const [colorArray, setColorArray] = useState([]);
  const [colorArray2, setColorArray2] = useState([]);
  const [lineCircleColor, setLineCircleColor] = useState([]);
  // Chat 
  const [chatMessage, setChatMessage] = useState('');
  const [chatInfo, setChatInfo] = useState([]);
  const [chatMetricId, setChatMetricId] = useState(1);
  const [metricDetailId, setMetricDetailId] = useState(0);

  const [showChatInfo, setShowChatInfo] = useState(false);
  const [chatMetric, setChatMetric] = useState("");
  const [isCommented, setIsCommented] = useState(false);

  const { removeUserData } = Logout();
  useLayoutEffect(() => {
    setReportsData();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    return () => {
      setSelectedType(''); setCompareWith(''); setChatMessage(''); setSelectedTypeId(0); setSwipeDirection("");
      setReportData([]); setReportListData([]);
    };
  }, [isFocused])

  const setReportsData = async (y) => {
    const headers = { 'Authorization': `Token ${userData.access_token}` };
    axios.get(`${constants.APIDatas.getMetricsDetailUrl}/mobile?company_id=${company_id}&company_metric_ids=${type_id}&year=${!!y ? y : current_year}`, { headers })
      .then(function (response) {
        !!response.data.data.item && SetFirstDataYear(response.data.data.item.data_available_from || 2005);
        
        if (!!response.data.data.items) {
          setReportData(response.data.data.items.report);
          setReportListData(response.data.data.items);
          setListInrDenominationDetails({ denominationType1: response.data.data.items.unit == "Percentage" ? "%" : "" })
          // Set Chart Data
          let _labelArray = []; let _dataArray = []; let _labelArrayLandscape = []; let _markerArray = []; let _metricDetailArray = [];
          _labelArray.push(""); _labelArrayLandscape.push(""); _dataArray.push(0); _metricDetailArray.push(0); _markerArray.push(processColor('transparent'));

          response.data.data.items.report.map((item) => {
            let label = getLabel(item.label);
            let _label = !item.is_year ? (label.includes("-") ? item.label : item.label.substring(0, 3)) : "Jan-Dec";
            let _shortLabel = !item.is_year ? (label.includes("-") ? label + " '" + item.year.slice(-2) : item.label.substring(0, 1) + " '" + item.year.slice(-2)) : "J-D" + item.year.slice(-2);
            _labelArray.push(_shortLabel);
            _labelArrayLandscape.push(_label);
            _dataArray.push(Math.round(item.amount));

            let _mItem = item.is_comment ? processColor(themeStyles.CHART_YELLOW) : processColor(themeStyles.CHART_YELLOW_50);
            _markerArray.push(_mItem);
            _metricDetailArray.push(item.metric_detail_id)
          })
          setLabelArray(_labelArray), setFirstDataSet(_dataArray), setAxisLength(response.data.data.items.report.length), setLabelArrayLandscape(_labelArrayLandscape), setColorArray(_markerArray), setMetricDetailArray(_metricDetailArray), compareWith != "",
            setTimeout(() => { setIsLoading(true); }, 300);
        }
        else {
          setReportData([]), setReportListData([])
        }
      })
      .catch(function (error) {
        error.response.data.message == "Unauthorized!" && removeUserData();
        console.log(error.response.data);
      });
  }
  const getLabel = (item) => {
    let _shortLabel = "";
    switch (item) {
      case 'Jan - Mar':
        _shortLabel = "J-M";
        break;
      case 'Apr - Jun':
        _shortLabel = "A-J";
        break;
      case 'Jul - Sep':
        _shortLabel = "J-S";
        break;
      case 'Oct - Dec':
        _shortLabel = "O-D";
        break;
      default:
        _shortLabel = item.substring(0, 3);
        break;
    }
    return (_shortLabel);
  };
  const renderDetailCard = (item, index) => {
    return (
      <ReportDetailListViewCard item={item} index={index} dataLength={reportData.length} user_id={user_id} name={name} key={index + item.label}
        listInrDenominationDetails={listInrDenominationDetails}
        compareWith={compareWith} setChatMetricId={setChatMetricId} setShowChatInfo={setShowChatInfo} setChatMetric={setChatMetric} />
    );
  };
  const renderListCard = (item, index) => {
    return (
      <RenderMetricsCard item={item} index={index} user_id={user_id} name={name} key={"metrics-" + item.id} viewType={viewType} selectedType={selectedType} setSelectedType={setSelectedType} setSelectedTypeId={setSelectedTypeId} metrixData={metricsData} />
    );
  };

  const renderFlatListCard = ({ item, index }) => {
    return (
      <RenderMetricsCard item={item} index={index} user_id={user_id} name={name} viewType={viewType} selectedType={selectedType} setSelectedType={setSelectedType} setSelectedTypeId={setSelectedTypeId} metrixData={metricsData} />
    );
  };
  const renderGraphSelectionCard = (item, index) => {
    return (
      <GraphTypeSelectionCard item={item} index={index} key={"graphType-" + item.id} selectedType={chartType} setSelectedType={setChartType} />
    );
  };
  const compareMetricsListView = (y) => {
    setIsLoading(false);
    if (selectedType != "Budget Value") {
      viewType == 'List' && (setShowMetrixModal(false));
      const headers = { 'Authorization': `Token ${userData.access_token}` };
      axios.get(`${constants.APIDatas.getMetricsDetailUrl}/mobile?company_id=${company_id}&company_metric_ids=${type_id},${selectedTypeId}&year=${!!y ? y : current_year}`, { headers })
        .then(function (response) {
          !!response.data.data.item && SetFirstDataYear(response.data.data.item.data_available_from || 2005);
          let _response = response.data.data.items;
          // Call APi to get comparision data & update 
          setListInrDenominationDetails({ denominationType1: _response.unit == "Percentage" ? "%" : "", denominationType2: _response.unit2 == "Percentage" ? "%" : "" })
          setReportData(_response.report);
          setReportListData(_response);

          async function setCompareReportsData() {
            let _labelArray = []; let _dataArray = []; let _labelArrayLandscape = []; let _colorArray1 = []; let _colorArray2 = []; let _metricDetailArray = []; let _lineCircleColorArray = [];
            let _dataArray2 = [];
            _labelArray.push(""); _metricDetailArray.push(0); _colorArray1.push(processColor('transparent')); _colorArray2.push(processColor('transparent'));
            _labelArrayLandscape.push(""); _dataArray.push(0); _dataArray2.push(0);
            _response.report.map((item) => {
              let label = getLabel(item.label);
              let _label = !item.is_year ? (label.includes("-") ? item.label + item.year.slice(-2) : item.label.substring(0, 3) + item.year.slice(-2)) : "Jan-Dec " + item.year.slice(-2);
              let _shortLabel = !item.is_year ? (label.includes("-") ? label + " '" + item.year.slice(-2) : item.label.substring(0, 1) + " '" + item.year.slice(-2)) : "J-D" + item.year.slice(-2);
              _labelArray.push(_shortLabel);
              _labelArrayLandscape.push(_label);
              _dataArray.push(Math.round(item.amount));
              _dataArray2.push(item.amount2 != 0 ? Math.round(item.amount2) : null);
              _colorArray1.push(item.is_comment ? processColor(themeStyles.CHART_YELLOW) : processColor(themeStyles.CHART_YELLOW_50));
              _colorArray2.push(item.is_comment2 ? processColor(themeStyles.CHART_BLUE) : processColor(themeStyles.CHART_BLUE_50));
              _lineCircleColorArray.push(item.is_comment2 ? processColor("red") : processColor(themeStyles.CHART_BLUE_50));
            
              let _mData = {
                "amount": item.amount,
                "amount2": item.amount2,
                "mid": item.metric_detail_id,
                "mid2": item.metric_detail_id2
              }
              
              _metricDetailArray.push(_mData);
            }),
            
              setFirstDataSet(_dataArray), setSecondDataSet(_dataArray2), setLabelArray(_labelArray), setLabelArrayLandscape(_labelArrayLandscape), setColorArray(_colorArray1), setColorArray2(_colorArray2), setLineCircleColor(_lineCircleColorArray), setMetricDetailArray(_metricDetailArray);
          }

          setCompareReportsData()
          setCompareWith(selectedType);
          setTimeout(() => { setIsLoading(true); }, 300);
          viewType == 'Chart' ? setShowGraphSelectionModal(true) : setShowMetrixModal(false);
        })
        .catch(function (error) {
          error.response.data.message == "Unauthorized!" && removeUserData();
          console.log(error.response.data);
        });
    }
    else {
      viewType == 'List' && (setShowMetrixModal(false));
      setTimeout(() => { setIsLoading(true); }, 100);
    }
  };
  const AddMetricsToCompare = () => {
    const headers = { 'Authorization': `Token ${userData.access_token}` };
    axios.get(`${constants.APIDatas.getMetricsListUrl}?company_id=${company_id}&year=${yearValue}`, { headers })
      .then(function (response) {
        let _Array = []
        response.data.data.items.map((item, index) => item.id != type_id && item.periodicity_id == periodicity_id && _Array.push(item));
        setMetricsData(_Array);
        setCompareMetrixListLength(_Array.length);
        setShowMetrixModal(true)
        setIsLoading(true);
      })
      .catch(function (error) {
        error.response.data.message == "Unauthorized!" && removeUserData();
        console.log('Reports List', error.response.data);
        setMetricsData([]); setCompareMetrixListLength(0); setShowMetrixModal(true);
      });
  }

  const AddBudgetToCompare = (y) => {
    setIsLoading(false);
    viewType == 'List' && (setShowMetrixModal(false));
    const headers = { 'Authorization': `Token ${userData.access_token}` };

    axios.get(`${constants.APIDatas.getMetricsDetailUrl}/?company_id=${company_id}&company_metric_ids=${type_id}&year=${!!y ? y : current_year}&budget_comparison=1`, { headers })
      .then(function (response) {
        if (!!response.data.data.items) {
          !!response.data.data.item && SetFirstDataYear(response.data.data.item.data_available_from || 2005);
          let _data = response.data.data.items[0];
          _data.metric_id = _data.id;
          _data.type_name = _data.name;
          _data.unit = _data.unit_name;
          _data.currency = _data.currency_name;
          _data.denomination = _data.denomination_name;
          _data.report = _data.values;

          setReportData(response.data.data.items[0].values);
          setReportListData(_data);
          let _response = response.data.data.items[0];
          setListInrDenominationDetails({ denominationType1: _response.unit_name == "Percentage" ? "%" : "", denominationType2: _response.unit_name == "Percentage" ? "%" : "" })

          async function setCompareReportsData() {
            let _labelArray = []; let _dataArray = []; let _labelArrayLandscape = []; let _colorArray1 = []; let _colorArray2 = []; let _metricDetailArray = []; let _lineCircleColorArray = [];
            let _dataArray2 = [];
            _labelArray.push(""); _metricDetailArray.push(0); _colorArray1.push(processColor('transparent')); _colorArray2.push(processColor('transparent'));
            _labelArrayLandscape.push(""); _dataArray.push(0); _dataArray2.push(0);
            _response.report.map((item) => {
              let label = getLabel(item.label);
              let _label = !item.is_year ? (label.includes("-") ? item.label + item.year.slice(-2) : item.label.substring(0, 3) + item.year.slice(-2)) : "Jan-Dec " + item.year.slice(-2);
              let _shortLabel = !item.is_year ? (label.includes("-") ? label + " '" + item.year.slice(-2) : item.label.substring(0, 1) + " '" + item.year.slice(-2)) : "J-D" + item.year.slice(-2);
              _labelArray.push(_shortLabel);
              _labelArrayLandscape.push(_label);
              _dataArray.push(Math.round(item.current_value));
              _dataArray2.push(item.budget_value != 0 ? Math.round(item.budget_value) : null);
              _colorArray1.push(item.is_comment ? processColor(themeStyles.CHART_YELLOW) : processColor(themeStyles.CHART_YELLOW_50));
              _colorArray2.push(processColor(themeStyles.CHART_BLUE_50));
              _lineCircleColorArray.push(processColor(themeStyles.CHART_BLUE_50));
            
              let _mData = {
                "amount": item.current_value,
                "amount2": item.budget_value,
                "mid": item.metric_detail_id,
                "mid2": item.metric_detail_id
              }
              _metricDetailArray.push(_mData);
            }),
              setFirstDataSet(_dataArray), setSecondDataSet(_dataArray2), setLabelArray(_labelArray), setLabelArrayLandscape(_labelArrayLandscape), setColorArray(_colorArray1), setColorArray2(_colorArray2), setLineCircleColor(_lineCircleColorArray), setMetricDetailArray(_metricDetailArray);
          }

          setCompareReportsData()
          setSelectedType("Budget Value");
          setCompareWith("Budget Value");
          setTimeout(() => { setIsLoading(true); }, 300);
          viewType == 'Chart' ? setShowGraphSelectionModal(true) : setShowMetrixModal(false);

        }
        else {
          setReportData([]), setReportListData([])
        }

      })
      .catch(function (error) {
        error.response.data.message == "Unauthorized!" && removeUserData();
        console.log(error.response.data);
      });
  }
  const yearFilter = (e) => {
    setIsLoading(false);
    let filteredYearValue = e == 'left' ? yearValue - 1 : yearValue + 1;
    setYearValue(filteredYearValue);
    compareWith == "" ? setReportsData(filteredYearValue) : compareWith != "Budget Value" ? compareMetricsListView(filteredYearValue) : AddBudgetToCompare(filteredYearValue);
  }

  useEffect(() => {
    swipeDirection == "left" && isLoading && (yearFilter(swipeDirection));
    swipeDirection == "right" && yearValue != constants.currentYear && isLoading && yearFilter(swipeDirection);
    setSwipeDirection("");
  }, [swipeDirection])

  const ShowChatInfoModal = () => {
    const headers = { 'Authorization': `Token ${userData.access_token}` };
    // console.log('mDetailId', chatMetricId,metricDetailId)
    let id = metricDetailId == 0 ? chatMetricId : metricDetailId;
    axios.get(`${constants.APIDatas.CommentsInfoUrl}?metric_detail_id=${id}`, { headers })
      .then(function (response) {
        setChatInfo(response.data.data);
        setShowChatModal(true);
      })
      .catch(function (error) {
        error.response.data.message == "Unauthorized!" && removeUserData();
        console.log('err', error.response.data.message);
      });
  };

  const renderChatDetails = (item, index) => {
    return (
      <>
        {/* Left Sec */}
        {item.user_id != userData.id && <View style={styles.chatLeftSectionContainer} key={'chat' + item.id}>
          <View style={styles.chatLeftSectionCommentContainer}>
            <Text style={styles.chatLeftSectionComment}>{item.comment}</Text>
          </View>
          <Text style={styles.chatDuration}>{!!item.user_name && !!item.company_name && (item.user_name + " | " + item.company_name + " | ")}{constants.fetchDateText(item.created_at)}</Text>
        </View>
        }
        {/* Right Sec */}
        {item.user_id == userData.id && <View style={styles.chatRightSectionContainer} key={'chat' + item.id}>
          <View style={styles.chatRightSectionCommentContainer}>
            <Text style={styles.chatRightSectionComment}>{item.comment}</Text>
          </View>
          <Text style={styles.chatDuration}>{!!item.user_name && !!item.company_name && (item.user_name + " | " + item.company_name + " | ")}{constants.fetchDateText(item.created_at)}</Text>
        </View>
        }
      </>
    );
  };
  const ChatSubmit = () => {
    const chatData = {
      "metric_detail_id": chatMetricId,
      "comment": chatMessage,
    };
    const headers = { 'Authorization': `Token ${userData.access_token}` };
    axios.post(constants.APIDatas.CommentsInfoUrl, chatData, { headers })
      .then(res => {
        setIsCommented(true)
        ShowChatInfoModal();
        setChatMessage('');
      })
      .catch(function (error) {
        error.response.data.message == "Unauthorized!" && removeUserData();
        console.log('err', error.response.data, JSON.stringify(error),)
      });
  }
  useEffect(() => {
    !showChatModal && isCommented &&
      
      ((compareWith == "" ? setReportsData(yearValue) : compareWith == "Budget Value" ? compareMetricsListView(yearValue) : AddBudgetToCompare(yearValue)), setIsCommented(false));
  }, [isCommented, showChatModal])
  //
  const counterRef = useRef(null);
  let delay = 30;
  useEffect(() => {
    showChatInfo && (ShowChatInfoModal(), setShowChatInfo(false))
    counterRef.current = setInterval(() => { ShowChatInfoModal() }, delay * 1000);
    return () => {
      (counterRef.current) && (clearInterval(counterRef.current))
    };
  }, [showChatInfo])

  useEffect(() => {
    !showChatModal && (clearInterval(counterRef.current))
  }, [showChatModal])
  useEffect(() => {
    metricDetailId != 0 && (
      setChatMetricId(metricDetailId),
      ShowChatInfoModal(),
      setMetricDetailId(0)
    )
  }, [metricDetailId])
  return (
    !isLoading ?
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={themeStyles.ACTIVITY_INDICATOR_COLOR} />
      </View>
      :
      <View ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false} style={styles.screenContainer} >
        {yearValue > (firstDataYear) && <TouchableOpacity activeOpacity={1} style={styles.leftNavigationContainer}
          onPress={() => yearFilter('left')}
        >
          <ArrowCircleLeft color={themeStyles.PRIMARY_COLOR} variant={"Bold"} size={28} />
        </TouchableOpacity>}
        {yearValue != constants.currentYear && <TouchableOpacity activeOpacity={1} style={styles.rightNavigationContainer}
          onPress={() => yearFilter('right')}
        >
          <ArrowCircleRight color={themeStyles.PRIMARY_COLOR} variant={"Bold"} size={28} />
        </TouchableOpacity>}
        <View style={styles.titleSectionContainer}>
          <View style={styles.metricHeaderSectionContainer}>
            {/* Metric Header Section */}
            <View style={{ maxWidth: constants.screenWidth - 120 }}>
              <View style={styles.firstMetricHeaderContainer}>
                {(compareWith != '') && <View style={styles.firstMetricHeaderBox}></View>}
                <Text style={styles.firstMetricHeader}>{type} ({reportListData.currency}{reportListData.currency != null ? " " : ""}{reportListData.denomination != null && reportListData.denomination}{reportListData.unit == "Percentage" && "%"})</Text>
              </View>

              {compareWith != '' && compareWith != 'Budget Value' &&
                <View style={styles.secondMetricHeaderContainer}>
                  <View style={styles.secondMetricHeaderBox}></View>
                  <Text style={styles.secondMetricHeader}>{selectedType} ({reportListData.currency2}{reportListData.currency2 != null ? " " : ""}{reportListData.denomination2 != null && reportListData.denomination2}{reportListData.unit2 == "Percentage" && "%"})</Text>
                </View>
              }
              {compareWith == 'Budget Value' &&
                <View style={styles.secondMetricHeaderContainer}>
                  <View style={styles.secondMetricHeaderBox}></View>
                  <Text style={[styles.secondMetricHeader, { fontSize: 14 }]}>Budget Value</Text>
                  <View style={[styles.secondMetricHeaderBox, { backgroundColor: themeStyles.PRIMARY_COLOR, marginLeft: 10 }]}></View>
                  <Text style={[styles.secondMetricHeader, { fontSize: 14 }]}>Percentage Achieved</Text>
                </View>
              }
            </View>
            {/* Chart & List Icons Section */}
            <View style={styles.chartListIconSectionContainer}>
              <TouchableOpacity activeOpacity={1}
                onPress={() => (setShowGraphSelectionModal(false), setViewType('List'))}
              >
                <Grid1 color={viewType == 'List' ? themeStyles.PRIMARY_COLOR : themeStyles.PRIMARY_TEXT_COLOR} variant={viewType == 'List' ? "Bold" : "Outline"} size={24} />
              </TouchableOpacity>
              <Text style={styles.chartListIconSectionSeperator}>|</Text>
              <TouchableOpacity activeOpacity={1} style={{ opacity: compareWith != 'Budget Value' ? 1 : 0.3 }}
                disabled={compareWith == 'Budget Value' ? true : false}
                onPress={() => (setShowGraphSelectionModal(false), setViewType('Chart'))}
              >
                <StatusUp color={viewType != 'List' ? themeStyles.PRIMARY_COLOR : themeStyles.PRIMARY_TEXT_COLOR} variant={viewType != 'List' ? "Bold" : "Outline"} size={24} />
              </TouchableOpacity>
            </View>
          </View>
          {compareWith != '' && viewType == 'List' &&
            <View style={styles.borderMetricHeaderContainer}>
              <View style={styles.firstBorderMetricHeader}></View>
              <View style={styles.secondBorderMetricHeader}></View>
              {compareWith == "Budget Value" && <View style={styles.thirdBorderHeader}></View>}
            </View>
          }
        </View>
        {/* Metric Details */}
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.detailsSectionContainer} contentContainerStyle={styles.detailsSectionContentContainer}>
          <View style={styles.detailsSectionInnerContainer}>
            <Swipeable setSwipeDirection={setSwipeDirection}>
              {viewType == 'List' &&
                <View style={styles.listSectionContainer}>
                  {reportData.map((item, index) => renderDetailCard(item, index))}
                </View>
              }
            </Swipeable>
            {
              viewType == 'Chart' &&
              <View style={styles.chartSectionContainer}>
                <CombinedCharts compareWith={compareWith} labelArray={labelArray} firstDataSet={firstDataSet} secondDataSet={secondDataSet} axisLength={axisLength} chartType={chartType} labelArrayLandscape={labelArrayLandscape} colorArray={colorArray} colorArray2={colorArray2} setMetricDetailId={setMetricDetailId} metricDetailArray={metricDetailArray} lineCircleColor={lineCircleColor} setChatMetric={setChatMetric} />
              </View>
            }
            {
              viewType == 'Chart' &&
              <View style={styles.chartSectionCommentsNoteContainer}>
                <View style={styles.chartSectionCommentsBlock}></View>
                {compareWith != "" && <View style={[styles.chartSectionCommentsBlockBlue, { backgroundColor: chartType < 3 ? themeStyles.DANGER_COLOR : themeStyles.CHART_BLUE }]}></View>}
                <Text style={styles.chartSectionCommentsNote}>Comments Enabled</Text>
              </View>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Swipeable setSwipeDirection={setSwipeDirection} style={{ zIndex: 4, paddingTop: 0, }}>
                <TouchableOpacity activeOpacity={1} style={styles.addMetricsToCompareButton}
                  onPress={() => AddMetricsToCompare()}
                >
                  <Text style={styles.addMetricsToCompareText}>+ Metric</Text>
                </TouchableOpacity>
              </Swipeable>
              {(compareWith == '' || selectedType != "Budget Value") && viewType == 'List' &&
                <Swipeable setSwipeDirection={setSwipeDirection} style={{ zIndex: 4, paddingTop: 0, }}>
                  <TouchableOpacity activeOpacity={1} style={[styles.addMetricsToCompareButton, { backgroundColor: themeStyles.CHART_YELLOW, marginLeft: 10 }]}
                    onPress={() => AddBudgetToCompare()}
                  >
                    <Text style={[styles.addMetricsToCompareText]}>+ Budget</Text>
                  </TouchableOpacity>
                </Swipeable>
              }
              <Swipeable>
                <TouchableOpacity activeOpacity={1} style={[styles.addMetricsToCompareButton, { marginLeft: 5 }]}
                  onPress={() => navigation.navigate("Add")}
                >
                  <Text style={[styles.addMetricsToCompareText]}>Add Data</Text>
                </TouchableOpacity>
              </Swipeable>

            </View>

          </View>
        </ScrollView>
        {/* Metrics & Graph selection modal for metric comparrision  */}
        <BottomModal showModal={showMetrixModal} setShowModal={setShowMetrixModal} animationInType={'slideInUp'} animationOutType={'slideOutDown'} animationTiming={500} modalHeight={showGraphSelectionModal ? 0.8 : 0.9} bgColor={themeStyles.WHITE_COLOR} screen="compareList">
          {!showGraphSelectionModal &&
            <View nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.metricsListConatiner}>
              <Text style={styles.listHeader}>Select Metric</Text>
              {compareMetrixListLength == 0 && <Text style={styles.metricsListSectionErrorMessage}>Other Metrics period does not match with <constants.B>{type}</constants.B></Text>}
              <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: '60%', flexGrow: 1 }} style={{ flexGrow: 1 }}>
                <TouchableHighlight>
                  <TouchableWithoutFeedback>
                    <View>
                      {metricsData.map((item, index) => item.id != type_id && item.periodicity_id == periodicity_id && renderListCard(item, index))}
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableHighlight>
              </ScrollView>
             
              <TouchableOpacity activeOpacity={1} style={styles.comparisionSubmitModalButton} onPress={() => compareMetricsListView(yearValue)} >
                <Text style={styles.comparisionSubmitButtonText}>{viewType == 'List' ? "Submit" : "Next"}</Text>
              </TouchableOpacity>
            </View>}
          {showGraphSelectionModal &&
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.metricsListConatiner}>
              <Text style={styles.listHeader}>Select Chart</Text>
              <View style={{}}>
                {constants.chartTypeJson.map((item, index) => renderGraphSelectionCard(item, index))}
              </View>
              <TouchableOpacity activeOpacity={1} style={styles.comparisionSubmitModalButton}
                onPress={() => (setShowGraphSelectionModal(false), setShowMetrixModal(false))}
              >
                <Text style={styles.comparisionSubmitButtonText}>Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          }
        </BottomModal>
        {/* Chat | Comments - Modal*/}
        <BottomModal showModal={showChatModal} setShowModal={setShowChatModal} animationInType={'slideInUp'} animationOutType={'slideOutDown'} animationTiming={500} modalHeight={0.9} bgColor={themeStyles.WHITE_COLOR} screen={'chat'}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : 'null'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            style={{ flex: 1 }}>
            <>
              <View style={styles.chatHeaderSectionContainer}>
                <View style={styles.chatHeaderSectionIconContainer}>
                  <Image source={require('../../assets/Img/message.png')} style={styles.chatHeaderSectionIcon} />
                </View>
                <View style={styles.chatHeaderSectionTitleContainer}>
                  <Text style={[styles.chatHeaderSectionTitle, { width: constants.screenWidth - 90 }]} numberOfLines={1} ellipsizeMode='tail'>{chatMetric == 1 ? type : chatMetric == 2 && selectedType}</Text>
                </View>
              </View>
              <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={true} style={styles.chatContainer}>
                <View style={styles.chatViewContainer}>
                  {!!chatInfo.items && chatInfo.items.map((item, index) => renderChatDetails(item, index))}
                </View>
              </ScrollView>
              <View style={styles.chatInputSectionContainer}>
                <View style={styles.chatInputSectionViewContainer}>
                  <TextInput
                    value={chatMessage}
                    onChangeText={setChatMessage}
                    // autoFocus={true}
                    placeholder=""
                    placeholderTextColor={themeStyles.SECONDARY_TEXT_COLOR}
                    style={styles.chatSectionTextInput}
                    selectionColor={themeStyles.PRIMARY_COLOR}
                    activeOutlineColor='transparent'
                    activeUnderlineColor='transparent'
                    underlineColor='transparent'
                    mode='flat'
                    onBlur={() => (ChatSubmit())}
                  />
                  <TouchableOpacity activeOpacity={1}
                    onPress={() => (ChatSubmit())}
                    style={styles.chatSubmitIconContainer}
                  >
                    <Send color={themeStyles.PRIMARY_TEXT_COLOR} variant="Bold" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </KeyboardAvoidingView>
        </BottomModal>
      </View>

  );
};
ReportDetails.title = 'ReportDetails';
export default ReportDetails;