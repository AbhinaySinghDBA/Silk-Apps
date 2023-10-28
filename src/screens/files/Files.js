import React, { useState, useEffect, useLayoutEffect, useContext} from 'react';
import {View,LogBox, ActivityIndicator,FlatList,TouchableOpacity,StatusBar,Image} from 'react-native';
import {useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import FileCard from '../../components/FIleComponents/FileCard';
import SearchEmptyResult from '../../components/SearchComponents/SearchEmptyResult';
import FileSearch from '../../components/SearchComponents/FileSearch';
import RenderEmptyData from '../../components/RenderEmptyData';
import { Logout } from '../../components/Logout';

import { userDataContext } from '../Dashboard';

import constants from '../../styles/constants';
import styles from '../../styles/FilesStyles';
import themeStyles from '../../styles/theme.styles';

const Files = ({ route,navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const {userData} = useContext(userDataContext);
    const isFocused = useIsFocused();
    const [selectedId, setSelectedId] = useState(0)

    const [filesListData, setFilesListData] = useState([]);
    const [filesListResponseData, setFilesListResponseData] = useState([]);
    const [searchedKey, setSearchedKey] = useState('');
    const [searchResultsEmpty, setSearchResultsEmpty] = useState(false);

    const [searchEnabled, setSearchEnabled] = useState(false);
    const {removeUserData} = Logout();
    useLayoutEffect(()=>{
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        getFileListDetails();
        return () => { setSearchResultsEmpty(false);setSelectedId(0);setSearchedKey(""); }
    }, [isFocused])

    const getFileListDetails = () =>{
      const headers = { 'Authorization': `Token ${userData.access_token}` }; // auth header with bearer token
      const _cId = userData.company_id || null;
      axios.get(constants.APIDatas.getFilesDataUrl+`?company_id=${_cId}`, { headers })
        .then(function (response) {
          let _response = response.data.data.items;
          if(userData.user_type_id == 3){
            let filteredResponse = _response.filter(x => x.company_id == userData.company_id)
            setFilesListData(filteredResponse);
            setFilesListResponseData(filteredResponse);
          }
          else{
            setFilesListData(_response);
            setFilesListResponseData(_response);
          }
          // setFilesListData(response.data.data.items);
          // setFilesListResponseData(response.data.data.items);
          setTimeout(() => { setIsLoading(true); }, 300);
        })
        .catch(function (error) {
          error.response.data.message == "Unauthorized!" && removeUserData();
          console.log(error.response.data);
        });
    }
    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <>
          <TouchableOpacity onPress={() => (setSearchEnabled(true))} activeOpacity={1} style={styles.searchContainer}>
            <Image source={require('../../assets/Img/Search_active.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          {searchEnabled && <FileSearch searchedKey={searchedKey} setSearchedKey={setSearchedKey} setSearchEnabled={setSearchEnabled} />}
          </>
        ),
      });
    }, [navigation,searchEnabled, setSearchEnabled,setSearchedKey,searchedKey]);

    const renderFilesCard = ({ item, index }) => {
        return (
            <FileCard item={item} index={index} selectedId={selectedId} setSelectedId={setSelectedId}/>
        );
    };

    useEffect(()=>{
      let filteredData = [];
      searchedKey !="" && (
        filteredData = (filesListResponseData).filter(x => x.name.toLowerCase().includes(searchedKey.toLowerCase())),
        setFilesListData(filteredData),
        filteredData.length == 0 && setSearchResultsEmpty(true)
        // console.log('reportListResponseData.reports',reportListResponseData.reports)
      );
      searchedKey == "" && filesListResponseData.length > 0 && (setFilesListData(filesListResponseData),setSearchResultsEmpty(false));
    },[searchedKey]);

    const renderEmptyComponent = () => {
      return (
        <RenderEmptyData desc={'No Data Available'} />
      );
    };
    return (
        !isLoading ?
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={themeStyles.ACTIVITY_INDICATOR_COLOR} />
            </View>
            :
            <View nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
              <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE_COLOR} />
              { searchResultsEmpty && <SearchEmptyResult title={searchedKey}/> }
              <FlatList
                keyboardShouldPersistTaps='always'
                style={styles.filesContainer}
                data={filesListData}
                extraData={filesListData}
                renderItem={renderFilesCard}
                keyExtractor={item => (item.id)}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent = {renderEmptyComponent}
              />
            </View>
    );
};
Files.title = 'Files';
export default Files;
