import React,{useEffect,useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ReportStyles';
import constants from '../../styles/constants';
import {BarChart} from "react-native-chart-kit";
import themeStyles from '../../styles/theme.styles';
const ReportSingleMetricBarChart = (props) => {
    const {reportData = null} = props;
    let _labelArray = [];let _dataArray = [];
    const [labelArray, setLabelArray] = useState([]);
    const [dataArray, setDataArray] =useState([]);
    useLayoutEffect(()=>{
      !!reportData && (
        reportData.map((item) =>{
            // setLabelArray(...labelArray,item.month);
            // setDataArray(...dataArray,item.dataArray);
          _labelArray.push(item.month);
          _dataArray.push(Math.round(item.amount));
        }),
        setLabelArray(_labelArray),setDataArray(_dataArray)
        // ,console.log(labelArray,dataArray)
      )
    },[reportData])
    const minValue = 0;
    function* yLabel() {
      yield* [0,20,40,60,80,100];
    }
    const yLabelIterator = yLabel();

    const barChartConfig = {
        backgroundColor:'transparent',
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: () => themeStyles.CHART_YELLOW,
        // color: () => `rgba(1, 122, 205, 1)`,
        labelColor: () => themeStyles.PRIMARY_TEXT_COLOR,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false ,// optional
        // formatYLabel: () => yLabelIterator.next().value,
        decimalPlaces: 0,
        fillShadowGradient: themeStyles.CHART_YELLOW,
        fillShadowGradientOpacity: 1,
        propsForBackgroundLines: {
          // strokeWidth: 0.5,
          stroke: "#e3e3e3",
          // strokeDasharray: "2",
        },
      };
      const BarGraphdata = {
        labels: labelArray,
        datasets: [
          {
            data: dataArray,
            colors: [
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
              () => themeStyles.CHART_YELLOW,
            ], // optional
            strokeWidth: 2 ,// optional
            legendFontColor: '#7F7F7F', legendFontSize: 15
          },
          
        ],
        // legend: [type, selectedType] ,
      };
    return (
        <View style={{flex:1,alignContent:'center',justifyContent:'flex-end',height:constants.screenHeight*.62}}>
          
          {!!labelArray && <BarChart
            style={{
                marginLeft: - 20,
                // paddingTop:30
            }}
            data={BarGraphdata}
            
            width={constants.screenWidth * .90}
            height={constants.screenHeight*.60}
            segments={4}
            chartConfig={barChartConfig}
            // withShadow={false}
            fromZero={true}
            flatColor={true}
            withCustomBarColorFromData={true}
            showBarTops={false}
            showValuesOnTopOfBars={false}
            xLabelsOffset ={10}
          />}
          
        </View>
    );
};
export default ReportSingleMetricBarChart;