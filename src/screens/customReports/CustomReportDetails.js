import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Modal,
  Button,
  processColor,
} from 'react-native';
import UseCustomReportsHooks from './useCustomReportsHooks';
import TableView from '../../components/view/TableView';
import styles from './customReportStyle';
import {StyleSheet} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import {
  getCurrentMonthAndYear,
  getCurrentQuarterAndYear,
} from '../../utils/helper';
import LineChartView from '../../components/view/LineChartView';
import {TouchableOpacity} from 'react-native';
import BarChartView from '../../components/view/BarChartView';
import StackBarCharts from '../../components/ReportComponents/StackBarCharts';
import LineCharts from '../../components/ReportComponents/LineCharts';
import AreaCharts from '../../components/ReportComponents/AreaCharts';
import { Filter } from 'iconsax-react-native';

const MONTH = [
  {label: 'Jan', value: 1},
  {label: 'Feb', value: 2},
  {label: 'Mar', value: 3},
  {label: 'Apr', value: 4},
  {label: 'May', value: 5},
  {label: 'Jun', value: 6},
  {label: 'Jul', value: 7},
  {label: 'Aug', value: 8},
  {label: 'Sep', value: 9},
  {label: 'Oct', value: 10},
  {label: 'Nov', value: 11},
  {label: 'Dec', value: 12},
];

const QUATER = [
  {label: 'Mar', value: 1},
  {label: 'Jun', value: 2},
  {label: 'Sep', value: 3},
  {label: 'Dec', value: 4},
];

function isValidTableView(startDate, endDate) {
  const s_parts = startDate.split('-');
  const s_month = s_parts[0];
  const s_year = s_parts[1];

  const e_parts = endDate.split('-');
  const e_month = e_parts[0];
  const e_year = e_parts[1];

  const maxRangeMonths = 12;

  const startDateObj = new Date(s_year, s_month, '01');
  const endDateObj = new Date(e_year, e_month, '01');

  if (startDateObj && endDateObj) {
    let ey = endDateObj.getFullYear();
    let sy = startDateObj.getFullYear();
    let em = endDateObj.getMonth();
    let sm = startDateObj.getMonth();

    const monthDiff = (ey - sy) * 12 + (em - sm);

    if (monthDiff >= maxRangeMonths) {
      return 'RANGE_FAILED';
    } else if (endDateObj <= startDateObj) {
      return 'SELECTION_FAILED';
    } else {
      return 'OK';
    }
  }
}

function getArrayOfYears(count = 5) {
  let currentYear = new Date().getFullYear();
  const lastFiveYears = [];

  for (let i = 0; i < count; i++) {
    let year = currentYear - i;
    lastFiveYears.push(year);
  }
  return lastFiveYears;
}

