import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';

import {TickCircle} from 'iconsax-react-native';
import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/ReportStyles';
const GraphTypeSelectionCard = (props) => {
    const {item, index , dataLength = 4, selectedType = '', setSelectedType=null} = props;
    let iconSize = 28;

    return (
        <TouchableOpacity activeOpacity={1} style={[styles.renderMetricsCardContainer,{marginBottom : ((index +1) == dataLength ) ? 20 : 10, borderColor: item.id == selectedType ? themeStyles.PRIMARY_COLOR : themeStyles.CARD_BORDER_COLOR_LIGHT}]}
            onPress={() => (setSelectedType(item.id))}
             key ={item.id + index}
        >
            <View style={styles.renderMetricsCardIconContainer}>
            <Image source={item.icon} style={{ width: iconSize, height: iconSize, resizeMode: 'contain'}} />
            </View>
            <View style={styles.renderMetricsCardRightSecContainer}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.renderMetricsCardRightSecDescription,{fontSize:16}]}>{item.title}</Text>
            </View>
            {selectedType == item.id &&
                <View style={{position:'absolute',right:15,alignSelf:'center'}}>
                    <TickCircle color={themeStyles.PRIMARY_COLOR} variant="Bold" size={24} />
                </View>
            }
        </TouchableOpacity>
    );
};

export default GraphTypeSelectionCard;