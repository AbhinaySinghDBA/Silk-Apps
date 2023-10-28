import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor,ScrollView,SafeAreaView
  } from 'react-native';
import {CombinedChart} from 'react-native-charts-wrapper';

import themeStyles from '../styles/theme.styles';

const Test = ({ navigation, route }) => {

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
         
          <CombinedChart
            data={{
                    barData: {
                      dataSets: [{
                        
                        values: [100, 105, -30, 110,114],
                        label: 'Stacked Bar dataset',
                        config: {
                        
                          colors: [processColor(themeStyles.CHART_YELLOW)],
                          stackLabels: ['Engineering', 'Sales', 'Marketing']
                        }
                      },
                      {
                        
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
            }}
            
            drawOrder={['BAR','LINE']}
            style={styles.combinedChart}
            xAxis={{
              valueFormatter: ['J', 'F', 'M', 'A', 'M'],
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
  
