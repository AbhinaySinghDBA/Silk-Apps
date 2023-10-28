import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor
} from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

const LineCharts = ({ data }) => {
    const legend = {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <LineChart style={styles.chart}
                    data={{ dataSets: data.dataSets }}
                    xAxis={data.xAxis}
                    drawValueAboveBar={false}
                    highlights={[]}
                    legend={legend}

                    dragEnabled={true}
                    pinchZoom={true}
                    lineWidth={2}
                    chartDescription={{ text: "" }}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
    },
    chart: {
        flex: 1
    }
    
});


export default LineCharts