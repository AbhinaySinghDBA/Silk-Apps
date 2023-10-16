import React,{useState} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';

import { useNavigation} from '@react-navigation/native';
import {TickCircle} from 'iconsax-react-native';
import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/ReportStyles';
import constants from '../../styles/constants';
const RenderMetricsCard = (props) => {
    const navigation = useNavigation();
    const { item, index, user_id, name, metrixData = null, dataLength, viewType = null, selectedType = '', setSelectedType = null, setSelectedTypeId = null, company_id,} = props;
    let icon = "";
    let metrixDuration = item.current_month != null ? (constants.monthList[item.current_month - 1]) + " " + item.current_year : (item.current_financial_quarter != null ? constants.quaterList[item.current_financial_quarter - 1] + " " + item.current_year : item.current_year)

    switch (item.unit_name) {
        case 'Amount':
            icon = <Image source={require('../../assets/Img/metrics/Amount-Square.png')} style={styles.renderMetricsCardIcon} />;
            break;
        case 'Percentage':
            icon = <Image source={require('../../assets/Img/metrics/Percentage-Square.png')} style={styles.renderMetricsCardIcon} />;
            break;
        default:
            icon = <Image source={require('../../assets/Img/metrics/Numbers-Square.png')} style={styles.renderMetricsCardIcon} />;
            break;
    };
    const onMetricsCardClickFunction = () => {
        viewType == null && navigation.navigate('ReportDetails', { "user_id": user_id, "type_id": item.id, "name": name, "metrixData": metrixData, "type": item.name, "company_id": company_id, "periodicity_id": item.periodicity_id, "current_year": item.current_year != null ? item.current_year : constants.currentYear });
        viewType != null && (setSelectedType(item.name), setSelectedTypeId(item.id))
    };
    return (
        item.current_value != null && <TouchableOpacity activeOpacity={1} style={[styles.renderMetricsCardContainer, { marginBottom: ((index + 1) == (metrixData.length || dataLength)) ? 30 : 10, borderColor: item.name == selectedType ? themeStyles.PRIMARY_COLOR : themeStyles.CARD_BORDER_COLOR_LIGHT }]}
            key={(item.id + index) + item.name + item.current_year}
            onPress={() => onMetricsCardClickFunction()}
            // onLayout={(event) => {
            //     let {height} = event.nativeEvent.layout;
            //     console.log('h', height)
            //   }}
        >
            <View style={styles.renderMetricsCardIconContainer}>
                {icon}
            </View>
            <View style={styles.renderMetricsCardRightSecContainer}>
                <View style={styles.renderMetricsCardRightSecValueContainer}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.renderMetricsCardRightSecValueData}>{constants.Inrformatter.format(item.current_value)} {item.unit_name == 'Percentage' && '%'}</Text>
                    {item.current_value >= item.previous_value ?
                        <Image source={require('../../assets/Img/trendUp.png')} style={styles.renderMetricsCardTrendIcon} />
                        :
                        <Image source={require('../../assets/Img/trendDown.png')} style={styles.renderMetricsCardTrendIcon} />
                    }
                </View>
                <Text ellipsizeMode="middle" numberOfLines={2} style={[styles.renderMetricsCardRightSecDescription, { width: constants.screenWidth - 120}]}>{item.name} <Text style={styles.renderMetricsCardRightSecDescriptionPeriod}>{(item.currency_name != null ? (item.currency_name + " ") : "") + (item.currency_name != null ? (item.denomination_short_name + " ") : "")}{metrixDuration != null && "| " + metrixDuration}</Text></Text>
            </View>
            {viewType != null && selectedType == item.name &&
                <View style={styles.renderMetricsCardSelectionContainer}>
                    <TickCircle color={themeStyles.PRIMARY_COLOR} variant="Bold" size={24} />
                </View>}
        </TouchableOpacity>
    );
};

export default RenderMetricsCard;