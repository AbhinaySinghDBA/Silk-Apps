import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
// import { authBaseUrl, smsRetrieverUrl, dubbasBaseUrl, notificationBaseUrl, learnApiUrl ,payload} from '@env';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

const cardImages = {
  1: 'http://images.wiseant.co/Images/1.jpg',
  2: 'http://images.wiseant.co/Images/2.jpg',
  3: 'http://images.wiseant.co/Images/3.jpg',
  4: 'http://images.wiseant.co/Images/1.jpg',
  5: 'http://images.wiseant.co/Images/2.jpg',
  6: 'http://images.wiseant.co/Images/3.jpg',
  7: 'http://images.wiseant.co/Images/1.jpg',
  8: 'http://images.wiseant.co/Images/2.jpg',
  9: 'http://images.wiseant.co/Images/3.jpg',
}

// Staging
const BucketName = "https://silk-app-imagesdev.s3.ap-south-1.amazonaws.com/";
const authBaseUrl = "https://2tu1byrrqj.execute-api.ap-south-1.amazonaws.com";
const companyBaseUrl = "https://yj909zo6wc.execute-api.ap-south-1.amazonaws.com";
const metricBaseUrl = "https://b5xysepli0.execute-api.ap-south-1.amazonaws.com";

// Live
// const BucketName = "https://silk-app-images.s3.ap-south-1.amazonaws.com/";
// const authBaseUrl = "https://xoiy058s4l.execute-api.ap-south-1.amazonaws.com";
// const companyBaseUrl = "https://ji83brwosb.execute-api.ap-south-1.amazonaws.com";
// const metricBaseUrl = "https://9vr49f9007.execute-api.ap-south-1.amazonaws.com";


// export const AUTH_API_BASE_PATH = "http://localhost:5000/api/v1"
export const AUTH_API_BASE_PATH = authBaseUrl + "/dev/api/v1"
export const COMPANY_API_BASE_PATH = companyBaseUrl + "/dev/api/v1"
export const METRIC_API_BASE_PATH = metricBaseUrl + "/dev/api/v1"


const APIDatas = {
  getOTPUrl: `${authBaseUrl}/dev/api/v1/auth/send-otp-for-login`,
  verifyOTPUrl: `${authBaseUrl}/dev/api/v1/auth/login-with-otp`,
  getProfileDataUrl: `${authBaseUrl}/dev/api/v1/auth/verify-token`,

  // News & Updates
  getNewsUpdatesUrl: `${companyBaseUrl}/dev/api/v1/company/mobile/news`,
  // Files
  getFilesDataUrl: `${companyBaseUrl}/dev/api/v1/company/mobile/files`,

  // Company
  getCompaniesList: `${companyBaseUrl}/dev/api/v1/company/mobile/my-companies-list`,
  getCompaniesProfileDataUrl: `${companyBaseUrl}/dev/api/v1/company/mobile/companies`,

  // Reports
  getMetricsListUrl: `${metricBaseUrl}/dev/api/v1/metric/report/metric-list`,

  getMetricsDetailUrl: `${metricBaseUrl}/dev/api/v1/metric/report/metric-details`,

  //AddData
  postMetricsDetailUrl: `${metricBaseUrl}/dev/api/v1/metric/metric-details`,

  // Comments
  CommentsInfoUrl: `${metricBaseUrl}/dev/api/v1/metric/metric-detail-comments`,
}
//API
const Inrformatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const InrformatterWithDecimals = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const getCurrentMonthandYear = (dt) => {
  var txnDate = new Date(dt);
  return (monthList[txnDate.getMonth()] + ' ' + txnDate.getFullYear());
}
const getCurrentMonthYear = (dt) => {
  var txnDate = new Date(dt);
  return (monthList[txnDate.getMonth()] + ' ' + txnDate.getFullYear().toString().slice(-2));
}
const dateFormatter = (dt) => {
  var txnDate = new Date(dt);
  return (txnDate.getDate() + '-' + monthList[txnDate.getMonth()] + '-' + txnDate.getFullYear());
}
const currentYear = new Date().getFullYear();
const fetchDateText = (e) => {
  let dateValue = new Date(e);
  let today = new Date();
  let diffDays = parseInt((today - dateValue) / (1000 * 60 * 60 * 24));
  let diffHours = Math.abs(today - dateValue) / 36e5;
  let day = '';

  var hours = dateValue.getHours();
  var minutes = dateValue.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + '.' + minutes + '' + ampm;
  // console.log('Time', diffDays, today, dateValue, strTime, e, new Date(e));
  switch (true) {
    case diffDays <= 0:
      day = diffHours < 1 ? "Just now" : `Today${', ' + strTime}`;
      break;
    case diffDays == 1:
      day = `Yesterday${', ' + strTime}`;
      break;
    case (diffDays >= 2 && diffDays <= 6):
      day = `2 Days Ago${', ' + strTime}`;
      break;
    case (diffDays >= 7 && diffDays <= 30):
      day = `Weeks Ago${', ' + strTime}`;
      break;
    case (diffDays >= 31 && diffDays <= 180):
      day = `Months Ago${', ' + strTime}`;
      break;
    case (diffDays >= 365):
      day = "Year Ago";
      break;
    default:
      day = "Year Ago";
      break;
  }
  return day;
};

