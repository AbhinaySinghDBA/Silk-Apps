import React, { useState, useEffect, useLayoutEffect, useContext, useCallback } from 'react';
import { View, LogBox, Text, ActivityIndicator, FlatList, StatusBar, Button, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import themeStyles from '../../styles/theme.styles';
import styles from './customReportStyle';
import UseCustomReportsHooks from './useCustomReportsHooks';



const CustomReportsList = ({ navigation }) => {

    const { isRefreshing, isLoading, isError, reportsPresets, fetchReportPresets, refreshFetchReportPresets } = UseCustomReportsHooks()

    useEffect(() => {
        fetchReportPresets()
    }, [])

    return (
        isLoading ?
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={themeStyles.ACTIVITY_INDICATOR_COLOR} />
            </View> :
            <>
                <SafeAreaView>
                    {isError ? (
                        <Text>Something Went Wrong!</Text>
                    ) : (
                        <ScrollView refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={refreshFetchReportPresets} />
                        }>

                            {reportsPresets.map((item) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('CustomReportDetails', {
                                            report: item,
                                            title: item.name,
                                        })}
                                        key={item.id}
                                    >
                                        <View style={styles.container}>
                                            <Text style={styles.heading}>{item.name}</Text>
                                            <View style={styles.matricsContainer}>
                                                {item?.matrix.length ? (
                                                    item?.matrix.map((m) => {
                                                        return (
                                                            <Text key={m.id} style={styles.matrics}>{m.name}</Text>
                                                        );
                                                    })
                                                ) : (
                                                    <Text>Matrix not found</Text>
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                );
                            })}
                        </ScrollView>
                    )}
                </SafeAreaView>
            </>)
}

export default CustomReportsList