import { StyleSheet } from 'react-native';
import themeStyles from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
    // Loader
    loaderContainer:{ justifyContent: "center", alignItems: 'center', flex: 1},
    loader:{ width: 60, height: 60 },

    orgScreenContainer:{ paddingHorizontal: 20 },
    companyProfileHeaderContainer:{flexDirection:'row',marginTop:20,marginHorizontal:20},
    companyLogoContainer:{alignItems: 'center', justifyContent: 'center',height:62, width:62, borderColor:themeStyles.CARD_BORDER_COLOR,borderWidth:1,borderRadius:14,marginRight: 15,backgroundColor:'#f5f5f5'},
    companyLogo:{width: 60, height: 60,borderRadius:10},
    companyTitleContainer:{flexDirection: 'column', justifyContent: 'center'},
    companyTitle:{ fontSize: 16, color: themeStyles.PRIMARY_TEXT_COLOR,width: constants.screenWidth - (130)},
    companyDesc:{ fontSize: 14, color: themeStyles.PRIMARY_TEXT_COLOR,width: constants.screenWidth - (130),marginTop:5},

    tabHeaderStyle:{ color: themeStyles.PRIMARY_TEXT_COLOR, marginBottom: 15,fontSize:16,marginTop:10 },
    tabHeaderFocussedStyle:{ color: themeStyles.PRIMARY_TEXT_COLOR, fontSize:16, width: constants.screenWidth / 3, marginBottom: 15 ,fontWeight:themeStyles.FONT_WEIGHT_MEDIUM,marginTop:10, marginLeft:-15, marginRight:15},

    indicatorStyle:{ backgroundColor: 'transparent', padding: 0, marginBottom: -2,},
    tabViewStyle:{ backgroundColor: '#ffffff', flexDirection: 'row',borderColor: themeStyles.CARD_BORDER_COLOR_LIGHT,elevation:0,borderBottomWidth:0 },
    tabStyle:{ backgroundColor: '#fff', width: constants.screenWidth / 3, marginBottom:0,paddingBottom:0},
    labelStyle:{ color: themeStyles.PRIMARY_COLOR,textAlign:'left' }
})