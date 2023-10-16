import React, { useState, useReducer, useEffect, useLayoutEffect ,useRef} from 'react';
import axios from 'axios';
import {NativeModules,View, StyleSheet,Text, TouchableOpacity, Keyboard, TextInput, Image, Linking, SafeAreaView,StatusBar  } from 'react-native';
import DeviceNumber from 'react-native-device-number';
import {InfoCircle,Call,TickCircle} from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import theme from '../../styles/theme.styles';
import styles from '../../styles/LoginStyles'
import themeStyles from '../../styles/theme.styles';
import constants from '../../styles/constants';


import KeyboardDismiss from '../../components/LoginComponents/KeyboardDismiss';
import OtpVerification from '../../components/LoginComponents/OtpVerification';


const Login = () => {
    const [phoneNumber, setphoneNumber] = useState('');
    const [ErrorMsg, setErrorMsg] = useState('');

    //Conditional Variables
    const [Isdisabled, setIsDisabled] = useState(true);
    const [isValidMobNumber, setIsValidMobNumber] = useState(false);
    const [isOtpMessageEnable, setIsOtpMessageEnable] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    // Input Ref
    const ref_phoneNumber = useRef();
    //OTP Verify
    const GetOTP = async () => {
        AsyncStorage.setItem('UserPhoneNumber', phoneNumber);
        const otpRequestDetails = { "contact_number": phoneNumber};
        await axios.post(constants.APIDatas.getOTPUrl, otpRequestDetails)
            .then(res => {
                if(res.data.message == "Mobile OTP generated successfully"){
                    setUserEmail(res.data.data.item.email)
                    setIsOtpMessageEnable(true);
                }
                else {
                    setErrorMsg('Sorry we could not find an account with this Mobile Number.');
                    setTimeout(() => { setErrorMsg(''); }, 10000);
                }
            })
            .catch(function (error) {
                setIsValidMobNumber(true);
                if(!!error.response.data){
                    setErrorMsg(error.response.data.message);
                    setTimeout(() => { setErrorMsg(''); }, 10000);
                }
                else {
                    setErrorMsg('Sorry we could not find an account with this Mobile Number.');
                    setTimeout(() => { setErrorMsg(''); }, 10000);
                }
            });

    };

    const onChanged = (e) => {
        setphoneNumber(e.replace(/[^0-9]/g, ''));
        if (phoneNumber === 10) {
            setIsDisabled(false);
            Keyboard.dismiss();
            setIsValidMobNumber(true);
            CheckData();
        }
    }
    
    const GetPhoneNumberFromDevice = async () => {
        try {
            DeviceNumber.get().then((res) => {
                setphoneNumber(res.mobileNumber.substring(13, 3))
            }).catch((e) => ref_phoneNumber.current.focus())
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    };
    const CheckData = (e) => {
        if (phoneNumber.length == 10) {
            setIsDisabled(false);
            GetOTP();
        }else{
            setIsValidMobNumber(false);
        }
    }
    useLayoutEffect(()=> {
        !isOtpMessageEnable && GetPhoneNumberFromDevice()
    }, [1]);
    useEffect(() => {
        if (phoneNumber.length == 10) {
            setIsDisabled(false);
            GetOTP();
        }else{
            setIsDisabled(true);
            setIsValidMobNumber(false);
            setErrorMsg('');
        }
    }, [phoneNumber]);

    return (
        <KeyboardDismiss>
            <SafeAreaView style={styles.inner}>
                <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE_COLOR} />
                <View style ={styles.LoginLogoHeaderContainer}>
                    <Image
                        style={{}}
                        source={require('../../assets/Img/silkApp-logo.png')} width={120} height={50} />
                </View>
                {
                    !isOtpMessageEnable &&
                    <View style={{flex:2,flexDirection:'column',justifyContent:'space-between',}}>
                        <Text style={styles.loginTitleText}>Enter your Registered{'\n'}Mobile Number</Text>
                        <View style={{flex:1, marginTop:15}}>
                            <TextInput
                                ref={ref_phoneNumber}
                                autoFocus={true}
                                placeholder='Registered mobile number'
                                style={[styles.textInputMobileNo,{ borderColor:(ErrorMsg == '' && isValidMobNumber) ? theme.PRIMARY_COLOR : ErrorMsg != '' ? theme.DANGER_COLOR: '#E0E7E3' ,color:theme.PRIMARY_TEXT_COLOR}]}
                                // keyboardType='numeric'
                                textContentType='telephoneNumber'
                                dataDetectorTypes='phoneNumber'
                                keyboardType='phone-pad'
                                // keyboardType="number-pad"
                                onChangeText={(text) => onChanged(text)}
                                value={phoneNumber}
                                maxLength={10}  //setting limit of input
                                placeholderTextColor={theme.PLACE_HOLDER_TEXT_COLOR}
                                selectionColor={theme.SELECTION_COLOR}
                                editable={true} 
                                selectTextOnFocus={true}
                                onBlur={() => phoneNumber.length == 10 && CheckData()}
                            />
                            <View style={styles.InputContainer}>
                                <Call color={(ErrorMsg == '' && isValidMobNumber) ? theme.PRIMARY_COLOR : ErrorMsg != '' ? theme.DANGER_COLOR: theme.PRIMARY_TEXT_COLOR} variant="Outline" size={20} />
                            </View>
                            <View style={styles.InputRightContainer}>
                                { ErrorMsg != '' && <InfoCircle color={theme.DANGER_COLOR} variant="Bold" size={24} /> }
                                { ErrorMsg == '' && isValidMobNumber && <TickCircle color={theme.PRIMARY_COLOR} variant="Bold" size={24} /> }
                            </View>
                        </View>
    
                        {ErrorMsg != '' ? <Text style={[styles.errorMsg,{paddingTop:0}]}>{ErrorMsg}</Text> : null}
                    </View>
                }
                {!isOtpMessageEnable ? 
                    <TouchableOpacity activeOpacity={1}
                        disabled={!isValidMobNumber}
                        style={[styles.loginButton, { backgroundColor: !isValidMobNumber ? theme.DISABLE_BACKGROUND_COLOR : theme.PRIMARY_COLOR ,marginTop: ErrorMsg != '' ? 20 : 40 }]}
                        onPress={() => GetOTP()}
                    >
                        <Text style={[styles.btnText, { color: theme.WHITE_COLOR }]}>Request OTP</Text>
                    </TouchableOpacity>
                    :
                    <View>
                        <OtpVerification PhoneNumber={phoneNumber} userEmail={userEmail}/>
                    </View>
                }
            </SafeAreaView >
        </KeyboardDismiss>
    );
};

export default Login;