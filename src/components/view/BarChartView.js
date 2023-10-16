import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { BarChart } from 'react-native-svg-charts';
import * as scale from 'd3-scale';


const BarChartView = ({ data }) => {

    const { datasets, labels } = data

    const xScale = scale.scaleBand()
        .domain(labels)
        .range([0, 500]);

    const yScale = scale.scaleLinear()
        .domain([0, 50])
        .range([500, 0]);


    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
            <BarChart
                style={{ height: 250 }}
                data={datasets}
                gridMin={0}
                yAccessor={({ item }) => item}
                xScale={xScale}
                yScale={yScale}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {xScale.domain().map((label, index) => (
                    <Text key={index}>{label}</Text>
                ))}
            </View>


        </ScrollView>
    );

}

export default BarChartView
