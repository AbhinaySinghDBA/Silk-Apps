import { StyleSheet } from 'react-native';
import theme from './theme.styles';
import common from './commonStyles';
import constants from './constants';
export default StyleSheet.create({
    //LOGIN ONBOARDING USER
    container: {flex: 1,},
    inner: { paddingHorizontal: 20 },

    //otp screen
    otpVerificationContainer:{},
    codeFieldRoot: { marginTop: 30, justifyContent: 'flex-start' },
    cell: {  width: 56, height: 56, lineHeight: 56, fontSize: theme.FONT_SIZE_OTP,borderWidth: 1,borderColor: theme.BORDER_COLOR,textAlign: 'center',marginRight: 20,color: theme.OTP_COLOR,borderRadius:7,maxWidth:56, maxHeight:56, alignContent:'center',justifyContent:'center',alignItems:'center',textAlignVertical:'center' },
    focusCell: {borderColor: theme.PRIMARY_COLOR,},
    filledCells:{borderColor: theme.PRIMARY_COLOR,},
    resendCol: {justifyContent: "flex-start",flexDirection: "row",},
    verifyBtn: { width: "40%",justifyContent: "center", flexDirection: 'row',borderWidth: 0,borderRadius: 50,backgroundColor: theme.PRIMARY_COLOR,paddingVertical: 18,marginTop: 40,marginBottom: 20,},
    verifyBtnTxt: {color: theme.WHITE_COLOR,fontSize: theme.FONT_SIZE_LARGE,textAlign: "center",fontWeight: theme.FONT_WEIGHT_MEDIUM},
    otpErrorMsg: {...common.errorMessage,marginTop: 10,marginBottom:10,lineHeight:20,textAlign: 'left'},
    otpInnerText:{fontSize:theme.FONT_SIZE_MEDIUM,justifyContent:"center"},
    otpResendText: { fontWeight: theme.FONT_WEIGHT_MEDIUM, color: theme.YELLOW_SHADE, },

    codeFieldRootStyle: {height: constants.createPinInput.CELL_SIZE,marginTop: 15,paddingHorizontal: 20,justifyContent: 'center',},
    codeFieldRootCell: {marginHorizontal: 8,height: constants.createPinInput.CELL_SIZE,width: constants.createPinInput.CELL_SIZE,lineHeight: constants.createPinInput.CELL_SIZE - 5,fontSize: constants.createPinInput.CELL_SIZE - 15,textAlign: 'center',borderRadius: constants.createPinInput.CELL_BORDER_RADIUS,color: theme.PRIMARY_COLOR_DARK,backgroundColor: theme.INPUT_BACKGROUND_COLOR,},

    //Login
    inner: { marginHorizontal: 20 },
    LoginLogoHeaderContainer:{paddingVertical:7,backgroundColor:'#fff',marginHorizontal:-20,paddingLeft:15},
    loginTitleText:{paddingTop:constants.screenHeight* .15, fontSize:26, fontWeight: theme.FONT_WEIGHT_HEAVY,color:theme.PRIMARY_COLOR,lineHeight:32},
    textInputMobileNo: {fontSize: theme.FONT_SIZE_LARGE,borderRadius: 7,width: "100%",color: theme.INPUT_PLACEHOLDER_COLOR,marginBottom: 10,marginTop:15,borderWidth:1,backgroundColor:'#fff',paddingVertical:18,paddingLeft: 50,borderColor:'#E0E7E3',minHeight:66},
    InputContainer: {position: "absolute",left: 15,minHeight:66,marginTop:15,justifyContent:'center'},
    InputRightContainer:{position: "absolute",right: 15,minHeight:66,marginTop:15,justifyContent:'center'},
    CountryFlag: {width: 24,height: 24,},
    errorMsg: {...common.errorMessage,marginTop: 0,fontSize: theme.FONT_SIZE_LARGE,textAlign: "left",lineHeight: 24},
    loginButton: {width: "40%",justifyContent: "center",flexDirection: 'row',borderWidth: 0,borderRadius: 50,backgroundColor: theme.PRIMARY_COLOR,paddingVertical: 18,marginTop: 40,marginBottom: 20,},
    btnText: {color: theme.WHITE_COLOR,fontSize: theme.FONT_SIZE_LARGE,textAlign: "center", fontWeight: theme.FONT_WEIGHT_MEDIUM},
});