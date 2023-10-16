import { StyleSheet } from 'react-native';
import themeStyles from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
    // Loader
    loaderContainer:{ justifyContent: "center", alignItems: 'center', flex: 1},
    loader:{ width: 60, height: 60 },
    
    filesContainer:{ marginTop:20},

    searchContainer:{ flex: 1, flexDirection: "row" },
    searchIcon:{ width: 24, height: 24, resizeMode: 'contain',alignSelf:'center',marginRight:20 },

    // Files Card
    filesCardContainer:{flex:1,flexDirection:'row',borderColor:themeStyles.CARD_BORDER_COLOR_LIGHT,borderWidth:1 ,borderRadius:7,marginBottom :10 , borderColor:themeStyles.CARD_BORDER_COLOR_LIGHT,marginHorizontal:20,},
    iconContainer:{ alignItems: 'center', justifyContent: 'center',paddingVertical:25,paddingHorizontal:14},
    filesIcon:{ width: 26, height: 24, resizeMode: 'contain'},
    titleContainer:{ flexDirection: 'column', justifyContent: 'center',position:'relative' },
    fileName:{ fontSize: 15,lineHeight:22, color: themeStyles.PRIMARY_TEXT_COLOR,fontWeight:themeStyles.FONT_WEIGHT_MEDIUM,marginRight:5, width: constants.screenWidth - 150},
    updatedBy:{ fontSize: 14, color: themeStyles.SECONDARY_TEXT_COLOR},
    updatedTime:{color:themeStyles.LIGHT_TEXT_COLOR,fontSize:12},
    optionIconContainer:{position:'absolute',right:15,alignSelf:'center'},
    optionsIcon:{ width: 22, height: 22, resizeMode: 'contain'},

    optionsDetailContainer:{position:'absolute',right:30, flexDirection:'column',backgroundColor:'#fff', width:140,shadowColor: themeStyles.SHADOW_COLOR, shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.1, shadowRadius: 3,elevation:8, zIndex:50,borderRadius:8,},

    viewOptionContainer:{flexDirection:'row',padding:10,borderBottomWidth:1,borderBottomColor:themeStyles.CARD_BORDER_COLOR_LIGHT},
    viewOptionText:{marginLeft:6,fontSize:14,color:themeStyles.PRIMARY_COLOR},

    shareOptionContainer:{flexDirection:'row',padding:10,borderBottomWidth:1,borderBottomColor:themeStyles.CARD_BORDER_COLOR_LIGHT},
    shareOptionIcon:{width: 18, height: 18 },
    shareOptionText:{marginLeft:6,fontSize:14,color:themeStyles.PRIMARY_COLOR},

    downloadOptionContainer:{flexDirection:'row',margin:10,},
    downloadOptionIconContainer:{borderColor:themeStyles.PRIMARY_COLOR,borderWidth:1,borderRadius:50, width:20, height:20, justifyContent:'center', alignItems:'center'},
    downloadOptionText:{marginLeft:6,fontSize:14,color:themeStyles.PRIMARY_COLOR},
});