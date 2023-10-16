import React, { useState, useRef, useEffect, useLayoutEffect, useReducer,useContext } from 'react';
import {View,Text,ActivityIndicator,Pressable,ScrollView} from 'react-native';
import {CodeField,Cursor,useBlurOnFulfill,useClearByFocusCell,} from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import styles from '../../styles/LoginStyles';
import Constants from '../../styles/constants';
import theme from '../../styles/theme.styles';


import { actionCreators, reducer, initialState } from '../GlobalState';
import { AuthContext } from '../../routes/Router';

export default function OtpVerification(props) {
    const { PhoneNumber , userEmail} = props;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: Constants.OTP_CELL_COUNT });
    const [props1, getCellOnLayoutHandler] = useClearByFocusCell({value,setValue,
    });
    const [IsDisabled, setIsDisabled] = useState(true);
    const [IsLoading, setIsLoading] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [IsPressBtn, setPressBtn] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [resentOtp, setResentOtp] = useState(0);
    const MsgProviderName = "wati";
    const { signIn } = useContext(AuthContext);
    const navigation = useNavigation();
    useEffect(() => {
        if (value.length == 4){
            setIsDisabled(false);
            setIsLoading(true);
            verifyOtpValue();
        }
        else{
            setIsDisabled(true);
            setErrorMsg('');
        }
    },[value]);

    const verifyOtpValue = async () => {
        // PostHog.capture('Clicked verify phone number button', { 'Screen': 'login' })
        setPressBtn(true);
        setIsDisabled(true);
        setIsLoading(true);
        let inputOtp = parseInt(value);
        const verifyOtpData = {
            "contact_number":PhoneNumber,
            "otp": inputOtp,
        };
        await axios.post(Constants.APIDatas.verifyOTPUrl, verifyOtpData)
            .then(res => {
                // console.log('userdata', JSON.stringify(res.data))
                if(!!res.data){
                    setErrorMsg('');
                    // const _data = {"aa_consent": false, "email": "sivanesan@mail.com", "is_email_verified": false, "is_phone_number_verified": true, "phone_number": "919884488557", "picture_url": "", "pin_status": true, "saving_nuget_type": "big", "sms_consent": true, "token": null, "user_id": "16efe764-910d-46db-975e-da2276789c35", "user_name": "Sivanesan"};
                    const _data = [{...res.data.data.item.user,"access_token":res.data.data.item.access_token}]

                    if(_data[0].user_type_id == 3){
                        navigation.navigate('CompanySelectionScreen', { userData: _data[0] });
                    }
                    else{
                        dispatch(actionCreators.UserDetails(_data[0]));
                        setIsLoading(false);
                        AsyncStorage.setItem('UserPhoneNumber', PhoneNumber.toString())
                        AsyncStorage.removeItem("userVerifiedDetails");
                        AsyncStorage.setItem('userVerifiedDetails', JSON.stringify(_data[0]));
                        signIn(res.data.data.item.access_token);
                    }
                }
                else {
                    setIsLoading(false);
                    setErrorMsg('Enter Correct OTP');
                    setTimeout(() => { setErrorMsg('') }, 5000);
                    setIsDisabled(false);
                }
            })
            .catch(function (error) {
                // Error
                console.log('err', error.response.data)
                if(!!error.response.data){
                    setIsLoading(false);setIsDisabled(false);
                    setErrorMsg(error.response.data.message);
                    setTimeout(() => { setErrorMsg(''); }, 10000);
                }
                else {
                    setIsLoading(false);
                    setErrorMsg('Enter Correct OTP');
                    setTimeout(() => { setErrorMsg('') }, 5000);
                    setIsDisabled(false);
                }
            });
    };

    return (
        <ScrollView style={[styles.container, styles.otpVerificationContainer]} 
            keyboardShouldPersistTaps={"always"} >
            <View style={{flex:2,flexDirection:'column',justifyContent:'space-between'}}>
                <Text style={styles.loginTitleText}>Verify your account</Text>
                {/* <Text style={{marginTop:10,fontSize:14,color:theme.PRIMARY_TEXT_COLOR}}>Enter the code sent to *******{PhoneNumber.substring(10, 7)}</Text> */}
                <Text style={{marginTop:10,fontSize:14,color:theme.PRIMARY_TEXT_COLOR}}>Enter the code sent to your email:</Text>

                <Text style={{marginTop:10,fontSize:14,color:theme.PRIMARY_TEXT_COLOR}}><Constants.B>{userEmail}</Constants.B></Text>
                <CodeField
                    {...props1}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={Constants.OTP_CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    autoFocus={true}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    secureTextEntry
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell,symbol != '' && styles.filledCells,{borderColor:ErrorMsg != '' ? theme.DANGER_COLOR : theme.BORDER_COLOR }]}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            {(isFocused ? <Cursor /> : null)}
                            {symbol}
                        </Text>
                    )}
                />
                {ErrorMsg != '' && <Text style={styles.otpErrorMsg}>{ErrorMsg}</Text>}
                {/* <View style={styles.resendCol}>
                    <Text style={styles.otpInnerText}>Don't receive the OTP ? </Text>
                    <Pressable
                        onPress={() => ResendOtp()}
                        style={({ focused }) => ({ backgroundColor: focused ? 'transparent' : 'transparent' })}
                    >
                        <Text style={[styles.otpInnerText,styles.otpResendText]}> RESEND OTP</Text>
                    </Pressable>
                </View> */}
                <Pressable
                    // disabled={IsDisabled}
                    onPress={() => verifyOtpValue()}
                    style={[styles.verifyBtn, { backgroundColor: IsDisabled ? theme.DISABLE_BACKGROUND_COLOR : theme.PRIMARY_COLOR ,marginTop: ErrorMsg != '' ? 0 : 40 }]}
                >
                    <Text style={[styles.verifyBtnTxt, {}]}>Submit</Text>
                </Pressable>
                {IsLoading ? <ActivityIndicator size="large" color={theme.ACTIVITY_INDICATOR_COLOR} /> : null}
            </View>
        </ScrollView>
    );
};