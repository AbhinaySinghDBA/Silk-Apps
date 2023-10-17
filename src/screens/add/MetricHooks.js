import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/endpoints';
import axiosMatricInstance from '../../services/axiosMatricInstance';



function getLastFiveYears() {
  let currentYear = new Date().getFullYear();
  currentYear += 3;
  const lastFiveYears = [];

  for (let i = 0; i < 6; i++) {
    let year = currentYear - i;
    lastFiveYears.push({ value: year, label: year });
  }

  return lastFiveYears;
}


const aggregatable = [
  { value: 0, label: 'No' },
  { value: 1, label: 'Yes' },
  
];

const unit = [
    { value: 1, label: 'Amount' },
    { value: 2, label: 'Percentage' },
    { value: 3, label: 'Nos' },
  ];

const currency = [
  { value: 1, label: 'INR' },
  { value: 2, label: 'USD' },
  { value: 3, label: 'EUR' },
  { value: 4, label: 'GBP' },
  { value: 5, label: 'AUD' },
  { value: 6, label: 'SGD' },
  { value: 7, label: 'HKD' },
  { value: 8, label: 'JPY' },
];


const denomination = [
    { value: 1, label: 'Ones' },
    { value: 2, label: 'Crores' },
    { value: 3, label: 'Millions' },
    { value: 4, label: 'Lakhs' },
    { value: 5, label: 'Billions' },
];

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },

];

const QUARTERS = [
  { value: 1, label: 'January - March' },
  { value: 2, label: 'April - June' },
  { value: 3, label: 'July - September' },
  { value: 4, label: 'October - December' },
];

const periodicity = [
   { value: 1, label: 'Month' },
   { value: 2, label: 'Quarter' },
   { value: 3, label: 'Year' },
  
];



// const periodicity = {
//   1: { name: 'month', value: MONTHS },
//   2: { name: 'quater', value: QUARTERS },
//   3: { name: 'year', value: getLastFiveYears() },
// };

// const MatrixList = () => {
    const MetricList = () => {

//   const [matrixList, setMatrixList] = useState([]);
  const [metricList, setMetricList] = useState([]);

  const fetchMetricLists = async () => {
    try {
      const user = await AsyncStorage.getItem('userVerifiedDetails');
      let userData = JSON.parse(user);

      const {
        data: {
          data: { items = [] },
        },
      } = await axiosMatricInstance.get(api.metricList.GET(userData.company_id));

      let filteredItem = items.map((item) => {
        let temp = {}
        temp.name = item.name
        temp.id = item.id
        // temp.period_name = periodicity[item.periodicity_id].name;
        temp.period = periodicity[item.periodicity_id].value;
        temp.aggregatable = aggregatable[item.aggregatable]
        temp.periodicity_id = item.periodicity_id
        temp.unit_id = unit[item.unit_id]
        temp.currency_id = currency[item.currency_id]
        temp.denomination_id = denomination[item.denomination_id]
        return temp;
      });
      setMetricList(filteredItem);

    } catch (error) {

      console.log(error);

    }

  };

  return ({aggregatable,periodicity,denomination,currency,unit, metricList, fetchMetricLists})
};




export default MetricList;