//Login Screen
const OTP_CELL_COUNT = 4;
const createPinInput = {
  CELL_COUNT: 4,
  CELL_SIZE: 35,
  CELL_BORDER_RADIUS: 5,
  DEFAULT_CELL_BG_COLOR: '#fff',
  NOT_EMPTY_CELL_BG_COLOR: '#803cfc',
  ACTIVE_CELL_BG_COLOR: '#f7fafe',
}
//Login Screen

const chartTypeJson = [
  {
    "id": 1,
    "title": "Line chart in same axis",
    "icon": require("../assets/Img/charts/lineChartInSameAxis.png")
  },
  {
    "id": 2,
    "title": "Line chart in dual axis",
    "icon": require("../assets/Img/charts/lineChartInDualAxis.png")
  },
  {
    "id": 3,
    "title": "Bar chart in same axis",
    "icon": require("../assets/Img/charts/barChartInSameAxis.png")
  },
  {
    "id": 4,
    "title": "Bar chart in dual axis",
    "icon": require("../assets/Img/charts/barChartInDualAxis.png")
  }
]
// const GraphImage = 'https://s3.ap-south-1.amazonaws.com/images.wiseant.co/Images/App/graphUpdate.JPG';
// const GraphImage1 = require("../assets/Img/graph4.jpeg");

const GraphImage = [require("../assets/Img/graphRef1.png"), require("../assets/Img/graphRef3.png")];
// format number to US dollar
let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// format number to British pounds
let Pounds = Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});
// format number to Indian rupee
let Rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

// format number to Euro
let Euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
});
let Japan = Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
});

const CurrencyFormat = (curr, value) => {

  let _currency = Intl.NumberFormat('en-US', {
    style: 'currency',
    // currency: curr || 'INR',
    Currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  // return _currency.format(value).replace(/^(\D+)/, '$1 ').replace(/\s+/, '');
  return value == 0 ? 0 : _currency.format(value).replace(/\s+/, '');
}
const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const quaterList = ["Jan - Mar", "Apr - Jun", "Jul - Sep", "Nov - Dec"];
const quaterListShort = ["J-M", "A-J", "J-S", "N-D"]
export default {
  BucketName,
  cardImages,
  Inrformatter, InrformatterWithDecimals,
  screenWidth,
  screenHeight,
  APIDatas,
  B,
  OTP_CELL_COUNT,
  createPinInput,
  getCurrentMonthandYear,
  getCurrentMonthYear,
  dateFormatter,
  chartTypeJson,
  fetchDateText,
  GraphImage,
  // Currency Format
  USDollar, Pounds, Rupee, Euro, Japan,
  monthList, quaterList, quaterListShort,
  CurrencyFormat,
  currentYear,
  AUTH_API_BASE_PATH
}

