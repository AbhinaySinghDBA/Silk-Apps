import React,{useEffect,useState, useWindowDimensions} from 'react';
import {View, StyleSheet,processColor,Dimensions} from 'react-native';
import constants from '../../styles/constants';
import themeStyles from '../../styles/theme.styles';
import {CombinedChart} from 'react-native-charts-wrapper';

const CombinedCharts = (props) => {
    const {compareWith = '', firstDataSet, secondDataSet = [], labelArray, axisLength,chartType = 4,labelArrayLandscape=[],markerArray ,setMetricDetailId=null,metricDetailArray,colorArray,colorArray2,lineCircleColor,setChatMetric = null} = props;
    const [orientation, setOrientation] = useState('PORTRAIT');

    const [scrWidth,setScrWidth] = useState(0);
    const [scrHeight,setScrHeight] = useState(0);
    const [secondSet,setSecondSet] = useState(secondDataSet);
    // const [circleColor, setCircleColor] = useState([]);
    let s1 = Dimensions.get('window').width;
    const determineAndSetOrientation = () => {
      let width = Dimensions.get('window').width;
      let height = Dimensions.get('window').height;
      setScrWidth(width), setScrHeight(height);
      if (width < height) {
        setOrientation('PORTRAIT');
        setScrWidth(width), setScrHeight(height);
      } else {
        setOrientation('LANDSCAPE');
        setScrWidth(width), setScrHeight(height);
      }
    }
    useEffect(()=>{
      // console.log(secondDataSet,colorArray2)
      // setCircleColor(colorArray2.slice(1));
      let _data = [];
      chartType < 3 && (
        secondDataSet.map((item,index) =>{
          _data.push(index != 0 ? item : null)
        })
      );
      chartType < 3 ? setSecondSet(_data) :setSecondSet(secondDataSet) 
    },[secondDataSet, chartType])
    useEffect(() => {
      determineAndSetOrientation();
      const subscription = Dimensions.addEventListener('change', determineAndSetOrientation);
      return () => subscription?.remove();
    }, [s1]);
    
    let axisDependencyValue =  (chartType == 2 || chartType == 4) ? "RIGHT" :'LEFT'; 
    let configValue =  chartType < 3 ? {barWidth: axisLength > 7 ? 0.7: 0.5} : { barWidth: 0.4, group: { fromX: 0.1, groupSpace: 0.15, barSpace: 0.0, }, };
    let centerAxisLabelsValue =  chartType < 3 ? false : true; 
    let rightAxisEnabled =  (chartType == 2 || chartType == 4) ? true : false; 
    
    const handleSelect =(event) =>{
      let entry = event.nativeEvent;
      // !!entry.data && !!entry.data.marker && setMetricDetailId(entry.data.marker)
      // console.log(event.nativeEvent, JSON.stringify(entry))
      // console.log(!!entry.data && !!entry.data.marker &&  (entry.data.marker),'tId')
      // console.log(!(!!entry.data && !!entry.data.marker),'else', entry.y, entry.x )
      compareWith == "" && !!entry.x && (setMetricDetailId(metricDetailArray[!!entry.x ? entry.x : 0]), setChatMetric(1))

      if(compareWith != ""){
        let _data = metricDetailArray[!!entry.x ? Math.floor(entry.x): 0]
        // console.log('x,y',_data, entry.y, entry.x, !!_data , !!_data.amount, _data.length)
        if(!!_data){
          let _mId = entry.y == Math.round(_data.amount) ? _data.mid : _data.mid2;
          setChatMetric(entry.y == Math.round(_data.amount) ? 1 : 2)
          // console.log("_mid",_mId,metricDetailArray); 
          setMetricDetailId(_mId);
        } 
        
      }
    }
    
    let scaleXValue = !!firstDataSet && firstDataSet.length > 6  && orientation == "PORTRAIT"? ( chartType < 3 ? 2 : 2.8 ) : 1;
  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'flex-end', height: constants.screenHeight * .6, }}>
      <CombinedChart
        data={{
          barData: {
            dataSets: [
              {
                values: firstDataSet || [],
                label: '',
                config: {
                  colors: compareWith == "" ? colorArray: colorArray,
                  // colors: [processColor(themeStyles.CHART_YELLOW)],
                  //   highlightEnabled: false,
                  highlightAlpha: 90,
                  highlightColor: processColor(themeStyles.CHART_YELLOW),
                  drawValues: false,
                },
              },
              {
                values: compareWith != "" && chartType > 2 ? secondSet : [],
                label: '',
                config: {
                  colors: colorArray2,
                  axisDependency: axisDependencyValue,
                  //   highlightEnabled: false,
                  highlightAlpha: 90,
                  highlightColor: processColor(themeStyles.CHART_BLUE),
                  drawValues: false
                }
              }
            ],
            config: configValue
          },
          lineData: {
            dataSets: [{
              values: compareWith != "" && chartType < 3 ? secondSet : [],
              label: '',
              config: {
                drawValues: false,
                colors: [processColor(themeStyles.CHART_BLUE)],
                mode: "CUBIC_BEZIER",
                drawCircles: true,
                // circleColor: processColor(themeStyles.CHART_BLUE),
                circleColors:lineCircleColor,
                lineWidth: 2,
                axisDependency: axisDependencyValue,
              }
            }],
          },
        }}

        drawOrder={['BAR', 'LINE', 'BUBBLE']}
        style={[styles.combinedChart, { width: scrWidth - 40, height: (scrHeight * .6) }]}
        xAxis={{
          valueFormatter: orientation == 'PORTRAIT' ? labelArray : labelArrayLandscape,
          drawGridLines: false,
          position: 'BOTTOM',
          axisMaximum: axisLength + 1,
          axisMinimum: 0,
          labelCount: axisLength + 1,
          // labelCountForce:true,
          centerAxisLabels: centerAxisLabelsValue,
          axisLineWidth: 1,
          // labelRotationAngle: -45,
          granularityEnabled: true,
          granularity : 1,

        }}
        yAxis={{
          left: {
            granularityEnabled: true,
            granularity: 10,
            gridDashedLine: {
              lineLength: 10,
              spaceLength: 10
            },
            axisLineWidth: 1
            // axisMinimum: 0,
          },
          right: {
            granularityEnabled: true,
            granularity: 1,
            enabled: rightAxisEnabled,
            drawGridLines: false,
            axisLineColor: processColor(themeStyles.CHART_BLUE),
            textColor: processColor(themeStyles.CHART_BLUE),
            axisLineWidth: 1
            // centerAxisLabels:true
            // axisMinimum: 0,
          },
          zeroLine: { enabled: true }
        }}
        chartDescription={{ text: '' }}
        legend={{ enabled: false }}
        // autoScaleMinMaxEnabled={false}
        // doubleTapToZoomEnabled={false}
        // scaleYEnabled={false}
        pinchZoom={false}
        scaleXEnabled={false}
        // marker={marker}
        animation={{
          durationX: 150,
          durationY: 1500,
          easingY: "EaseOutQuad"
        }}
        dragDecelerationEnabled={true}
        dragDecelerationFrictionCoef={0.3}
        zoom={{ scaleX: scaleXValue, scaleY: 1, xValue: Platform.OS == 'ios' ? -Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER, yValue: 1, axisDependency: 'LEFT' }}
        onSelect={(e) => handleSelect(e)}
        drawBarShadow={false}
        drawBorders={false}
      // highlightPerTapEnabled={false}
      // highlightPerDragEnabled={false}            
      // highlights={highLights}
      // highlights={[{x:3}]}
      // highlights = {highLights}
      // visibleRange={y={left:{min:1,max:5}}}
      />
    </View>
  );
};
export default CombinedCharts;

const styles = StyleSheet.create({
    combinedChart:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom:20,
        width:constants.screenWidth - 40,
        maxHeight:constants.screenHeight * .6,
    }
  });
  