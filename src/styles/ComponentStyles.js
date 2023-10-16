import { StyleSheet } from 'react-native';
import theme from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
    // Empty card
    emptyCardContainer:{height:constants.screenHeight -  150,flexDirection: 'row',flex: 1, justifyContent: 'center',alignItems:'center' },
    emptyCardDesc:{alignSelf:'center',lineHeight: 40, fontSize: 16, color: '#363636'},
    // Empty card
})