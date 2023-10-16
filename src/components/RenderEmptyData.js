import React from 'react';
import { View,  Text } from 'react-native';
import styles from '../styles/ComponentStyles';
const RenderEmptyData = (props) => {
    const { desc='No Data Available'} = props;
    return (
        <View style={styles.emptyCardContainer}>
            <Text style={styles.emptyCardDesc}>{desc}</Text>
        </View>
    );
}

export default RenderEmptyData;


