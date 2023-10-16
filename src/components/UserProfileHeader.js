import React, {useState, useLayoutEffect} from "react";
import { Image,View, TouchableOpacity } from "react-native";
import { useNavigation,  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function UserProfileHeader(props) {
    const [userData , setUserData] = useState([]);
    const navigation = useNavigation();
    useLayoutEffect(() => {
        async function getUserData() {
            let jsonValue = await AsyncStorage.getItem('userVerifiedDetails')
            if (jsonValue != null) {
                jsonValue = JSON.parse(jsonValue);
                setUserData(jsonValue);
            }
        }
        getUserData();
    }, [])  
    return (
        <View style={{ marginHorizontal: 15, marginVertical: 10, flexDirection: "row", justifyContent: "space-between", alignContent: "center", }}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity activeOpacity={1}
                    onPress={() => ( navigation.navigate('Home'))}
                >
                    <Image source={require('../assets/Img/silkApp-logo.png')} style={{ width: 120, height: 50, borderRadius: 10 ,marginRight:10}} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </View>
    );
};