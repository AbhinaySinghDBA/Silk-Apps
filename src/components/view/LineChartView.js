import { View, Text } from 'react-native'
import React from 'react'

import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

const LineChartView = ({ data }) => {
    return (
        <View>
            <LineChart
                {...data}
                height={250}
                showVerticalLines={false}
                curved={true}
                // spacing={75}
                initialSpacing={25}
                // rotateLabel
                hideRules
            // color1="skyblue"
            // color2="orange"
            // color3="red"
            // color4="green"
            // color5="grey"
            // textColor1="green"
            // textColor2="blue"
            // dataPointsHeight={6}
            // dataPointsWidth={6}
            // dataPointsColor1="blue"
            // dataPointsColor2="red"
            // textShiftY={-2}
            // textShiftX={-5}
            // textFontSize={13}
            // areaChart
            // areaChart2
            />
        </View>
    )
}

export default LineChartView