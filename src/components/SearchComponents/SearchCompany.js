import React,{useState, useEffect} from 'react';
import { View,  TouchableOpacity,Text ,TextInput, Image} from 'react-native';
import themeStyles from '../../styles/theme.styles';
import styles from '../../styles/commonStyles'
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchCompany = (props) => {
    const { title = '', searchedKey, setSearchedKey = null, placeholderText = '', screen = "", yearValue = "23", setYearValue = null } = props;
    const [searchEnabled, setSearchEnabled] = useState(false);
    useEffect(() => {
        return () => { setSearchEnabled(false); }
    }, [])
    return (
        <>
            {
                !searchEnabled &&
                <View style={styles.titleContainer}>
                    {title != '' && <Text style={styles.title}>{title}</Text>}
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => (setSearchedKey(''), setSearchEnabled(true))}
                    >
                        <Image source={require('../../assets/Img/Search_active.png')} style={[styles.searchIcon,{ marginRight: title != "" ? 0 : 20 }]} />
                    </TouchableOpacity>
                </View>
            }
            {
                searchEnabled &&
                <View style={title != "" ? styles.searchInputContainer : styles.searchInputHeaderContainer}>
                    <TextInput
                        value={searchedKey}
                        onChangeText={setSearchedKey}
                        autoFocus={true}
                        placeholder={placeholderText}
                        placeholderTextColor={themeStyles.SECONDARY_TEXT_COLOR}
                        style={[styles.searchInput,{backgroundColor: title != "" ? 'transparent' : themeStyles.WHITE_COLOR,}]}
                        selectionColor={themeStyles.PRIMARY_COLOR}
                        activeOutlineColor='transparent'
                        activeUnderlineColor='transparent'
                        underlineColor='transparent'
                        theme={{ colors:styles.searchInputTheme }}
                        mode='flat'
                        onBlur={() => (setSearchedKey(searchedKey), setSearchEnabled(false))}
                    />
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => (setSearchedKey(searchedKey), setSearchEnabled(false))}
                        style={styles.searchInputSearchIconContainer}
                    >
                        <Image source={require('../../assets/Img/Search_active.png')} style={styles.searchInputSearchIcon} />
                    </TouchableOpacity>
                </View>
            }
        </>

    );
}

export default SearchCompany;