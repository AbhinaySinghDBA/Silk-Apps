import React,{useEffect,useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ReportStyles';
import constants from '../../styles/constants';
import {LineChart} from "react-native-chart-kit";
import themeStyles from '../../styles/theme.styles';
import {Svg, Text as TextSVG} from 'react-native-svg';
const ReportMetricLineChart = (props) => {
    const {reportData = null, compareWith = ''} = props;
    let _labelArray = [];let _dataArray = [];
    const [labelArray, setLabelArray] = useState([]);
    const [dataArray, setDataArray] =useState([]);
    useLayoutEffect(()=>{
      !!reportData &&(
        reportData.map((item) =>{
          _labelArray.push(item.month2);
          _dataArray.push(Math.round(item.amount2));
        }),
        setLabelArray(_labelArray),setDataArray(_dataArray)
      )
    },[reportData])
    const chartConfig = {
        backgroundColor:'transparent',
        backgroundGradientFrom: themeStyles.WHITE_COLOR,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: themeStyles.WHITE_COLOR,
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => themeStyles.CHART_BLUE,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false ,// optional
        // formatYLabel: () => yLabelIterator.next().value,
        decimalPlaces: 0,
        propsForBackgroundLines: {
            // strokeWidth: 0.5,
            stroke: "transparent",
            // strokeDasharray: "2",
          },
      };
      //[30, 25, 38, 90, 89, 63 , 30, 25, 38, 90, 89, 63,]["Jan", "Feb", "Mar", "Apr", "May", "Jun", 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const lineGraphdata = {
        labels: labelArray,
        datasets: [
        //   {
        //     data: [20, 45, 28, 80, 99, 43 ,20, 45, 28, 80, 99, 43],
        //     color: (opacity =1) => `rgba(232, 173, 36,${opacity})`, // optional
        //     strokeWidth: 2 ,// optional
        //     legendFontColor: '#7F7F7F', legendFontSize: 15
        //   },
          {
            data: dataArray, //this has 50 more items that data array
            color: (opacity =1) => `rgba(39, 129, 197,1)`,
            strokeWidth: 2,
            legendFontColor: '#7F7F7F', legendFontSize: 15
          },
        ],
        // legend: [type, selectedType] ,
      };
    return (
        <View style={{flex:1,alignContent:'center',justifyContent:'flex-end',height:constants.screenHeight*.62,position:'absolute',top:0,left:0}}>
          <LineChart
            style={{
                marginLeft: -5,
                // paddingTop:30
            }}
            // data = {{labels, datasets}}
            data={lineGraphdata}
            width={constants.screenWidth * .90}
            height={constants.screenHeight *.60}
            segments={5}
            chartConfig={chartConfig}
            withShadow={false}
            fromZero={true}
            // bezier
            yLabelsOffset={- constants.screenWidth * .90}
            xLabelsOffset={ constants.screenWidth * .90}
            renderDotContent={({x, y, index}) => {
                return (
                      <TextSVG
                        key={index}
                        x={x}
                        y={y -7}
                        fill="black"
                        fontSize="12"
                        fontWeight="normal"
                        textAnchor="middle">
                        {dataArray[index]}
                      </TextSVG>
                );
              }}
          />
        </View>
    );
};
export default ReportMetricLineChart;

