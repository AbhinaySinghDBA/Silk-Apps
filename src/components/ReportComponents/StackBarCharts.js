import { StyleSheet, View, processColor } from 'react-native';
import { BarChart, } from 'react-native-charts-wrapper';


const StackBarCharts = ({ data }) => {

    const state2 = {
        legend: {
            enabled: true,
            textSize: 14,
            form: "SQUARE",
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            wordWrapEnabled: true
        },
        data: {
            dataSets: [{
                values: [
                    {
                        y: [5, 10, 15, 20, 25, 30],
                    },
                    {
                        y: [10, 15, 20, 25, 30, 35],
                    },
                ],
                label: '',
                config: {
                    colors: [
                        processColor('#233D4D'), processColor('#457B9D'), processColor('#3DA5D9'),
                        processColor('#06D6A0'), processColor('#OEAD69'), processColor('#EF233C'),
                        processColor('#FF5400'), processColor('#FCA311'), processColor('#FCCA46'),
                        processColor('#FIFAEE')
                    ],
                    stackLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                }
            }],
        },
        highlights: [],
        xAxis: {
            valueFormatter: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"],
            granularityEnabled: true,
            granularity: 1,
        }

    };

    const state = data


    return (
        <View style={{ flex: 1}}>
            <View style={styles.container}>
                <BarChart
                    style={styles.chart}
                    xAxis={state.xAxis}
                    data={state.data}
                    legend={state.legend}
                    drawValueAboveBar={false}
                    highlights={state.highlights}
                    chartDescription={{ text: "" }}
                    

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: 500,
        paddingVertical: 16,
    },
    chart: {
        flex: 1,
    }
});

export default StackBarCharts


// const StackBarCharts = ({ data }) => {
//     const state = data
//     return (
//         <View style={{ flex: 1 }}>
//             <View style={styles.container}>
//                 <BarChart
//                     style={styles.chart}
//                     xAxis={state.xAxis}
//                     data={state.data}
//                     legend={state.legend}
//                     drawValueAboveBar={false}
//                     highlights={state.highlights}
//                 />
//             </View>
//         </View>
//     );
// }