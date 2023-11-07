import { Text, View, TouchableOpacity, Image,StatusBar } from 'react-native';
import React, { useState, useLayoutEffect,useContext } from 'react';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Call, Sms, Logout} from 'iconsax-react-native';

import styles from '../../styles/UserProfileStyles';
import { userDataContext } from '../Dashboard';
import { version } from '../../../package.json'
import { AuthContext } from '../../routes/Router';
import themeStyles from '../../styles/theme.styles';
import constants from '../../styles/constants';

const FocusAwareStatusBar = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
}

const Profile = ({ route }) => {
    const { signOut } = React.useContext(AuthContext);
    const [userProfileData, setUserProfileData] = useState([]);
    const {userData} = useContext(userDataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [userProfilePic, setUserProfilePic] =useState('https://placeholder.pics/svg/100');
    
    useLayoutEffect(() => {
        getUserData();
    }, [])

    async function getUserData() {
        let phonenumber = await AsyncStorage.getItem('UserPhoneNumber')
        if (phonenumber != null) {
            setPhoneNumber(phonenumber)
        }
        const headers = { 'Authorization': `Token ${userData.access_token}` }; // auth header with bearer token
        axios.get(constants.APIDatas.getProfileDataUrl, { headers })
            .then(function (response) {
                // console.log('AXIOS',JSON.stringify(response.data.data.item), userData);
                setUserProfileData(response.data.data.item);
                setUserProfilePic(response.data.data.item.user_profile_image != null ? (constants.BucketName + response.data.data.item.user_profile_image.path ) :'https://placeholder.pics/svg/100' );
                setIsLoading(true)
            })
            .catch(function (error) {
                setIsLoading(false)
                console.log('profile',error.response.data);
            });
    }
    const removeUserData = () => {
        AsyncStorage.removeItem("userVerifiedDetails");
        signOut()
    }
//     // let userProfileImage = constants.BucketName + userProfileData.user_profile_image.path;
    return (
        !isLoading ?
            <View style={styles.screenLoaderContainer}>
                <LottieView source={require('../../assets/Img/SilkLoader.json')} autoPlay loop style={styles.screenLoader} />
            </View>
            :
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor={themeStyles.PRIMARY_COLOR} />
                        <View style={styles.profileHeaderContainer}>
                <Text style={styles.proileHeaderText}>My profile</Text>
            </View>
            <View style={[styles.investorDataContainer,styles.shadowProp]}>
            <Image source={{uri: userProfilePic }} style={styles.investorLogo} resizeMode='cover' />
            <View style={styles.investorDetailsContainer}>
            <Text style={styles.investorTitle}>{userProfileData.first_name}</Text>
            <Text style={styles.investorDesc}>{userData.company_type_id == 1 ? "investor" :"company" }</Text></View></View>
            <View style={styles.cardsOverAllContainer}>
                <View style={styles.cardsContainer}>
                <Call color={themeStyles.LINK_TEXT_COLOR} variant="Outline" size={24} />
                <Text style={styles.cardText}>+91 {userData.contact_number}</Text>
                </View>
                <View style={styles.cardsContainer}>
                <Sms color={themeStyles.LINK_TEXT_COLOR} variant="Outline" size={24} />
                <Text style={styles.cardText}>{userProfileData.email}</Text>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => removeUserData()} style={[styles.cardsContainer,{borderBottomWidth:0}]}>
                <Image source={require('../../assets/Img/logout.png')} variant="Outline" size={24}/>
                <Text style={[styles.cardText]}>Logout</Text>
                </TouchableOpacity>
            </View>
            {version.includes('S') && <Text style={{position:'absolute',bottom:10,alignSelf:'center'}}>Version : {version}</Text>}
        </SafeAreaView>
    );
};

export default Profile;