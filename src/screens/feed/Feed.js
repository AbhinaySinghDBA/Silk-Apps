import React, { useState, useEffect, useLayoutEffect, useContext} from 'react';
import {View, LogBox, FlatList,StatusBar} from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeStyles from '../../styles/theme.styles';

import RenderFeedUpdateCard from '../../components/FeedComponents/RenderFeedUpdateCard';
import constants from '../../styles/constants';
import axios from 'axios';
import { AuthContext } from '../../routes/Router';
import RenderEmptyData from '../../components/RenderEmptyData';
import LottieView from 'lottie-react-native';
import styles from '../../styles/FeedStyles';
const Feed = ({ route }) => {
    const [isLoading, setIsLoading] = useState(false);
    // const {userData} = useContext(userDataContext);
    const isFocused = useIsFocused();
   
    const [userData, setUserData] = useState([]);

    const [newsUpdateData , setNewsUpdateData] = useState([]);

    //Start Extra Data + Pagination
    const [onEndReachedCalledDuringMomentum , setOnEndReachedCalledDuringMomentum] = useState(true);
    const [pageCount , setPageCount] = useState(1);
    const [lastLoadCount  , setLastLoadCount ] = useState(0);

    const { signOut } = useContext(AuthContext);
    const loadMoreData = () => {
      !onEndReachedCalledDuringMomentum && pageCount <= lastLoadCount &&
      (
        setPageCount(pageCount + 1),
        getNewsUpdatesData(userData.access_token, userData.company_id),
        setOnEndReachedCalledDuringMomentum(true)
      )
    }

    const removeUserData = () => {
      AsyncStorage.removeItem("userVerifiedDetails");
      signOut()
    }
    // Show your spinner
    renderLoaderFooter = () => {
      return (
        (onEndReachedCalledDuringMomentum && pageCount < lastLoadCount) ?
          <View style={styles.footerLoaderContainer}>
            <LottieView source={require('../../assets/Img/SilkLoader.json')} autoPlay loop style={styles.footerLoader} />
          </View> : null
      )
    }
    //End Extra Data + Pagination
    useLayoutEffect(()=>{
      async function getUserData() {
        let jsonValue = await AsyncStorage.getItem('userVerifiedDetails');
        if (jsonValue != null) { 
          jsonValue = JSON.parse(jsonValue);
          setUserData(jsonValue);
          getNewsUpdatesData(jsonValue.access_token, jsonValue.company_id);
        }
      }
      getUserData();
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

      return () => {
        setPageCount(1), setLastLoadCount(0),setNewsUpdateData([]);setIsLoading(false);
      }
    }, [isFocused])

    const getNewsUpdatesData = (token,c_id) =>{
      const headers = { 'Authorization': `Token ${token}` }; // auth header with bearer token
      // const headers = { 'Authorization': `Token token` };
      // console.log('h',headers,`${constants.APIDatas.getNewsUpdatesUrl}?&page=${pageCount}&limit=${10}`)
      const _cId = userData.company_id || c_id || null;
      axios.get(`${constants.APIDatas.getNewsUpdatesUrl}?&page=${pageCount}&limit=${10}&company_id=${_cId}`, { headers })
        .then(function (response) {
          setLastLoadCount(response.data.data.item.total_pages);
          setNewsUpdateData(response.data.data.items);
          pageCount == 1 ? setNewsUpdateData(response.data.data.items) : setNewsUpdateData([...newsUpdateData, ...response.data.data.items]);
          setTimeout(() => { setIsLoading(true); }, 500);
        })
        .catch(function (error) {
          error.response.data.message == "Unauthorized!" && removeUserData();
          setTimeout(() => { setIsLoading(true); }, 500);
          setNewsUpdateData([]);
          console.log('err',error.response.data.message);
        });
    };

    const renderFeedsCard = ({ item, index }) => {
      return (
        <RenderFeedUpdateCard item={item} index={index} dataLength={newsUpdateData.length} user_id={userData.id} user_name={userData.first_name}/>
      );
    };
    const renderEmptyComponent = () => {
      return (
        <RenderEmptyData desc={'No Feeds Available'} />
      );
    };
    return (
        !isLoading ?
            <View style={styles.screenLoaderContainer}>
                <LottieView source={require('../../assets/Img/SilkLoader.json')} autoPlay loop style={styles.screenLoader} />
            </View>
            :
            <View style={styles.screenContainer}>
              <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE_COLOR} />
                <FlatList
                    keyboardShouldPersistTaps='always'
                    style={{ }}
                    data={newsUpdateData}
                    extraData={newsUpdateData}
                    renderItem={renderFeedsCard}
                    keyExtractor={item => (item.id)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderLoaderFooter}
                    onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
                    ListEmptyComponent = {renderEmptyComponent}
                />
            </View>
    );
};

Feed.title = 'Updates';
export default Feed;
