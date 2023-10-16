import React from 'react';
import {View,Text,Image} from 'react-native';
import styles from '../../styles/commonStyles';
const SearchEmptyResult = (props) => {
    const { title = ''} = props;
    return (
        <View style={styles.searchEmptyResult}>
            <Image source={require('../../assets/Img/searchEmpty.png')} style={styles.searchEmptyResultIcon} />
            <Text style={styles.searchEmptyResultDesc}>Sorry we couldn't find any matches for <Text style={styles.searchEmptyResultSearchedText}>{title}</Text></Text>
        </View>
    );
}
export default SearchEmptyResult;