import { StyleSheet } from 'react-native';
import themeStyles from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
  //Report Screen
  //RenderCompanyCard 
  renderCompanyCardContainer: { flex: 1, flexDirection: 'row', paddingBottom: 20, borderBottomColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderBottomWidth: 1 },
  companyCardImageContainer: { alignItems: 'center', justifyContent: 'center', height: 62, width: 62, borderColor: themeStyles.CARD_BORDER_COLOR, borderWidth: 1, borderRadius: 14, marginRight: 15 },
  companyCardImage: { width: 60, height: 60, borderRadius: 14 },
  companyCardRightSecContainer: { flexDirection: 'column', justifyContent: 'space-between' },
  companyCardTypeData: { fontSize: 12, color: themeStyles.CARD_TEXT_LIGHT_COLOR, textTransform: "uppercase" },
  companyCardCompanyName: { fontSize: 16, color: themeStyles.PRIMARY_TEXT_COLOR, width: constants.screenWidth - (130) },
  companyCardDescription: { fontSize: 14, color: themeStyles.PRIMARY_TEXT_COLOR, width: constants.screenWidth - (130) },
  //RenderMetricsCard
  renderMetricsCardContainer: { flex: 1, flexDirection: 'row', borderColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderWidth: 1, borderRadius: 7 },
  renderMetricsCardIconContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 25, paddingHorizontal: 16 },
  renderMetricsCardRightSecContainer: { flexDirection: 'column', justifyContent: 'center', position: 'relative' },
  renderMetricsCardRightSecValueContainer: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  renderMetricsCardRightSecValueData: { fontSize: 16, lineHeight: 22, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM, marginRight: 5 },
  renderMetricsCardRightSecDescription: { fontSize: 14, color: themeStyles.SECONDARY_TEXT_COLOR },
  renderMetricsCardRightSecDescriptionPeriod: { color: themeStyles.LIGHT_TEXT_COLOR },
  renderMetricsCardIcon: { width: 26, height: 26, resizeMode: 'contain' },
  renderMetricsCardTrendIcon: { width: 14, height: 8, resizeMode: 'contain' },
  renderMetricsCardSelectionContainer: { position: 'absolute', right: 15, alignSelf: 'center' },
  // ReportDetailListViewCard
  renderReportsListViewCardContainer: { flexDirection: 'row', borderColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderWidth: 1, justifyContent: 'space-between', paddingRight: 10, maxHeight: 50, height: 50 },
  renderReportsListViewLeftSecContainer: { alignItems: 'center', justifyContent: 'center', borderColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderRightWidth: 1, width: 70 },
  renderReportsListViewLeftSecText: { fontSize: 14, lineHeight: 19, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM },

  renderReportsListViewRightSecContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', },
  renderReportsListViewRightSecValue: { fontSize: 14, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM, justifyContent: 'flex-end', paddingRight: 0 },
  renderReportsListViewRightSecMargin: { fontSize: 12 },

  // renderReportsListViewRightSecValue2Container:{minWidth:(constants.screenWidth - 120)/2,flexDirection:'row',borderLeftColor:themeStyles.CARD_BORDER_COLOR_LIGHT,borderLeftWidth:1,marginLeft:10,height:50,},
  renderReportsListViewRightSecValue2Container: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', },
  renderReportsListViewRightSecValue2: { textAlign: 'right', flex: 1, paddingLeft: 5 },
  renderReportsListViewRightSecMargin2: { fontSize: 12 },
  listViewCommentIcon: { width: 16, height: 16, resizeMode: 'contain', position: 'absolute', top: -3, right: -10, margin: 2 },

  // Vital Status Card
  vitalStatusTabContainer: { flex: 1, marginHorizontal: 20, backgroundColor: themeStyles.WHITE_COLOR },
  vitalStatusCardContainer: { flexDirection: 'column', paddingVertical: 17, borderBottomColor: themeStyles.CARD_BORDER_COLOR_LIGHT, borderBottomWidth: 1 },
  vitalStatusCardHeader: { fontSize: 14, color: themeStyles.PRIMARY_TEXT_COLOR, fontWeight: themeStyles.FONT_WEIGHT_MEDIUM },
  vitalStatusCardDesc: { fontSize: 14, color: themeStyles.SECONDARY_TEXT_COLOR, marginTop: 5 },

  // Reports Screen
  loaderContainer: { justifyContent: "center", alignItems: 'center', flex: 1 },
  loader: { width: 60, height: 60 },
  reportScreenContainer: {marginTop:35, paddingHorizontal: 20 },

  // Report List
  reportListContainer: { flex: 1, paddingHorizontal: 20, justifyContent: 'flex-start' },
  reportListFlatlistContainer: { flex: 1, minHeight: constants.screenHeight - 120, marginBottom: 20 },


});