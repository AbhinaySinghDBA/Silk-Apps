import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  LayoutAnimation,
  ScrollView,
} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';
import {AreaChart} from 'react-native-svg-charts';

const AreaCharts = ({data}) => {
  const legend = {
    enabled: true,
    textSize: 12,
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    wordWrapEnabled: true,
  };

  return (
    <ScrollView>
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={{dataSets: data.dataSets}}
          chartDescription={{text: ''}}
          legend={legend}
          marker={{
            enabled: false,
          }}
          xAxis={data.xAxis}
          yAxis={{
            left: {
              enabled: true,
            },
            right: {
              enabled: true,
              height:150
            },
          }}
          autoScaleMinMaxEnabled={true}
          animation={{
            durationX: 0,
            durationY: 1500,
            easingY: 'EaseInOutQuart',
          }}
          drawGridBackground={true}
          drawBorders={true}
          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          scaleXEnabled={true}
          scaleYEnabled={false}
          pinchZoom={true}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          keepPositionOnRotation={false}
        />
      </View>
    </View>
    </ScrollView>
  );
};

export default AreaCharts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 1,
  },
  chart: {
    height: 300,
  },
});
