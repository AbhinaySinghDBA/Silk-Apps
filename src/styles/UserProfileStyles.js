import { StyleSheet } from 'react-native';
import themeStyles from './theme.styles';
// import common from './commonStyles';
// import constants from './constants';
export default StyleSheet.create({
    container: { flex: 1},
    shadowProp: { shadowColor: themeStyles.SHADOW_COLOR, shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.1, shadowRadius: 3,},
    profileHeaderContainer:{flexDirection: 'column', padding: 20, alignItems: 'flex-start',justifyContent:'flex-start', backgroundColor:themeStyles.PRIMARY_COLOR,height:120,borderBottomRightRadius:20,borderBottomLeftRadius:20, maxHeight:120},
    proileHeaderText:{ fontSize: themeStyles.FONT_SIZE_TITLE, fontWeight: themeStyles.FONT_WEIGHT_HEAVY, color: themeStyles.WHITE_COLOR},
    investorDataContainer:{ marginHorizontal:20,height:100,maxHeight:100,backgroundColor:themeStyles.WHITE_COLOR,flexDirection:'row',marginTop:-50,borderRadius:15,elevation:8},
    investorLogo:{width:72,height:72,borderRadius:15,marginHorizontal:15,alignSelf:'center',backgroundColor:'#d8d8d8'},
    investorDetailsContainer:{flexDirection:'column',justifyContent:'center'},
    investorTitle:{fontSize:themeStyles.FONT_SIZE_LARGER, color:themeStyles.PRIMARY_TEXT_COLOR,fontWeight:themeStyles.FONT_WEIGHT_MEDIUM},
    investorDesc:{fontSize:themeStyles.FONT_SIZE_MEDIUM, color:themeStyles.SECONDARY_TEXT_COLOR,textTransform:'uppercase'},
    cardsOverAllContainer:{marginHorizontal:20,flexDirection:'column',marginTop:15},
    cardsContainer:{flexDirection:'row',alignItems:'center',paddingVertical:20, borderColor:themeStyles.CARD_BORDER_COLOR_LIGHT,borderBottomWidth:1},
    cardText:{fontSize:themeStyles.FONT_SIZE_LARGE,color:themeStyles.PRIMARY_TEXT_COLOR,marginLeft:10,fontWeight:themeStyles.FONT_WEIGHT_MEDIUM},

    screenLoaderContainer :{ justifyContent: "center", alignItems: 'center', flex: 1 },
    screenLoader:{ width: 60, height: 60 },
})