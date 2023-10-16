import { StyleSheet } from 'react-native';
import themeStyles from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
    // Loader
    loaderContainer:{ justifyContent: "center", alignItems: 'center', flex: 1},
    loader:{ width: 60, height: 60 },
  
    screenContainer:{flex:1},

    leftNavigationContainer:{ position: 'absolute', top: '50%', left: 2, zIndex: 5, width: 50, height: 50 },
    rightNavigationContainer:{ position: 'absolute', top: '50%', right: -8, zIndex: 5, width: 50, height: 50, alignItems: 'center' },

    titleSectionContainer:{ marginHorizontal: 20, zIndex: 4 },
    metricHeaderSectionContainer:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 20 },
    firstMetricHeaderContainer:{flexDirection: 'row', alignItems: 'center'},
    firstMetricHeaderBox:{ width: 12, height: 12, backgroundColor: themeStyles.CHART_YELLOW, borderRadius: 3, marginRight: 8 },
    firstMetricHeader:{ fontSize: 16, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM, maxWidth: constants.screenWidth - 130 },

    secondMetricHeaderContainer:{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginTop: 5 },
    secondMetricHeaderBox:{ width: 12, height: 12, backgroundColor: themeStyles.CHART_BLUE, borderRadius: 3, marginRight: 8 },
    secondMetricHeader:{ fontSize: 16, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM },

    chartListIconSectionContainer:{ flexDirection: 'row', justifyContent: 'flex-end' },
    chartListIconSectionSeperator:{ fontSize: 24, lineHeight: 24, color: themeStyles.CARD_BORDER_COLOR, paddingHorizontal: 10 },

    borderMetricHeaderContainer:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 0, paddingBottom: 0, marginLeft: 70 },
    firstBorderMetricHeader:{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderBottomColor: themeStyles.CHART_YELLOW, borderBottomWidth: 4, marginRight: 5, borderRadius: 2 },
    secondBorderMetricHeader:{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-start', borderBottomColor: themeStyles.CHART_BLUE, borderBottomWidth: 4, marginRight: 5, borderRadius: 2 },
    thirdBorderHeader:{ flex: 1,justifyContent: 'flex-start', borderBottomColor: themeStyles.PRIMARY_COLOR, borderBottomWidth: 4, marginRight: 5, borderRadius: 2, maxWidth:50 },

    detailsSectionContentContainer:{ flexGrow: 1 },
    detailsSectionContainer:{ marginHorizontal: 0, marginBottom: 0 },
    detailsSectionInnerContainer:{ paddingHorizontal: 20, zIndex: 4 },

    listSectionContainer:{ flex: 1, minHeight: constants.screenHeight * .63 },
    chartSectionContainer:{ position: 'relative', zIndex: 4 },
    
    chartSectionCommentsNoteContainer:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: '6%' },
    chartSectionCommentsBlock:{ width: 12, height: 12, backgroundColor: themeStyles.CHART_YELLOW, borderRadius: 3, marginRight: 8 },
    chartSectionCommentsBlockBlue:{ width: 12, height: 12, backgroundColor: themeStyles.CHART_BLUE, borderRadius: 3, marginRight: 8 },
    chartSectionCommentsNote:{ fontSize: 14, color: themeStyles.PRIMARY_TEXT_COLOR },

    addMetricsToCompareButton:{ paddingVertical: 16, paddingHorizontal: 20, backgroundColor: themeStyles.PRIMARY_COLOR, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20, minWidth: 120, width: '40%', alignSelf: 'center', zIndex: 5 },
    addMetricsToCompareText:{ fontSize: 14, color: themeStyles.WHITE_COLOR },

    // Metrics & Graph selection modal for metric comparrision
      // Metrics List
    metricsListConatiner:{ marginTop: 15 ,flex:1},
    listHeader:{ fontSize: 18, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM, paddingTop: 10, paddingBottom: 20 },
    metricsListSectionErrorMessage:{ paddingTop: 30, paddingBottom: 50, textAlign: 'center', color: themeStyles.DANGER_COLOR },
    comparisionSubmitModalButton:{ paddingVertical: 16, paddingHorizontal: 20, backgroundColor: themeStyles.PRIMARY_COLOR, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20, width: '100%', alignSelf: 'center' },
    comparisionSubmitButtonText:{ fontSize: 14, color: themeStyles.WHITE_COLOR },

    // Metrics & Graph selection modal for metric comparrision
    // Chat Modal
    chatHeaderSectionContainer:{ flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 20, borderBottomColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderBottomWidth: 1 },
    chatHeaderSectionIconContainer:{ borderColor: themeStyles.CARD_BORDER_COLOR, borderWidth: 0, borderRadius: 40, marginRight: 10 },
    chatHeaderSectionIcon:{ width: 36, height: 36, resizeMode: 'contain' },
    chatHeaderSectionTitleContainer:{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    chatHeaderSectionTitle:{ fontSize: 18, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM },
    chatContainer:{ marginTop: 0, height:constants.screenHeight * .55, maxHeight:constants.screenHeight * .52 },
    chatViewContainer:{ marginHorizontal: 20, marginBottom: 100 },

    chatInputSectionContainer:{ position: 'absolute', bottom: 20, marginHorizontal: 20 },
    chatInputSectionViewContainer:{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 55, marginVertical: 15,elevation:3, shadowColor: '#171717', },
    chatSectionTextInput:{ height: 54, width: constants.screenWidth - 40, fontSize: 14, backgroundColor: themeStyles.WHITE_COLOR, zIndex: 10, color: themeStyles.PRIMARY_TEXT_COLOR, borderColor: themeStyles.CARD_BORDER_COLOR, borderWidth: 1, paddingLeft: 20, borderRadius: 50, position: 'relative', paddingRight: 45, },
    chatSubmitIconContainer:{ position: 'absolute', right: 15, alignSelf: 'center', zIndex: 12 },
    //Render Chat Details
    chatLeftSectionContainer:{ flexDirection: 'column', marginTop: 15, alignItems: 'flex-start' },
    chatLeftSectionCommentContainer:{ backgroundColor: themeStyles.CARD_BACKGROUND_GREEN, maxWidth: constants.screenWidth * .8, paddingVertical: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15, paddingHorizontal: 15 },
    chatLeftSectionComment: { fontSize: 14, color: themeStyles.PRIMARY_COLOR, lineHeight: 18 },
    chatDuration:{ fontSize: 12, color: themeStyles.SECONDARY_TEXT_COLOR, marginTop: 7 },

    chatRightSectionContainer:{ flexDirection: 'column', marginTop: 15, alignItems: 'flex-end' },
    chatRightSectionCommentContainer:{ backgroundColor: themeStyles.PRIMARY_COLOR, maxWidth: constants.screenWidth * .8, paddingVertical: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15, paddingLeft: 15, paddingRight: 8 },
    chatRightSectionComment: { fontSize: 14, color: themeStyles.WHITE_COLOR, lineHeight: 18 },

});