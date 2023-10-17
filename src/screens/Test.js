import React, { useLayoutEffect, useReducer, useState, useEffect, createContext, useContext } from 'react';


import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor,ScrollView,SafeAreaView
  } from 'react-native';
  
import {LineChart,BarChart, CombinedChart} from 'react-native-charts-wrapper';
import themeStyles from '../styles/theme.styles';

const Test = ({ navigation, route }) => {

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <LineChart style={styles.chart}
            // data={{dataSets:[{label: "Metrics", values: [5,10,-20, 40, 77, 81, 43]}]}}
            data={{
                dataSets: [
                  {
                    label: 'demo',
                    values: [1,2,3,70,66,99,7],
                    config: {
                      color: processColor('teal'),
    
                      highlightAlpha: 90,
                      highlightColor: processColor('red'),
                      axisDependency: 'left',
                    },
                  },
                  {
                    label: 'demo',
                    values: [70,66,99],
                    config: {
                      color: processColor('blue'),
    
                      highlightAlpha: 90,
                      highlightColor: processColor('yellow'),
                      axisDependency: 'left',
                    },
                  },
                ],
              }}
            gridDashedLine={{
                lineLength:100,
                spaceLength:10
            }}
            
            yAxis={{
                left: { enabled: true}, //=> enabled is the key not enable
                right: { enabled: false},
                // gridColor:processColor('red'),
                gridColor:processColor('red'),
                textSize:16
                }}
            xAxis={{
                position:'BOTTOM',
                gridDashedLine: {
                    lineLength: 10,
                    spaceLength: 10,
                  },
                  gridColor:processColor('red'),
                  textSize:16,
                  labelCount:7,
                  valueFormatter:['J', 'F', 'M', 'A', 'M', 'J', 'J'],
                  axisMinimum: 0,
        axisMaximum: 7,
        avoidFirstLastClipping: true,
            }}
            chartDescription={{text:''}}
            legend={{
                enabled:false
            }}
            
          /> */}
        {/* Single Bar Chart */}
        {/* <BarChart
            style={styles.chart}
            data={{dataSets: [
                {
                values: [100, 105, -20, 110,114, 109],
                label: 'Bar dataSet',
                config: {
                  color: processColor(themeStyles.CHART_YELLOW),
                  barSpacePercent: 20,
                  barShadowColor: processColor('lightgrey'),
                  highlightAlpha: 90,
                  highlightColor: processColor('red'),
                  
                }
              },
            //   {
            //     values: [80, 90, -10, 120,14, 99],
            //     label: 'Bar dataSet',
            //     config: {
            //       color: processColor(themeStyles.CHART_BLUE),
            //       barSpacePercent: 20,
            //       barShadowColor: processColor('lightgrey'),
            //       highlightAlpha: 90,
            //       highlightColor: processColor('red'),
                  
            //     }
            //   }
            ],
              config:{
                barWidth:0.5
              }
            }}
            
            xAxis= {{
                valueFormatter: ['J', 'F', 'M', 'A', 'M', 'J'],
                // granularityEnabled: true,
                // granularity : 1,
                axisMinimum:-1,
                axisMaximum:6,
                avoidFirstLastClipping: true,
                gridDashedLine: {
                    lineLength: 10,
                    spaceLength: 10,
                  },
                  position:'BOTTOM',
              }}
              yAxis={{
                left: { 
                    enabled: true,
                    // axisMinimum: 0,
                    // labelCount:7
                }, //=> enabled is the key not enable
                right: { enabled: false},
                }}
            animation={{durationX: 2000}}
            legend={{
                enabled: false,
                textSize: 14,
                form: 'SQUARE',
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5
              }}
            gridBackgroundColor={processColor('#ffffff')}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            chartDescription={{text:''}}
            
            // onSelect={this.handleSelect.bind(this)}
          /> */}
          {/* Group Bar Chart */}
          {/* <BarChart
            style={styles.chart}
            data={{
                dataSets: [{
                    values: [5, 40, 77, 81, 43],
                    label: 'Company A',
                    config: {
                      drawValues: false,
                      colors: [processColor('red')],
                      axisDependency: 'left',
                    }
                  }, {
                    values: [1, 5, 7, 8, 4],
                    label: 'Company B',
                    config: {
                      drawValues: false,
                      colors: [processColor('blue')],
                      axisDependency: 'right',
                    }
                  }],
                  config: {
                  barWidth: 0.3,
                    group: {
                      fromX: 0,
                      groupSpace: 0.2,
                      barSpace: 0.1,
                    },
                }
            }}
            xAxis= {{
                // valueFormatter: ['J', 'F', 'M', 'A', 'M', 'J'],
                // granularityEnabled: true,
                // granularity : 1,
                // avoidFirstLastClipping: true,
                gridDashedLine: {
                    lineLength: 10,
                    spaceLength: 10,
                },
                position:'BOTTOM',
                valueFormatter: ['J', 'F', 'M', 'A', 'M'],
                granularityEnabled: true,
                granularity: 1,
                axisMaximum: 5,
                axisMinimum: 0,
                centerAxisLabels: true,
                drawGridLines:false
                //   centerAxisLabels:true
              }}
              yAxis={{
                left: { 
                    enabled: true,
                    axisMinimum: 0,
                    granularityEnabled:true,
                    granularity:1,
                    gridDashedLine:{
                        lineLength:10,
                        spaceLength:10
                    }
                    // labelCount:7
                }, //=> enabled is the key not enable
                right: { 
                    enabled: true,
                    granularityEnabled:true,
                    granularity:1,
                    drawGridLines: false
                },
              }}
            animation={{durationX: 2000}}
            legend={{
                enabled: false,
                textSize: 14,
                form: 'SQUARE',
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5
              }}
            // gridBackgroundColor={processColor('#ffffff')}
            // drawBarShadow={false}
            // drawValueAboveBar={true}
            // drawHighlightArrow={true}
            chartDescription={{text:''}}
            
            // onSelect={this.handleSelect.bind(this)}
          /> */}
          {/* Combined Chart */}
          <CombinedChart
            data={{
                    barData: {
                      dataSets: [{
                        // values: [{y:[40, 30]}, {y:[10, 20]}, {y:[30, 20]}, {y:[30, 50]}],
                        values: [100, 105, -30, 110,114],
                        label: 'Stacked Bar dataset',
                        config: {
                        
                          colors: [processColor(themeStyles.CHART_YELLOW)],
                          stackLabels: ['Engineering', 'Sales', 'Marketing']
                        }
                      },
                      {
                        // values: [{y:[40, 30]}, {y:[10, 20]}, {y:[30, 20]}, {y:[30, 50]}],
                        values: [110, 65, -20, 110,114],
                        label: 'Stacked Bar dataset',
                        config: {
                        
                          colors: [processColor(themeStyles.CHART_BLUE)],
                          stackLabels: ['Engineering', 'Sales', 'Marketing']
                        }
                      }
                    ],
                      config:{
                        barWidth: 0.5
                      }
                    },
                    // lineData: {
                    //   dataSets: [{
                    //     values: [3, 6, 4, 8, 2],
                    //     label: 'Sine function',
            
                    //     config: {
                    //       drawValues: true,
                    //       colors: [processColor(themeStyles.CHART_BLUE)],
                    //       mode: "CUBIC_BEZIER",
                    //       drawCircles: true,
                    //       lineWidth: 2,
                    //       axisDependency: "RIGHT",
                    //     }
                    //   }],
                    // },
            }}
            
            drawOrder={['BAR','LINE']}
            style={styles.combinedChart}
            xAxis={{
              valueFormatter: ['J', 'F', 'M', 'A', 'M'],
              // granularityEnabled: true,
              // granularity: 1,
              drawGridLines: false,
              position:'BOTTOM',
              axisMaximum: 5,
              axisMinimum: -1,
            }}
            yAxis={{
              left: {      
                granularityEnabled: true,
                granularity: 10,
                gridDashedLine:{
                    lineLength:10,
                    spaceLength:10
                },
              //   drawGridLines: false
              },
              right: {
                  enabled:true,
                  drawGridLines: false,
              }
            }}
            chartDescription={{text:''}}
            legend={{enabled:false}}
          />
        </View>
      </SafeAreaView>
  );
}

export default Test;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#Fff',
      margin:20
    },
    chart: {
      flex: 1,
    },
    combinedChart:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
        margin:20
    }
  });
  
