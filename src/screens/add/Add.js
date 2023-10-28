import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, View, SafeAreaView, Text, Modal,TextInput, TouchableOpacity } from 'react-native';
import styles from './AddStyle';
import MatrixList from './AddHooks';
import { useEffect } from 'react';
import axiosMatricInstance from '../../services/axiosMatricInstance';
import { api } from '../../services/endpoints';
import { Dropdown } from 'react-native-element-dropdown';

const Separator = () => <View style={styles.separator} />;
function getYearsList() {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 4;
  const yearsList = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearsList.push(year);
  }
  return yearsList;
}

const initialState = {
  metrix: null,
  year: null,
  month: null,
  quater: null,
  value: null,
  comment: null,
};

const initialErrorState = {
  metrix: null,
  year: null,
  value: null,
};

const Add = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addDataBody, setAddDataBody] = useState(initialState);
  const [addDataError, setAddDataError] = useState(initialErrorState);
  const [valueField, setValueField] = useState(null);


  const addDataChangeHandler = (name, value) => {
    const temp = { ...addDataBody };
    temp[name] = value;
    setAddDataBody(temp);
    const tempError = { ...addDataError };
    tempError[name] = null;
    setAddDataError(tempError);
  };

  const handleAddDataPress = () => {
    setIsModalVisible(true);
  };

  const { matrixList, fetchMatrixLists, getLastFiveYears } = MatrixList();

  const handleSaveData = () => {
    setAddDataError(initialErrorState);
    let setError = false;
    let errorIn = { ...initialErrorState };
    for (const key of Object.keys(errorIn)) {
      if (addDataBody[key] == null) {
        setError = true;
        errorIn[key] = `Value for ${key} cannot be empty`;
      }
    }

    if (setError) {
      setAddDataError(errorIn);
      return;
    }

    sendDataToAPI();
    setIsModalVisible(false);
    setAddDataBody(initialState);
  };

  const sendDataToAPI = async () => {
    try {
      const body = {
        company_metric_id: addDataBody.metrix.id,
        year: addDataBody.year,
        value: addDataBody.value,
        comment: addDataBody.comment,
      };

      if (addDataBody.metrix.periodicity_id === 1) {
        body.month = addDataBody.month;
      } else {
        body.financial_quarter = addDataBody.quater;
      }

      const response = await axiosMatricInstance.post(api.metricDetails.POST(), body);

      if (response.status === 201) {
        Alert.alert('Success', 'Data Saved Successfully', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      } else {
        // Alert.alert('Error saving data');
      }
    } catch (error) {
      // console.error('Error saving data:', error);
      // Alert.alert('Error saving data');
    }
  };

  useEffect(() => {
    fetchMatrixLists();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Button title="+ Add Data" color="#3A7953" onPress={handleAddDataPress} />
        </View>
        <Separator />

        <Modal animationType="slide" transparent={false} visible={isModalVisible}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add Data</Text>

              <Text style={styles.metricLabel}>Metric *</Text>

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={matrixList}
                search
                maxHeight={300}
                labelField="name" // Update this to match the field in your matrixList data
                valueField="id" // Update this to match the field in your matrixList data
                placeholder="Choose"
                searchPlaceholder="Search..."
                value={addDataBody.metrix} // Update to match the selected metric
                onValueChange={(itemValue) => addDataChangeHandler('metrix', itemValue)}
              />

              

<Text style={styles.metricLabel}>Year *</Text>

<Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  iconStyle={styles.iconStyle}
  data={getYearsList().map((yearValue) => ({
    id: yearValue.toString(), // Use a unique identifier for each year
    year: yearValue.toString(),
  }))}
  search
  maxHeight={300}
  labelField="year"
  valueField="id"
  placeholder="Choose"
  searchPlaceholder="Search..."
  value={addDataBody.year} // Update to match the selected year
  onValueChange={(itemValue) => addDataChangeHandler('year', itemValue)}
/>

<Text style={styles.metricLabel}>
  {addDataBody?.period_name || 'Period'}
</Text>

<Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  iconStyle={styles.iconStyle}
  data={addDataBody?.metrix?.period || []} // Use addDataBody?.metrix?.period as the data source
  search
  maxHeight={300}
  labelField="label" // Update this to match the field in your period data
  valueField="value" // Update this to match the field in your period data
  placeholder="Choose"
  searchPlaceholder="Search..."
  value={addDataBody[addDataBody?.metrix?.period_name]} // Update to match the selected period
  onValueChange={(itemValue) =>
    addDataChangeHandler(addDataBody?.metrix?.period_name, itemValue)
  }
/>
<Text style={[styles.metricLabel, styles.boxSize]}>Value *</Text>

<TextInput
  style={[styles.input, styles.boxSize]}
  onChangeText={(itemValue, itemIndex) =>
    addDataChangeHandler('value', itemValue)
  }
  value={addDataBody.value}
  keyboardType="numeric"

/>


<Text style={styles.metricLabel}>Comments</Text>

              <TextInput
                style={[styles.input, styles.boxWidth]}
                onChangeText={(itemValue, itemIndex) =>
                  addDataChangeHandler('comment', itemValue)
                }
                value={addDataBody.comment}
                keyboardType="ascii-capable"
                multiline={true}
              />

              <Text style={styles.noteText}>
                {' '}
                * Please use Comments to collaborate on the performance of this
                metric with other users viewing this metric
              </Text>


              <View style={stylesSheet.buttonContainer}>
                <TouchableOpacity
                  onPress={handleSaveData}
                  style={stylesSheet.button}
                ><Text style={stylesSheet.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAddDataBody(initialState);
                    setAddDataError(initialErrorState);
                    setIsModalVisible(false);
                  }}
                  style={stylesSheet.button}
                ><Text style={stylesSheet.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>




              {/* Rest of your form fields */}
              {/* ... */}
            </View>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};




const stylesSheet = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 16,
    marginRight: 0,
  },
  button: {
    backgroundColor: "#3a7953",
    borderRadius: 4,
    marginLeft: 8,
    width: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "600",
    paddingVertical: 8,
    textAlign: "center",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

export default Add;