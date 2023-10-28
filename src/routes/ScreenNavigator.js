import React from 'react';
import { TouchableOpacity, View, Text, Platform, Image } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import { useNavigation, useIsFocused, NavigationContainer } from '@react-navigation/native';
import { LampCharge,AddSquare, Activity, Folder2, Data, FlashCircle, UserOctagon, ArrowLeft, SearchNormal1 } from 'iconsax-react-native';

import Feed from '../screens/feed/Feed';
import Reports from '../screens/reports/Reports';
import Organization from '../screens/organization/Organization';
import Profile from '../screens/profile/Profile';
import Add from '../screens/add/Add';
import Files from '../screens/files/Files';

import ReportList from '../screens/reports/ReportList';
import ReportDetails from '../screens/reports/ReportDetails';

import CompanyProfile from '../screens/organization/CompanyProfile';
import CustomReportsList from '../screens/customReports/CustomReportsList';

import ViewPdf from '../components/FIleComponents/ViewPdf';
import theme from '../styles/theme.styles';
import themeStyles from '../styles/theme.styles';
import CustomReportDetails from '../screens/customReports/CustomReportDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const options = { headerShown: false }

const HomeTabs = () => {
  const bottomTabIconSize = Platform.OS == 'ios' ? 20 : 24;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.WHITE_COLOR,
        tabBarInactiveTintColor: '#DCE7E0',
        tabBarActiveBackgroundColor: theme.PRIMARY_COLOR,
        tabBarInactiveBackgroundColor: theme.PRIMARY_COLOR,
        tabBarHideOnKeyboard: true,
        backgroundColor: 'red',
        headerShown: true,
        headerTitleAlign: 'left',
        headerStyle: {

          borderBottomColor: '#e2eae5',
          borderBottomWidth: 1,
          // marginTop:-60
          ...Platform.select({
            ios: {
              height: 62,
            },
            android: {
              height: 62,
            },
          })
        },
        headerTitleStyle: {
          fontSize: 20,
          // paddingVertical:18,
          fontWeight: "600",
          paddingLeft: 5,
          color: theme.PRIMARY_TEXT_COLOR,
          textAlign: 'left'
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          // minHeight: 70,
          // height:70,
          // marginVertical:10,
          inactiveTintColor: '#969696',
          justifyContent: 'center',
          // marginBottom:11
          ...Platform.select({
            ios: {
              minHeight: 60,
              height: 60,
              //marginVertical: 10,
              // backgroundColor: 'red',
            },
            android: {
              minHeight: 70,
              height: 70,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          ...Platform.select({
            ios: {
              // backgroundColor: 'red',
              // marginBottom: 5
              marginTop: 5,
              marginBottom: 5,
              lineHeight: 12
            },
            android: {
              marginTop: 5,
              marginBottom: 12,
              lineHeight: 12
            },
          }),
        },
        tabBarIconStyle: {
          ...Platform.select({
            ios: {
              marginTop: Platform.isPad ? 0 : 10,
              marginBottom: Platform.isPad ? 3 : 4,
              marginRight: Platform.isPad ? -5 : 0
            },
            android: {
              marginTop: 10,
              marginBottom: 0
            },
          }),

        },
        // tabBarButton: [
        //   "Notification",
        // ].includes(route.name) ? () => { return null; } : undefined,
      })}
    // tabBar={props => <BottomTabBar {...props} state={{ ...props.state, routes: props.state.routes.slice(0, 4) }}></BottomTabBar>}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate(route.name);
          },
        })}
        options={{
          ...options,
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size, focused }) => (
            <LampCharge color={color} variant={color == "#fff" ? "Bold" : "Outline"} size={bottomTabIconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault(),
              navigation.navigate('Reports', { screen: 'Home' })
          }
        })
        }
        options={{
          tabBarLabel: 'Data',
          tabBarIcon: ({ color, size }) => (
            <Activity color={color} variant={color == "#fff" ? "Bold" : "Outline"} size={bottomTabIconSize} />
          ),
          ...options,
        }}
      />
      <Tab.Screen
        name="Files"
        component={Files}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault(),
              navigation.navigate('Files', { screen: 'Reports' })
          }
        })
        }
        options={{
          ...options,
          tabBarLabel: 'Files',
          tabBarIcon: ({ color, size }) => (
            <Folder2 color={color} variant={color == "#fff" ? "Bold" : "Outline"} size={bottomTabIconSize} />
          ),
          headerRight: ({ color, size }) => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              {/* <SearchNormal1 color={themeStyles.PRIMARY_COLOR} variant="Outline" size={24} style={{alignSelf:'center',marginRight:20}}/> */}
              <Image source={require('../assets/Img/Search_active.png')} style={{ width: 24, height: 24, resizeMode: 'contain', alignSelf: 'center', marginRight: 20 }} />
            </View>
          ),
        }}
      />
            <Tab.Screen
              name="Add"
              component={Add}
                options={{
                tabBarLabel: 'Add',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <AddSquare color={color} variant={color == "#fff" ? "Bold" : "Outline"} size={bottomTabIconSize} />
                ),
              }}
            />

      <Tab.Screen
        name="Organization"
        component={Organization}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault(),
              navigation.navigate('Organization', { screen: 'Organization' })
          },
        })}
        // component={Test}
        options={{
          ...options,
          tabBarLabel: 'Org',
          tabBarIcon: ({ color, size }) => (
            <FlashCircle color={color} variant={color == "#fff" ? "Bold" : "Outline"} size={bottomTabIconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="CustomReports"
        component={CustomReportsList}
        options={{
          tabBarLabel: 'Reports',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Data color={color} variant={color == "#fff" ? "Bold" : "Outline"} size={bottomTabIconSize} />
          ),
        }}
      />


      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // console.log(navigation);
            navigation.navigate(route.name);
          },
        })}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <UserOctagon color={color} variant={color == "#fff" ? "Bold" : "Outline"} size={bottomTabIconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
export default ScreenNavigator;


function ScreenNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'left',
        headerStyle: {
          height: 62,
          borderBottomColor: '#e2eae5',
          borderBottomWidth: 1
        },
        headerTitleStyle: {
          fontSize: 20,
          paddingVertical: 18,
          fontWeight: "600",
          paddingLeft: 5,
          color: theme.PRIMARY_TEXT_COLOR,
          textAlign: 'left'
        },
        headerTitleContainerStyle: {
          left: 0, // THIS RIGHT HERE
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="CustomReportDetails"
        component={CustomReportDetails}
        options={({ route }) => ({
          headerTitle: route?.params?.title || "CustomReportDetails",
          orientation: 'all'
        })}
      />
      <Stack.Screen name="ReportList" component={ReportList}
        options={({ route }) => ({
          title: route.params.name + ' Data',
          headerLeft: () => Platform.OS == 'ios' &&
            <TouchableOpacity onPress={() => navigation.goBack(null)} style={{}}>
              <Image source={require('../assets/Img/arrow-left.png')} color={'#000'} variant="Outline" size={22} style={{ marginRight: 10, marginTop: 2 }} />
            </TouchableOpacity>,
          // headerRight: () => <View/>,
          headerTitle: props => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: theme.PRIMARY_TEXT_COLOR, maxWidth: '75%' }} numberOfLines={1} ellipsizeMode='tail'>
                {props.children}
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen name="ReportDetails" component={ReportDetails}
        options={({ route }) => ({
          title: route.params.name + ' Data',
          headerLeft: () => Platform.OS == 'ios' &&
            <TouchableOpacity onPress={() => navigation.goBack(null)} style={{}}>
              <Image source={require('../assets/Img/arrow-left.png')} color={'#000'} variant="Outline" size={22} style={{ marginRight: 10, marginTop: 2 }} />
            </TouchableOpacity>,
          // headerRight: () => <View/>,
          headerTitle: props => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: theme.PRIMARY_TEXT_COLOR, maxWidth: '75%' }} numberOfLines={1} ellipsizeMode='tail'>
                {props.children}
              </Text>
            </View>
          ),
          orientation: 'all'
        })}
      />
      <Stack.Screen name="CompanyProfile" component={CompanyProfile}
        options={({ route }) => ({
          title: 'View Profile',
          headerLeft: () => Platform.OS == 'ios' &&
            <TouchableOpacity onPress={() => navigation.goBack(null)} style={{}}>
              <Image source={require('../assets/Img/arrow-left.png')} color={'#000'} variant="Outline" size={22} style={{ marginRight: 10, marginTop: 2 }} />
            </TouchableOpacity>,
          // headerRight: () => <View/>,
          headerTitle: props => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: theme.PRIMARY_TEXT_COLOR, maxWidth: '75%' }} numberOfLines={1} ellipsizeMode='tail'>
                {props.children}
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen name="ViewPdf" component={ViewPdf}
        options={({ route }) => ({
          title: 'View Files',
          headerLeft: () => Platform.OS == 'ios' &&
            <TouchableOpacity onPress={() => navigation.goBack(null)} style={{}}>
              <Image source={require('../assets/Img/arrow-left.png')} color={'#000'} variant="Outline" size={22} style={{ marginRight: 10, marginTop: 2 }} />
            </TouchableOpacity>,
          // headerRight: () => <View/>,
          headerTitle: props => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: theme.PRIMARY_TEXT_COLOR, maxWidth: '75%' }} numberOfLines={1} ellipsizeMode='tail'>
                {props.children}
              </Text>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
