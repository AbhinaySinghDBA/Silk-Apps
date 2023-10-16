import React,{useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,Image} from 'react-native';

import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/ReportStyles';
import constants from '../../styles/constants';
const ReportDetailListViewCard = (props) => {
    const {item, index , dataLength,user_id,data,listInrDenominationDetails,compareWith = "",setShowChatInfo = null, setChatMetricId = null,setChatMetric= null} = props;
    const checkDataLength = (index + 1) == dataLength;
    const checkFirstCard = index == 0;
    // console.log('comparewith',compareWith)
    const [m1, setM1] = useState(0);
    useEffect(()=>{
        compareWith == "" && setM1(diffPercent(item.amount, item.previous_amount));
        compareWith == "Budget Value" && setM1(percentageAchieved(item.current_value, item.budget_value));
    },[item])
    let result = 0;
    const percentageAchieved = (a, b) => {
        if(a == 0 && b == 0){
            result = "0.0%";
        }
        else if(a == 0 ){
            result = "0.0%";
        }
        else if(b == 0){
             result = a >= 0? "100.0%" : "-100.0%";
        }
        else{
            result = ((a/b) *100).toFixed(2) +'%';
        }
        return result !="NaN%" ? result : "0.0%";
    }
    const diffPercent = (a, b) => {
        if(a == 0 && b == 0){
            result = "0.0%";
        }
        else if(a == 0 ){
            (b > 0) ? result = "-100.0%" : result = "100.0%"
        }
        else if(b == 0){
            a < 0? result = "-100.0%" : result = "100.0%"
        }
        else if(a > b){
            let x = (((a-b)/b) * 100).toFixed(1);
            result = (x > 0 ? x : (x* -1))+'%'
        }
        else if(b > a){
            result = (((b-a)/a) * 100).toFixed(1)+"%";
        }
        else {
            result = (( a < b ? "-" + (((b - a) * 100) / a).toFixed(2) : (((a - b) * 100) / b).toFixed(2) ))+"%";
        }
        return result !="NaN%" ? result : "0.0%";
    }
    const getLabel = (item) => {
        let _shortLabel ="";
        switch (item) {
          case 'Jan - Mar':
            _shortLabel ="J-M";
            break;
          case 'Apr - Jun':
            _shortLabel ="A-J";
            break;
          case 'Jul - Sep':
            _shortLabel ="J-S";
            break;
          case 'Oct - Dec':
            _shortLabel ="O-D";
            break;
          default:
            _shortLabel =item.substring(0, 3);
            break;
        }
        return (_shortLabel);
      };
    let Duration = !item.is_year ? (item.label.includes("-") ? getLabel(item.label): item.label.substring(0, 3) ): "J-D";
    return (
        <View activeOpacity={1} style={[styles.renderReportsListViewCardContainer,{borderTopLeftRadius: checkFirstCard ? 7 : 0, borderTopRightRadius: checkFirstCard ? 7 : 0, borderBottomLeftRadius: checkDataLength ? 7 : 0, borderBottomRightRadius:checkDataLength ? 7 : 0,borderBottomWidth: checkDataLength ? 1 : 0,marginBottom:checkDataLength ? 20 : 0}]}
        key={item.index + item.name}
        >
            <View style={styles.renderReportsListViewLeftSecContainer}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.renderReportsListViewLeftSecText}>{Duration !=null ? Duration:item.label.substring(0, 3)} {item.year != null & item.year !="" && ("'" +item.year.slice(-2))}</Text>
            </View>
            
            {compareWith == "" && 
            <TouchableOpacity activeOpacity={1} style={styles.renderReportsListViewRightSecContainer} 
                onPress ={()=> item.metric_detail_id > 0 && (setChatMetricId(item.metric_detail_id),setChatMetric(1),setShowChatInfo(true))}
            >
                <Text style={[styles.renderReportsListViewRightSecValue,{maxWidth:160}]} adjustsFontSizeToFit={true} minimumFontScale={0.7} allowFontScaling={true}  numberOfLines={1}>{item.amount != 0 ? ((item.amount < 0 ? "-" : "")+ constants.InrformatterWithDecimals.format((item.amount < 0 ?item.amount * -1 :item.amount).toFixed(2))) : "-"}{item.amount != 0 && listInrDenominationDetails.denominationType1} </Text>
                
                <Text style={[styles.renderReportsListViewRightSecMargin,{color:item.amount > item.previous_amount ? themeStyles.LIGHT_TEXT_GREEN_COLOR: themeStyles.LIGHT_TEXT_RED_COLOR, minWidth:45,maxWidth:45,textAlign:'right'}]} adjustsFontSizeToFit={true} minimumFontScale={0.6} allowFontScaling={true} numberOfLines={1}> {m1}</Text>
                {item.is_comment && <Image source={require('../../assets/Img/message.png')} style={{ width: 16, height: 16, resizeMode: 'contain', position:'absolute', top:-3, right:-10,margin:2}} />}
            </TouchableOpacity>
            }
            {compareWith!= "" && compareWith!= "Budget Value" &&
                <>
                    <TouchableOpacity activeOpacity={1} style={styles.renderReportsListViewRightSecValue2Container}
                        onPress={() => item.metric_detail_id > 0 && (setChatMetricId(item.metric_detail_id), setChatMetric(1), setShowChatInfo(true))}  
                    >
                        <Text style={[styles.renderReportsListViewRightSecValue, { maxWidth: ((constants.screenWidth - 140) / 2) }]} adjustsFontSizeToFit={true} minimumFontScale={0.7} allowFontScaling={true} numberOfLines={1}>{item.amount != 0 ? ((item.amount < 0 ? "-" : "") + constants.InrformatterWithDecimals.format((item.amount < 0 ? item.amount * -1 : item.amount).toFixed(2))) : "-"}{item.amount != 0 && listInrDenominationDetails.denominationType1} </Text>
                        {item.is_comment && <Image source={require('../../assets/Img/message.png')} style={styles.listViewCommentIcon} />}

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderLeftColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderLeftWidth: 1, marginLeft: 10, flexShrink: 0.8 }}
                        onPress={() => item.metric_detail_id2 > 0 && (setChatMetricId(item.metric_detail_id2), setChatMetric(2), setShowChatInfo(true))}
                    >
                        <Text style={[styles.renderReportsListViewRightSecValue, { maxWidth: ((constants.screenWidth - 140) / 2) }]} adjustsFontSizeToFit={true} minimumFontScale={0.7} allowFontScaling={true} numberOfLines={1}>{item.amount2 != 0 ? ((item.amount2 < 0 ? "-" : "") + constants.InrformatterWithDecimals.format((item.amount2 < 0 ? item.amount2 * -1 : item.amount2).toFixed(2))) : "-"}{item.amount2 != 0 && listInrDenominationDetails.denominationType2} </Text>
                        {item.is_comment2 && <Image source={require('../../assets/Img/message.png')} style={styles.listViewCommentIcon} />}
                    </TouchableOpacity>
                </>
            }
            {compareWith!= "" && compareWith == "Budget Value" &&
                <>
                    <TouchableOpacity activeOpacity={1} style={styles.renderReportsListViewRightSecValue2Container}
                        onPress={() => item.metric_detail_id > 0 && (setChatMetricId(item.metric_detail_id), setChatMetric(1), setShowChatInfo(true))}  
                    >
                        <Text style={[styles.renderReportsListViewRightSecValue, { maxWidth: ((constants.screenWidth - 190) / 2) }]} adjustsFontSizeToFit={true} minimumFontScale={0.7} allowFontScaling={true} numberOfLines={1}>{item.current_value != 0 ? ((item.current_value < 0 ? "-" : "") + constants.InrformatterWithDecimals.format((item.current_value < 0 ? item.current_value * -1 : item.current_value).toFixed(2))) : "-"}{item.current_value != 0 && listInrDenominationDetails.denominationType1} </Text>
                        {item.is_comment && <Image source={require('../../assets/Img/message.png')} style={styles.listViewCommentIcon} />}

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderLeftColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderLeftWidth: 1, marginLeft: 10, flexShrink: 0.8 }}
                        // onPress={() => item.metric_detail_id2 > 0 && (setChatMetricId(item.metric_detail_id2), setChatMetric(2), setShowChatInfo(true))}
                    >
                        <Text style={[styles.renderReportsListViewRightSecValue, { maxWidth: ((constants.screenWidth - 190) / 2) }]} adjustsFontSizeToFit={true} minimumFontScale={0.7} allowFontScaling={true} numberOfLines={1}>{item.budget_value != 0 ? ((item.budget_value < 0 ? "-" : "") + constants.InrformatterWithDecimals.format((item.budget_value < 0 ? item.budget_value * -1 : item.budget_value).toFixed(2))) : "-"}{item.budget_value != 0 && listInrDenominationDetails.denominationType2} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderLeftColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderLeftWidth: 1, marginLeft: 10, flexShrink: 0.8,maxWidth:50 }}
                    >
                        <Text style={[styles.renderReportsListViewRightSecMargin,{color:themeStyles.LIGHT_TEXT_GREEN_COLOR, minWidth:45,maxWidth:45,textAlign:'right'}]} adjustsFontSizeToFit={true} minimumFontScale={0.6} allowFontScaling={true} numberOfLines={1}> {m1}</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    );
};
export default ReportDetailListViewCard;