const CustomReportDetails = ({route}) => {
  const navigation = useNavigation();
  const {report} = route.params;
  const {isLoading, error, matrixData, fetchMatrixData} =
    UseCustomReportsHooks();

  const [isFilterShow, setIsFilterShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [range, setRange] = useState({
    from: null,
    to: null,
  });
  const [errorObj, setErrorObj] = useState({
    error: false,
    msg: '',
  });

  const [quaterOrMonth, setQuaterOrMonth] = useState(MONTH);

  const handleChange = panel => {
    if (expanded == panel) setExpanded(null);
    else setExpanded(panel);
  };
  const handleChange2 = panel => {
    if (expanded2 == panel) setExpanded2(null);
    else setExpanded2(panel);
  };

  const submitHandler = () => {
    let error = isValidTableView(range.from, range.to);

    switch (error) {
      case 'SELECTION_FAILED':
        setErrorObj({error: true, msg: 'Selected period is invalid.'});
        return;
      case 'RANGE_FAILED':
        setErrorObj({
          error: true,
          msg: 'Invalid Range, range should be within 12 month.',
        });
        return;
      default:
        setErrorObj({error: false, msg: error});
        break;
    }

    fetchMatrixData(report, range.from, range.to, report.periodicity);
    setIsFilterShow(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => setIsFilterShow(true)}>
            <View style={stylesSheet.filterContainer}>
              <View style={stylesSheet.filterButton}>
                <Filter name="filter" size={24} color="#3a7953" />
              </View>
            </View>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  useEffect(() => {
    let result = getCurrentMonthAndYear();
    let qtr = getCurrentQuarterAndYear();
    let from = report.periodicity == 1 ? result.from : qtr.from;
    let to = report.periodicity == 1 ? result.to : qtr.to;
    setRange({from, to});
    fetchMatrixData(report, from, to, report.periodicity);

    if (report.periodicity == 2) {
      setQuaterOrMonth(QUATER);
    }
  }, [report]);

  const LineDataHandler = matrixData => {
    const {labels, datasets} = matrixData;
    const temp = [];
    for (const data of datasets) {
      temp.push({
        label: data.label,
        values: data.data,
        config: {
          color: processColor(data.backgroundColor),
          circleColor: processColor(data.borderColor),
          lineWidth: 5,
        },
      });
    }
    const result = {
      xAxis: {
        valueFormatter: labels,
        granularityEnabled: true,
        granularity: 1,
      },
      dataSets: temp,
    };
    return result;
  };

  const BarDataHandler = matrixData => {
    const {labels, datasets} = matrixData;

    const matricNames = [];
    const dataArray = [];
    const colorsArray = [];
    const dataArrayTemp = [];

    for (const data of datasets) {
      matricNames.push(data.label);
      dataArrayTemp.push(data.data);
      colorsArray.push(processColor(data.backgroundColor));
    }

    const numRows = dataArrayTemp[0]?.length;
    const resultData = Array.from({length: numRows}, () => []);

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < dataArrayTemp.length; j++) {
        resultData[i].push(dataArrayTemp[j][i]);
      }
    }

    for (const r of resultData) {
      dataArray.push({y: r});
    }

    let result = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: dataArray,
            label: '',
            config: {
              colors: colorsArray,
              stackLabels: matricNames,
            },
          },
        ],
      },
      highlights: [],
      xAxis: {
        valueFormatter: labels,
        granularityEnabled: true,
        granularity: 1,
      },
    };

    return result;
  };

  const AreaDataHandler = matrixData => {
    const {labels, datasets} = matrixData;

    const staticConfig = {
      mode: 'CUBIC_BEZIER',
      drawValues: false,
      lineWidth: 1,
      drawCircleHole: false,
      circleRadius: 1,
      highlightColor: processColor('transparent'),
      drawFilled: true,
      fillAlpha: 1000,
      valueTextSize: 15,
    };

    const temp = [];

    for (let i = datasets.length - 1; i >= 0; i--) {
      const data = datasets[i];
      temp.push({
        values: data.data,
        label: data.label,
        config: {
          circleColor: processColor('black'),
          color: processColor(data.borderColor),
          fillGradient: {
            colors: [
              processColor(data.backgroundColor),
              processColor(data.borderColor),
            ],
            positions: [0, 0.5],
            angle: 90,
            orientation: 'TOP_BOTTOM',
          },
          ...staticConfig,
        },
      });
    }

    const result = {
      xAxis: {
        enabled: true,
        granularity: 1,
        drawLabels: true,
        position: 'BOTTOM',
        drawAxisLine: true,
        drawGridLines: false,
        fontFamily: 'HelveticaNeue-Medium',
        fontWeight: 'bold',
        textSize: 10,
        textColor: processColor('gray'),
        valueFormatter: labels,
      },
      dataSets: temp,
    };
    return result;
  };
  const [selectedMonth, setSelectedMonth] = useState(null);
  return (
    <View style={{flex: 1}}>
      <Modal animationType="slide" transparent={false} visible={isFilterShow}>
        <ScrollView>
          <View style={stylesSheet.rangeContainer}>
            <View style={stylesSheet.rangeColumn}>
              <Text>From : {range.from}</Text>
              {getArrayOfYears().map((yr, idx) => {
                return (
                  <View key={'from__yr__' + yr}>
                    <TouchableHighlight
                      onPress={() => handleChange(`pannel__${yr}`)}
                      underlayColor="white"
                      style={stylesSheet.yearContainer}>
                      <Text style={stylesSheet.yearText}>{yr}</Text>
                    </TouchableHighlight>

                    {expanded == `pannel__${yr}` && (
                      <View>
                        {quaterOrMonth.map(m => (
                          <TouchableOpacity
                            key={`from__yr__month__${yr}__${m.label}`}
                            onPress={() => {
                              setRange({
                                from: `${m.value}-${yr}`,
                                to: range.to,
                              });
                              setSelectedMonth(m.value);
                            }}
                            style={[
                              stylesSheet.monthButton,
                              selectedMonth === m.value &&
                                stylesSheet.selectedMonth,
                            ]}>
                            <Text
                              style={[
                                stylesSheet.monthButtonText,
                                selectedMonth === m.value &&
                                  stylesSheet.selectedMonthText,
                              ]}>
                              {m.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <View style={stylesSheet.rangeColumn}>
              <Text>To : {range.to}</Text>

              {getArrayOfYears().map((yr, idx) => {
                return (
                  <View key={'to__yr__' + yr}>
                    <TouchableHighlight
                      onPress={() => handleChange2(`pannel__${yr}`)}
                      underlayColor="white"
                      style={stylesSheet.yearContainer}>
                      <Text style={stylesSheet.yearText}>{yr}</Text>
                    </TouchableHighlight>

                    {expanded2 == `pannel__${yr}` && (
                      <View>
                        {quaterOrMonth.map(m => (
                          <TouchableOpacity
                            key={`to__yr__month__${yr}__${m.label}`}
                            onPress={() => {
                              setRange({
                                from: range.from,
                                to: `${m.value}-${yr}`,
                              });
                            }}
                            style={stylesSheet.monthButton}>
                            <Text style={stylesSheet.monthButtonText}>
                              {m.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {errorObj.error ? (
            <Text style={stylesSheet.errorText}>{errorObj.msg}</Text>
          ) : (
            <></>
          )}

          <View style={stylesSheet.btnGroup}>
            <TouchableOpacity
              onPress={submitHandler}
              style={stylesSheet.successBtn}>
              <Text style={stylesSheet.successBtnText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFilterShow(false)}
              style={stylesSheet.secondaryBtn}>
              <Text style={stylesSheet.secondaryBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
      {/* <View style={stylesSheet.filterContainer}>
        <TouchableHighlight
          onPress={() => setIsFilterShow(true)}
          underlayColor="white">
          <View style={stylesSheet.filterButton}>
            <Text style={stylesSheet.buttonFilter}>Filter</Text>
          </View>
        </TouchableHighlight>
      </View> */}

      {/* <Text>View: {matrixData.meta.view} isLoading : {JSON.stringify(isLoading)}</Text> */}

      {error ? (
        <Text>Something Went Wrong!</Text>
      ) : (
        <>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            matrixData.isData && (
              <>
                {matrixData.meta.view == 'AREA' && (
                  <AreaCharts data={AreaDataHandler(matrixData)} />
                )}
                {matrixData.meta.view == 'LINE' && (
                  <LineCharts data={LineDataHandler(matrixData)} />
                )}
                {matrixData.meta.view == 'BAR' && (
                  <StackBarCharts data={BarDataHandler(matrixData)} />
                )}
                {matrixData.meta.view == 'TABLE' && (
                  <View>
                    <ScrollView>
                      <TableView
                        isData={matrixData?.isData}
                        labels={matrixData?.labels}
                        datasets={matrixData?.datasets}
                        meta={matrixData?.meta}
                      />
                    </ScrollView>
                  </View>
                )}
              </>
            )
          )}
        </>
      )}
    </View>
  );
};

const stylesSheet = StyleSheet.create({
  filterContainer: {
   
  },
  filterButton: {
  width : 24,
  height : 24,
  resizemode : "contain"

  },
  buttonFilter: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  yearContainer: {
    backgroundColor: '#dedede',
    padding: 8,
    marginTop: 5,
  },

  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rangeColumn: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },

  yearText: {
    fontWeight: '500',
  },
  btnGroup: {
    margin: 8,
    marginTop: 16,
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  monthButton: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    marginTop: 2,
  },
  monthButtonText: {
    color: 'grey',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  successBtn: {
    backgroundColor: '#3a7953',
    padding: 8,
    marginTop: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  successBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    backgroundColor: '#b8b7b6',
    padding: 8,
    marginTop: 2,
    borderRadius: 6,
  },
  secondaryBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  selectedMonth: {
    backgroundColor: 'darkgrey', 
  },
  selectedMonthText: {
    color: 'white', 
  },
});

export default CustomReportDetails;
