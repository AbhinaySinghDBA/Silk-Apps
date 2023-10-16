import { StyleSheet } from 'react-native';
import themeStyles from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
    // Feed Card
    feedCardContainer:{flex:1,flexDirection:'column',padding:20,borderBottomColor:themeStyles.CARD_BORDER_COLOR_LIGHT,borderBottomWidth:1,},
    companySecContainer:{flex:1,flexDirection:'row', alignContent:'center',justifyContent:'space-between'},
    companyLeftSecContainer:{flexDirection:'row', alignItems:'center',},
    companyLeftSecLogoContainer:{alignItems: 'center', justifyContent: 'center',height:30, width:30, borderColor:themeStyles.CARD_BORDER_COLOR,borderWidth:1,borderRadius:30,marginRight: 8,backgroundColor:'#f5f5f5'},
    companyLeftSecLogo:{width: 30, height: 30 ,borderRadius:30},
    companyLeftSecCompanyName:{fontSize: 16, color: themeStyles.PRIMARY_TEXT_COLOR,fontWeight:themeStyles.FONT_WEIGHT_MEDIUM},
    companyLeftSecDuration:{fontSize: 12,color:themeStyles.CARD_TEXT_LIGHT_COLOR,},
    shareIconContainer:{alignSelf:'center',paddingLeft:15, width:30, height:30,paddingTop:10},
    shareIcon:{width: 15, height: 15 },

    feedContentGeneral : {fontSize: 14, color: themeStyles.PRIMARY_TEXT_COLOR,width: constants.screenWidth - (40),lineHeight:20,marginTop:10},
    readMoreText:{textAlign:'right', color:themeStyles.LINK_TEXT_COLOR, textDecorationLine:'underline', fontSize:12},

    urlContainer:{flex:1, flexDirection:'row',marginTop:6, alignItems:'center'},
    urlDesc:{fontSize:14,color:themeStyles.LINK_TEXT_COLOR,marginLeft:5},

    updateCardContainer:{flex:1,flexDirection:'column',backgroundColor:themeStyles.WHITE_COLOR,borderWidth:1,borderColor:themeStyles.CARD_BORDER_COLOR_LIGHT,minHeight:200,borderRadius:10,marginTop:15},
    updateCardImageContainer:{backgroundColor:'#fff',height:150,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomWidth:1,borderColor:themeStyles.CARD_BORDER_COLOR_LIGHT,},
    updateCardImage : { height: 145,width:'100%'},
    updateCardViewMetricsText:{fontSize:14,lineHeight:50,color:themeStyles.PRIMARY_COLOR,textAlign:'center',fontWeight:themeStyles.FONT_WEIGHT_MEDIUM},
    // Feed Card
    
    // Feed Screen
    footerLoaderContainer:{ marginBottom: 30, marginTop: -50, alignItems: 'center' },
    footerLoader: { width: 60, height: 60 },

    screenLoaderContainer :{ justifyContent: "center", alignItems: 'center', flex: 1 },
    screenLoader:{ width: 60, height: 60 },

    screenContainer:{paddingHorizontal:0},

    // Feed Screen
})