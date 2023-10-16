import { StyleSheet } from 'react-native';
import theme from './theme.styles';
import constants from './constants';
export default StyleSheet.create({
    loginInput: {
        fontSize: theme.FONT_SIZE_LARGE,
        borderRadius: theme.BORDER_RADIUS_10,
        width: "100%",
        color: theme.INPUT_PLACEHOLDER_COLOR,
        paddingLeft: 15,
        marginBottom: 35,
        borderBottomWidth:1,
        borderColor:'#dcdcdc',
    },
    errorMessage:{
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.DANGER_COLOR,
        textAlign: "center"
    },
    button: {
        width: "100%",
        justifyContent: "center",
        flexDirection: 'row',
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: theme.PRIMARY_COLOR,
        paddingVertical: 13
    },
    btnText: {
        color: theme.WHITE_COLOR,
        fontSize: theme.FONT_SIZE_LARGE,
        textAlign: "center",
        fontWeight: theme.FONT_WEIGHT_MEDIUM
    },
    searchEmptyResult:{flexDirection:'column',alignItems:'center', justifyContent:'center',height:constants.screenHeight * .6},
    searchEmptyResultIcon:{ width: 52, height: 52, resizeMode: 'contain'},
    searchEmptyResultDesc:{fontSize:16,lineHeight:25,width:'50%',marginTop:15,textAlign:'center'},
    searchEmptyResultSearchedText:{color:theme.PRIMARY_TEXT_COLOR,textTransform:'capitalize'},

    // Search Company
    searchInputContainer:{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',minHeight:55,marginVertical:15,},
    searchInputHeaderContainer:{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',minHeight:60,marginRight:20},
    searchInput:{ height: 54, width: constants.screenWidth - 40, fontSize: 14, zIndex: 10, color: theme.PRIMARY_TEXT_COLOR, borderColor: theme.CARD_BORDER_COLOR_LIGHT, borderWidth: 1, paddingLeft: 20, borderRadius: 50, position: 'relative' },
    searchInputTheme:{ placeholder: theme.PRIMARY_COLOR, text: theme.PRIMARY_COLOR, primary: theme.PRIMARY_COLOR, underlineColor: 'transparent' },
    searchInputSearchIconContainer:{ position: 'absolute', right: 15, alignSelf: 'center', zIndex: 12 },
    searchInputSearchIcon:{ width: 24, height: 24, resizeMode: 'contain' },
    // Title Conainer
    titleContainer:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',minHeight:60},
    title:{fontSize:18,color:theme.PRIMARY_TEXT_COLOR,fontWeight:theme.FONT_WEIGHT_MEDIUM},
    searchIcon:{ width: 24, height: 24, resizeMode: 'contain' },
    
})