import { StyleSheet } from 'react-native';
import theme from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
    UserConsentButton: {
        ...common.button, alignItems: "center", marginTop: 30, paddingVertical: 10, minHeight: 60
    },
    consentTitle: {
        color: theme.PRIMARY_TEXT_COLOR,
        fontSize: theme.FONT_SIZE_TITLE,
        fontWeight: theme.FONT_WEIGHT_MEDIUM,
        textAlign: 'center',
        paddingBottom: 15,
    },
    consentDesc: { color: theme.PRIMARY_TEXT_COLOR, fontSize: theme.FONT_SIZE_LARGE, textAlign: 'center', paddingBottom: 30, backgroundColor: constants.WHITE_COLOR, },
    consentNoteContainer: { flexDirection: 'row', paddingLeft: 15 },
    consentNotes: { color: theme.SECONDARY_TEXT_COLOR, fontSize: theme.FONT_SIZE_SMALL, paddingLeft: 5, paddingBottom: 10, paddingRight: 5 },
    ModalIconContainer: { width: 70, height: 70, backgroundColor: '#FEBD34', borderRadius: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15 ,elevation:2,shadowColor:'#111'},
    ConsentModalSecondaryText: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.PRIMARY_TEXT_COLOR,
        textAlign: "center",
        width: '76%', marginLeft: '12%', marginBottom: 20,lineHeight:18
    },
    UserConsentModalButton: {
        ...common.button, alignItems: "center", marginTop: 30, paddingVertical: 10, minHeight: 50, backgroundColor: theme.PRIMARY_COLOR, marginTop: 0, width: '80%', alignSelf: 'center', borderRadius: 10
    },
})