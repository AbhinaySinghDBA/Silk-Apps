import React,{useState, useEffect} from 'react';
import { StyleSheet, View,  TouchableOpacity,Image ,TextInput} from 'react-native';
import themeStyles from '../../styles/theme.styles';
import constants from '../../styles/constants';

const FileSearch = (props) => {
    const {searchedKey, setSearchedKey=null,placeholderText='', setSearchEnabled} = props;
    useEffect(()=>{
        return()=>{setSearchEnabled(false);}
    },[])
    return (
        <View style={styles.searchInputHeaderContainer}>
            <TextInput
                value={searchedKey}
                onChangeText={setSearchedKey}
                autoFocus={true}
                placeholder={placeholderText}
                placeholderTextColor={themeStyles.SECONDARY_TEXT_COLOR}
                style={styles.searchInput}
                selectionColor={themeStyles.PRIMARY_COLOR}
                activeOutlineColor='transparent'
                activeUnderlineColor='transparent'
                underlineColor='transparent'
                theme={{ colors: styles.searchTheme }}
                mode='flat'
                onBlur={() => (setSearchedKey(searchedKey),setSearchEnabled(false) )}
            />
            <TouchableOpacity activeOpacity={1}
                onPress={() => (setSearchedKey(searchedKey),setSearchEnabled(false))}
                style={styles.searchIconContainer}
            >
                <Image source={require('../../assets/Img/Search_active.png')} style={styles.searchIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchInputHeaderContainer:{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',minHeight:60,marginRight:20,marginLeft:20, backgroundColor:'#fff'},
    searchInput:{ height: 54,width: constants.screenWidth - 40, fontSize: 14, backgroundColor: '#fff', zIndex: 10,  color: themeStyles.PRIMARY_TEXT_COLOR,borderColor:themeStyles.CARD_BORDER_COLOR_LIGHT,borderWidth:1,paddingLeft:20,borderRadius:50,position:'relative'},
    searchTheme: { placeholder: themeStyles.PRIMARY_COLOR, text: themeStyles.PRIMARY_COLOR, primary: themeStyles.PRIMARY_COLOR, underlineColor: 'transparent'},

    searchIconContainer:{position:'absolute',right:15,alignSelf:'center',zIndex:12},
    searchIcon:{ width: 24, height: 24, resizeMode: 'contain' }
});

export default FileSearch;