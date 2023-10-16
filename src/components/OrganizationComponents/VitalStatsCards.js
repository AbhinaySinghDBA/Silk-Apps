import React,{useEffect, useState} from 'react';
import {View, Text, TouchableOpacity,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ReportStyles';

const VitalStatsCards = (props) => {
    const navigation = useNavigation();
    const {companyProfileData} = props;
    let macro_sector = []; let mSectorLength = !!companyProfileData.macro_sector_companies && companyProfileData.macro_sector_companies.length || 1;
    let sub_sector = []; let subSectorLength = !!companyProfileData.sub_sector_companies && companyProfileData.sub_sector_companies.length || 1;
    let keyWords_data = []; let keyWordLength = !!companyProfileData.company_keywords && companyProfileData.company_keywords.length || 0;

    const [macroSector, setMacroSector] = useState([]);
    const [subSector, setSubSector] = useState([]);
    const [compKeywords, setCompKeywords] = useState([]);
    useEffect(()=>{
        !!companyProfileData.macro_sector_companies && companyProfileData.macro_sector_companies.map((item,ind) =>{ macro_sector.push(item.name + (ind + 1 != mSectorLength ? ", " : "")) });
        !!companyProfileData.sub_sector_companies && companyProfileData.sub_sector_companies.map((item,ind) =>{sub_sector.push(item.name + (ind + 1 != subSectorLength ? ", " : "")) });
        !!companyProfileData.company_keywords && companyProfileData.company_keywords.map((item,ind) =>{ keyWords_data.push(item.name + (ind + 1 != keyWordLength ? ", " : "")) });
        setMacroSector(macro_sector);setSubSector(sub_sector);setCompKeywords(keyWords_data)
    },[companyProfileData])

    return (
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}  style={styles.vitalStatusTabContainer}>
            {/* Macro Sector */}
            {!!companyProfileData.macro_sector_companies && <View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Macro sector</Text>
                <Text style={styles.vitalStatusCardDesc}>{macroSector}</Text>
            </View>}
            {/* Sub Sector */}
            {!!companyProfileData.sub_sector_companies && <View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Sub Sector</Text>
                <Text style={styles.vitalStatusCardDesc}>{subSector}</Text>
            </View>}
            {/* Description of Business */}
            {!!companyProfileData.description_of_business && companyProfileData.description_of_business !="" &&<View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Description of Business</Text>
                <Text style={styles.vitalStatusCardDesc}>{companyProfileData.description_of_business}</Text>
            </View>}
            {/* Core Area */}
            {!!companyProfileData.core_area_name && <View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Core Area</Text>
                <Text style={styles.vitalStatusCardDesc}>{companyProfileData.core_area_name}</Text>
            </View>}
            {/* Funding Status */}
            {!!companyProfileData.funding_status_name && <View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Funding Status</Text>
                <Text style={styles.vitalStatusCardDesc}>{companyProfileData.funding_status_name}</Text>
            </View>}
            {/* Revenue Size */}
            {!!companyProfileData.revenue_size_name && <View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Revenue Size</Text>
                <Text style={styles.vitalStatusCardDesc}>{companyProfileData.revenue_size_name}</Text>
            </View>}
            {/* Employee Strength */}
            {!!companyProfileData.employee_strength_name && <View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Employee Strength</Text>
                <Text style={styles.vitalStatusCardDesc}>{companyProfileData.employee_strength_name}</Text>
            </View>}
            {/* Keywords */}
            {compKeywords != null && compKeywords != "" && <View style={styles.vitalStatusCardContainer}>
                <Text style={styles.vitalStatusCardHeader}>Keywords</Text>
                <Text style={styles.vitalStatusCardDesc}>{compKeywords}</Text>
            </View>}
        </ScrollView>
    );
};
export default VitalStatsCards;
  