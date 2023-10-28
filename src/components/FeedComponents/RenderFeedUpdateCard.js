import React,{useState} from 'react';
import {View, Text, TouchableOpacity,Image,Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Link21} from 'iconsax-react-native';
import Share from 'react-native-share';

import styles from "../../styles/FeedStyles";
import constants from '../../styles/constants';
import themeStyles from '../../styles/theme.styles';

const RenderFeedUpdateCard = (props) => {
    const navigation = useNavigation();
    const {item, index ,user_id,user_name} = props;
    let logo = constants.BucketName + item.company_logo_path;
    const [isTruncatedText, setIsTruncatedText] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const ShareFile = async (content , companyName , externalLink ) => {
        const shareOptions = {
            title: 'News - Silkapp',
            message:`"${user_name}" has shared an update about "${companyName}". \n${content} \nShared via Silkapp.ai`,
            url: externalLink,
          };
          try {
            const ShareResponse = await Share.open(shareOptions);
            // console.log('shareResponse', ShareResponse)
          } catch (error) {
            console.log('sharePdfBase64 Error =>', error);
          }
      };
    return (
      <TouchableOpacity activeOpacity={1} style={styles.feedCardContainer} 
        onLongPress={() => ShareFile(item.content, item.company_name, item.external_url)}
      >
        <View style={styles.companySecContainer}>
            <View style={styles.companyLeftSecContainer}>
                <View style={styles.companyLeftSecLogoContainer}>
                    <Image source={{uri: logo }} style={styles.companyLeftSecLogo} resizeMode='cover' />
                </View>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.companyLeftSecCompanyName}>{item.company_name}</Text>
                <Text style={styles.companyLeftSecDuration}> {'\u2022'} {constants.fetchDateText(item.created_at.substring(0, item.created_at.lastIndexOf('.')))}</Text>
            </View>
            <TouchableOpacity activeOpacity={1} style={styles.shareIconContainer}
                onPress={() => ShareFile(item.content, item.company_name, item.external_url)}
            >
                <Image source={require("../../assets/Img/share.png")} style={styles.shareIcon} resizeMode='contain' />
            </TouchableOpacity>
        </View>
        {isTruncatedText ?
            <>
                <Text ellipsizeMode='tail' numberOfLines={showMore ? 3 : 0} style={styles.feedContentGeneral} onPress={() => (setShowMore(!showMore))} >{item.content}</Text>
                <Text style={styles.readMoreText} onPress={() => (setShowMore(!showMore))}>{showMore ? 'Read More' : 'Less'}</Text>
            </>
            :
            <Text ellipsizeMode='tail' numberOfLines={0} style={styles.feedContentGeneral} onTextLayout={(event) => {
                const { lines } = event.nativeEvent
                setIsTruncatedText(lines?.length > 3)
              }}>{item.content}</Text>
        }
        {
            item.external_url != null && item.external_url != "" && 
            <TouchableOpacity activeOpacity={1} 
                onPress={()=> Linking.openURL(item.external_url)}
                style={styles.urlContainer}
            >
                <Link21 color={themeStyles.LINK_TEXT_COLOR} variant="Outline" size={24} />
                <Text style={styles.urlDesc}>{item.external_url}</Text>
            </TouchableOpacity>
        }
        {
            item.news_type == "metric_update" && 
            <TouchableOpacity activeOpacity={1}
                onPress={() => ( 
                    navigation.navigate('ReportList', {"user_id": user_id, "company_id": item.company_id, "name":item.company_name})
                )}
                style={styles.updateCardContainer}
            >
                <View style={styles.updateCardImageContainer}>
                    <Image source={constants.GraphImage[index % 2 == 0 ? 0 :1]} style={styles.updateCardImage} resizeMode='stretch' />
                </View>
                <Text style={styles.updateCardViewMetricsText}>View Metrics</Text>
            </TouchableOpacity>
        }
      </TouchableOpacity>
    );
};
export default RenderFeedUpdateCard;
  