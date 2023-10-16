import React,{useContext,useReducer} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ReportStyles';
import constants from '../../styles/constants';
import { AuthContext } from '../../routes/Router';

import { actionCreators, reducer, initialState } from '../GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RenderCompanyCard = (props) => {
    const navigation = useNavigation();
    const { signIn } = useContext(AuthContext);
    const {item, index , dataLength,user_id, screen='', userData = null} = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    let logo = constants.BucketName + item.company_path;
    let macro_sector = []; let mSectorLength = item.macro_sector.length || 1;
    !!item.macro_sector && item.macro_sector.map((item,ind) =>{ macro_sector.push(item.name + (ind + 1 != mSectorLength ? ", " : "")) });

    const Login = (id) =>{
        const _data = [{...userData,"company_id":id}];
        dispatch(actionCreators.UserDetails(_data[0]));
        AsyncStorage.setItem('UserPhoneNumber', userData.contact_number.toString())
        AsyncStorage.removeItem("userVerifiedDetails");
        AsyncStorage.setItem('userVerifiedDetails', JSON.stringify(_data[0]));
        signIn()
    }
    return (
        <TouchableOpacity activeOpacity={1} style={[styles.renderCompanyCardContainer,{paddingTop: index == 0 ? 0 : 20, marginBottom : ((index +1) == dataLength) ? 60 : 0}]}
            onPress={() => ( 
                screen == '' && navigation.navigate('ReportList', {"user_id": user_id, "company_id": item.id, "name":item.name}),
                screen == 'Organisation' && navigation.navigate('CompanyProfile', {"user_id": user_id, "company_id": item.id, "name":item.name,"logo": item.company_path, "desc": item.description}),
                screen == 'Login' && Login(item.id)
            )}
        >
            <View style={[styles.companyCardImageContainer,{backgroundColor:'#f5f5f5'}]}>
                <Image source={{uri: logo }} style={styles.companyCardImage} resizeMode='cover' />
            </View>
            <View style={[styles.companyCardRightSecContainer ,{justifyContent : item.description == "" ? "center" :'space-between'}]}>
                <Text style={styles.companyCardTypeData}>{macro_sector}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.companyCardCompanyName}>{item.name}</Text>
                {item.description != "" && <Text ellipsizeMode='tail' numberOfLines={1} style={styles.companyCardDescription}>{item.description != "" ? item.description : "Your Life's Work, Powered By Our..."}</Text>}
            </View>
        </TouchableOpacity>
    );
};
export default RenderCompanyCard;
  