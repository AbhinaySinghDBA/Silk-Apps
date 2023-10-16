import React,{useState,useEffect} from 'react';
import {View, Text, TouchableOpacity,Image,Linking,PermissionsAndroid,Platform,ToastAndroid,NativeModules} from 'react-native';

import { useNavigation} from '@react-navigation/native';
import {Eye,ArrowDown,Share} from 'iconsax-react-native';
import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/FilesStyles';
import constants from '../../styles/constants';


import RNFS from 'react-native-fs';
const RNFetchBlob = NativeModules.RNFetchBlob;

import Notifications from '../../utils/Notifications';
import Share1 from 'react-native-share'; 

const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };
const FileCard = (props) => {
    const navigation = useNavigation();
    const {item, index,selectedId, setSelectedId=null} = props;
    const [showDownloadWindow, setShowDownloadWindow] = useState(false);
    let icon = item.file_extension != 'pdf' ? require('../../assets/Img/excelFile.png') : require('../../assets/Img/pdfFileIcon.png');
    let fileLink = constants.BucketName + item.file_path;
    let iconSize = 20;
    useEffect(()=>{
        setShowDownloadWindow(false)
        return (
            setShowDownloadWindow(false)
        )
    },[])
    

    const downloadFile = async (fileName,fileURL) => { 
        setShowDownloadWindow(false)
        // Linking.openURL(fileURL)

        // const shareOptions = {
        //     backgroundImage: 'https://s3.ap-south-1.amazonaws.com/images.wiseant.co/Images/App/graphUpdate.JPG',
        //     url:fileURL,
        //     // stickerImage: 'data:image/png;base64,<imageInBase64>', //or you can use "data:" link
        //     backgroundBottomColor: '#fefefe',
        //     backgroundTopColor: '#906df4',
        //     // attributionURL: 'http://deep-link-to-app', //in beta
        //     social: Share.Social.WHATSAPP
        // };
        
        // Share.shareSingle(shareOptions);
        
        
        // const shareOptions = {
        //     title: 'Shared on Whatsapp',
        //     message:'test share',
        //     social: Share.Social.WHATSAPP,
        //     failOnCancel: false,
        // };
        // try {
        //     const ShareResponse = await Share.open(shareOptions);
        //     console.log('shareResponse', ShareResponse)
        //   } catch (error) {
        //     console.log('Error =>', error);
        //   }

        // const shareOptions = {
        //     title: 'Share PDF File',
        //     url: fileURL,
        //   };
      
        //   try {
        //     const ShareResponse = await Share.open(shareOptions);
        //     console.log('shareResponse', ShareResponse)
        //   } catch (error) {
        //     console.log('sharePdfBase64 Error =>', error);
        //   }
        // console.log('fileName', fileName, fileURL)
        if (await isPermitted()){
            const directory = Platform.OS =='ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
            const filePath = `${directory}/${fileName}`;
            // console.log('fileUrl', fileURL, filePath)
            RNFS.downloadFile({
                fromUrl: fileURL,
                toFile: filePath,
            }).promise.then((res) => {
                Platform.OS == 'android' &&
                (ToastAndroid.showWithGravityAndOffset(
                    `File saved in your Download Folder location - ${directory}`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    100
                )
                // ,
                // RNFetchBlob.android.addCompleteDownload({
                //     title: `${fileName}`,
                //     description: 'file downloaded successfully',
                //     mime: 'application/pdf',
                //     path: filePath,
                //     showNotification: true,
                //     notification: true
                // })
                );
               
                // Notifications.schduleNotification(`File saved in this location - ${directory}`,'icon',new Date(Date.now() + 1 * 100));
                // let destinationPath = RNFS.DownloadDirectoryPath;
                // let destinationFile = `${destinationPath}/${fileName}`;
                // RNFS.copyFile(filePath, destinationFile)
                //     .then(result => {
                //         console.log('result', result);
                //         // Alert.alert('Success', `PDF saved in your Download Folder location - ${destinationPath}`);
                //         ToastAndroid.showWithGravityAndOffset(
                //             `PDF saved in your Download Folder location - ${destinationPath}`,
                //             ToastAndroid.LONG,
                //             ToastAndroid.BOTTOM,
                //             25,
                //             100
                //         );
                //         RNFetchBlob.android.addCompleteDownload({
                //             title: `${FileName}`,
                //             description: 'Invoice downloaded successfully',
                //             mime: 'application/pdf',
                //             path: destinationFile,
                //             showNotification: true,
                //             notification: true
                //         })
                //         // File deletion
                //         return RNFS.unlink(file.filePath)
                //             .then(() => {
                //                 console.log('FILE DELETED');
                //             })
                //             // `unlink` will throw an error, if the item to unlink does not exist
                //             .catch((err) => {
                //                 console.log(!!err.message && err.message);
                //             });
                //     })
                //     .catch(err => {
                //         console.log('err', err);
                //     });
                console.log('res',res);
            });
            // Linking.openURL(item.link),
            setShowDownloadWindow(false)
        }
          
        
    };
    const viewPdfFile = (fileUrl) =>{
        navigation.navigate('ViewPdf',{"link":fileLink})
        ,setShowDownloadWindow(false)
        // Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
    };

    const ShareFile = async (name, fileUrl) => {
        // try {
        //   const result = await Share.share({
        //     message:
        //       'Silkapp | share' + fileUrl,
        //   });
        //   if (result.action === Share.sharedAction) {
        //     if (result.activityType) {
        //         console.log('shared', result.activityType)
        //       // shared with activity type of result.activityType
        //     } else {
        //         console.log('check shared',result.action, Share.sharedAction)
        //       // shared
        //     }
        //   } else if (result.action === Share.dismissedAction) {
        //     console.log('check dismissed',result.action, Share.dismissedAction)
        //     // dismissed
        //   }
        // } catch (error) {
        //   Alert.alert(error.message);
        // }
        setShowDownloadWindow(false)
        const shareOptions = {
            title: 'Share File - Silkapp',
            message:'File -' + name,
            url: fileUrl,
          };
      
          try {
            const ShareResponse = await Share1.open(shareOptions);
            console.log('shareResponse', ShareResponse)
          } catch (error) {
            console.log('sharePdfBase64 Error =>', error);
          }
      };
    return (
        <TouchableOpacity activeOpacity={1} style={styles.filesCardContainer}
            onPress={() => (  setShowDownloadWindow(true),setSelectedId(item.id))}
             key ={item.id + index}
        >
            <View style={styles.iconContainer}>
                <Image source={icon} style={styles.filesIcon} />
            </View>
            <View style={styles.titleContainer}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.fileName}>{item.name}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.updatedBy}>{item.user_first_name} <Text style={styles.updatedTime}>{'\u2022'} {constants.fetchDateText(item.created_at)}</Text></Text>
            </View>
            <View style={styles.optionIconContainer}>
                <Image source={require('../../assets/Img/more.png')} style={styles.optionsIcon} />
            </View>
            {showDownloadWindow && selectedId == item.id && <View style={[styles.optionsDetailContainer,{ top:item.file_extension != 'pdf'? 3:3}]}>
                {
                item.file_extension == 'pdf' && 
                    <TouchableOpacity activeOpacity={1} style={styles.viewOptionContainer}
                        onPress={()=>(
                            viewPdfFile(fileLink)
                        )}
                    >
                        <Eye color={themeStyles.PRIMARY_COLOR} variant="Outline" size={iconSize} />
                        <Text style={styles.viewOptionText}>View</Text>
                    </TouchableOpacity>
                }
                {
                item.file_extension != 'pdf' && 
                    <TouchableOpacity activeOpacity={1} style={styles.shareOptionContainer}
                        onPress={()=>(
                            ShareFile(item.name,fileLink)
                        )}
                    >
                        <Image source={require("../../assets/Img/share.png")} style={styles.shareOptionIcon} resizeMode='contain' />
                        <Text style={styles.shareOptionText}>Share</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity activeOpacity={1} style={styles.downloadOptionContainer}
                onPress={()=>downloadFile((item.name).replace(/\s/g, "-")+"."+item.file_extension,fileLink)}
                >
                    <View style={styles.downloadOptionIconContainer}>
                        <ArrowDown color={themeStyles.PRIMARY_COLOR} variant="Outline" size={iconSize-8} />
                    </View>
                    <Text style={styles.downloadOptionText}>Download</Text>
                </TouchableOpacity>
            </View>}
        </TouchableOpacity>
    );
};

export default FileCard;