import React, { useState } from 'react';
import { api } from '../../services/endpoints';
import { Picker } from '@react-native-picker/picker';
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import styles from './AddStyle';
import MatrixList from './AddHooks';
import MetricList from './MetricHooks';
import { useEffect } from 'react';
import axiosMatricInstance from '../../services/axiosMatricInstance';

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

function getYearsListB() {
  const currentYear = new Date().getFullYear();
  const yearsList = [];
  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
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

const metricState = {
  name: null,
  unit: null,
  currency: null,
  denomination: null,
  period: null,
  aggregatable: null,
  notes: null,
};


const metricErrorState = {
  name: null,
  unit: null,
  period: null,
};

const initialErrorState = {
  metrix: null,
  year: null,
  value: null,
};



const Add = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addDataBody, setAddDataBody] = useState(initialState);
  const [addMetricBody, setAddMetricBody] = useState(metricState);
  const [addDataError, setAddDataError] = useState(initialErrorState);
  const [addMetricError, setAddMetricError] = useState(metricErrorState);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const [isMetricModalVisible, setIsMetricModalVisible] = useState(false);

  const [addBudgetBody, setAddBudgetBody] = useState(initialState);
  const [addBudgetError, setAddBudgetError] = useState(initialErrorState);

  const addDataChangeHandler = (name, value) => {
    const temp = { ...addDataBody };
    setAddDataBody(temp);
    temp[name] = value;
    const tempError = { ...addDataError };
    setAddDataError(tempError);
    tempError[name] = null;
  };

  const addMetricChangeHandler = (name, value) => {
    const temp = { ...addMetricBody };
    setAddMetricBody(temp);
    temp[name] = value;
    const tempError = { ...addMetricError };
    setAddMetricError(tempError);
    tempError[name] = null;
  };

  const addBudgetChangeHandler = (name, value) => {
    const temp = { ...addBudgetBody };
    setAddBudgetBody(temp);
    temp[name] = value;
    const tempError = { ...addBudgetError };
    setAddBudgetError(tempError);
    tempError[name] = null;
  };

  const handleAddDataPress = () => {
    setIsModalVisible(true);
  };

  const handleAddBudgetPress = () => {
    setIsBudgetModalVisible(true);
  };

  const { matrixList, fetchMatrixLists, getLastFiveYears } = MatrixList();
  const {
    aggregatable,
    periodicity,
    denomination,
    currency,
    unit,
    metricList,
    fetchMetricLists,
  } = MetricList();

  const handleAddMetricPress = () => {
    setIsMetricModalVisible(true);
  };

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

      const response = await axiosMatricInstance.post(
        api.metricDetails.POST(),

        body,
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Data Saved Successfully', [
          {
            text: 'OK',
            onPress: () => { },
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

  const handleBudgetSaveData = () => {
    setAddBudgetError(initialErrorState);
    let setError = false;
    let errorIn = { ...initialErrorState };
    for (const key of Object.keys(errorIn)) {
      if (addBudgetBody[key] == null) {
        setError = true;
        errorIn[key] = `Value for ${key} cannot be empty`;
      }
    }

    if (setError) {
      setAddBudgetError(errorIn);
      return;
    }

    sendBudgetDataToAPI();
    setIsBudgetModalVisible(false);
    setAddBudgetBody(initialState);
  };

  const sendBudgetDataToAPI = async () => {
    try {
      const body = {
        company_metric_id: addBudgetBody.metrix.id,
        year: addBudgetBody.year,
        value: addBudgetBody.value,
        comment: addBudgetBody.comment,
      };

      if (addBudgetBody.metrix.periodicity_id === 1) {
        body.month = addBudgetBody.month;
      } else {
        body.financial_quarter = addBudgetBody.quater;
      }

      // debugger;

      const response = await axiosMatricInstance.post(
        api.metricBudget.POST(),

        body,
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Budget Data Saved Successfully', [
          {
            text: 'OK',
            onPress: () => { },
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

  const handleMetricSaveData = () => {
    setAddMetricError(metricErrorState);
    let setError = false;
    let errorIn = { ...metricErrorState };
    for (const key of Object.keys(errorIn)) {
      if (addMetricBody[key] == null) {
        setError = true;
        errorIn[key] = `Value for ${key} cannot be empty`;
      }
    }

    if (setError) {
      setAddMetricError(errorIn);

      return;
    }

    sendMetricDataToAPI();
    setIsMetricModalVisible(false);
    setAddMetricBody(metricState);
  };

  const sendMetricDataToAPI = async () => {
    try {
      const body = {
        name: addMetricBody.name,
        unit_id: addMetricBody.unit,
        currency_id: addMetricBody.currency,
        denomination_id: addMetricBody.denomination,
        periodicity_id: addMetricBody.period,
        aggregatable: addMetricBody.aggregatable,
        notes: addMetricBody.notes,
        visibility_of_metrics: [],
      };

      // if (addMetricBody.metrix.periodicity_id === 1) {
      //   body.month = addMetricBody.month;
      // }
      // if (addMetricBody.metrix.periodicity_id === 2) {
      //   body.financial_quarter = addMetricBody.quater;
      // } else {
      //   body.year = addMetricBody.year;
      // }

      //debugger;
      const response = await axiosMatricInstance.post(
        api.companyMetric.POST(),

        body,
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Metric Data Saved Successfully', [
          {
            text: 'OK',
            onPress: () => { },
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

  useEffect(() => {
    fetchMetricLists();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Button
            title="+ Add Data"
            color="#3A7953"
            onPress={handleAddDataPress}
          />
        </View>
        <Separator />
        <View>
          <Button
            title="+ Add Budget"
            color="#3A7953"
            onPress={handleAddBudgetPress}
          />
        </View>
        <Separator />

        <View>
          <Button
            title="+ Add Metric"
            color="#3A7953"
            onPress={handleAddMetricPress}
          />
           <Separator />


        </View>


        {/* <Separator /> */}

        <View>
          <View style={styles.fixToText} />
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <Text></Text>

              <Text style={styles.modalTitle}>Add Data</Text>

              <Text style={styles.metricLabel}>Metric *</Text>

              <View style={styles.chooseBorder}>
                <Picker
                  selectedValue={addDataBody.metrix}
                  onValueChange={(itemValue, itemIndex) =>
                    addDataChangeHandler('metrix', itemValue)
                  }
                  style={styles.picker}>
                  <Picker.Item label="Choose" value="Choose" />

                  {matrixList.map(matrix => (
                    <Picker.Item
                      key={matrix.id}
                      label={matrix.name}
                      value={matrix}
                    />
                  ))}
                </Picker>
              </View>

              {addDataError?.metrix != null ? (
                <Text style={{ color: 'red' }}>{addDataError?.metrix}</Text>
              ) : (
                <></>
              )}

              <Text style={styles.metricLabel}>Year *</Text>

              <View style={styles.chooseBorder}>
                <Picker
                  selectedValue={addDataBody.year}
                  onValueChange={itemValue =>
                    addDataChangeHandler('year', itemValue)
                  }

                //style={styles.picker}
                >
                  <Picker.Item label="Choose" value="Choose" />

                  {getYearsList().map(yearValue => (
                    <Picker.Item
                      key={yearValue}
                      label={yearValue.toString()}
                      value={yearValue.toString()}
                    />
                  ))}
                </Picker>
              </View>

              {addDataError?.year != null ? (
                <Text style={{ color: 'red' }}>{addDataError?.year}</Text>
              ) : (
                <></>
              )}

              <Text style={styles.metricLabel}>
                {addDataBody?.period_name || 'Period'}
              </Text>

              <View style={styles.chooseBorder}>
                <Picker
                  selectedValue={addDataBody[addDataBody?.metrix?.period_name]}
                  onValueChange={itemValue =>
                    addDataChangeHandler(
                      addDataBody?.metrix?.period_name,

                      itemValue,
                    )
                  }

                //style={styles.picker}
                >
                  <Picker.Item label="Choose" value="Choose" />

                  {addDataBody?.metrix?.period?.map(per => (
                    <Picker.Item
                      key={`period__${per.value}`}
                      label={per.label}
                      value={per.value}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={[styles.metricLabel, styles.boxSize]}>Value *</Text>

              <TextInput
                style={[styles.input, styles.boxSize]}
                onChangeText={(itemValue, itemIndex) =>
                  addDataChangeHandler('value', itemValue)
                }
                value={addDataBody.value}
                keyboardType="numeric"
              />

              {addDataError?.value != null ? (
                <Text style={{ color: 'red' }}>{addDataError?.value}</Text>
              ) : (
                <></>
              )}

              <Text style={styles.metricLabel}>Comments</Text>

              <TextInput
                style={[styles.input, styles.boxWidth]}
                onChangeText={(itemValue, itemIndex) =>
                  addDataChangeHandler('comment', itemValue)
                }
                value={addDataBody.comment}
                keyboardType="characters"
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

            </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isBudgetModalVisible}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <Text></Text>

              <Text style={styles.modalTitle}>Add Budget</Text>

              <Text style={styles.metricLabel}>Metric *</Text>

              <View style={styles.chooseBorder}>
                <Picker
                  selectedValue={addBudgetBody.metrix}
                  onValueChange={(itemValue, itemIndex) =>
                    addBudgetChangeHandler('metrix', itemValue)
                  }
                  style={styles.picker}>
                  <Picker.Item label="Choose" value="Choose" />

                  {matrixList.map(matrix => (
                    <Picker.Item
                      key={matrix.id}
                      label={matrix.name}
                      value={matrix}
                    />
                  ))}
                </Picker>
              </View>

              {addBudgetError?.metrix != null ? (
                <Text style={{ color: 'red' }}>{addBudgetError?.metrix}</Text>
              ) : (
                <></>
              )}

              <Text style={styles.metricLabel}>Year *</Text>

              <View style={styles.chooseBorder}>
                <Picker
                  selectedValue={addBudgetBody.year}
                  onValueChange={itemValue =>
                    addBudgetChangeHandler('year', itemValue)
                  }

                //style={styles.picker}
                >
                  <Picker.Item label="Choose" value="Choose" />

                  {getYearsListB().map(yearValue => (
                    <Picker.Item
                      key={yearValue}
                      label={yearValue.toString()}
                      value={yearValue.toString()}
                    />
                  ))}
                </Picker>
              </View>

              {addBudgetError?.year != null ? (
                <Text style={{ color: 'red' }}>{addBudgetError?.year}</Text>
              ) : (
                <></>
              )}

              <Text style={styles.metricLabel}>
                {addBudgetBody?.period_name || 'Period'}
              </Text>

              <View style={styles.chooseBorder}>
                <Picker
                  selectedValue={addBudgetBody[addBudgetBody?.metrix?.period_name]}
                  onValueChange={itemValue =>
                    addBudgetChangeHandler(
                      addBudgetBody?.metrix?.period_name,

                      itemValue,
                    )
                  }

                //style={styles.picker}
                >
                  <Picker.Item label="Choose" value="Choose" />

                  {addBudgetBody?.metrix?.period?.map(per => (
                    <Picker.Item
                      key={`period__${per.value}`}
                      label={per.label}
                      value={per.value}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={styles.metricLabel}>Value *</Text>

              <TextInput
                style={[styles.input, styles.boxSize]}
                onChangeText={(itemValue, itemIndex) =>
                  addBudgetChangeHandler('value', itemValue)
                }
                value={addDataBody.value}
                keyboardType="numeric"
              />

              {addBudgetError?.value != null ? (
                <Text style={{ color: 'red' }}>{addBudgetError?.value}</Text>
              ) : (
                <></>
              )}

              <View style={stylesSheet.buttonContainer}>
                <TouchableOpacity
                  onPress={handleBudgetSaveData}
                  style={stylesSheet.button}
                ><Text style={stylesSheet.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAddBudgetBody(initialState);
                    setAddBudgetError(initialErrorState);
                    setIsBudgetModalVisible(false);
                  }}
                  style={stylesSheet.button}
                ><Text style={stylesSheet.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isMetricModalVisible}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <Text></Text>
              <Text style={styles.modalTitle}>Add Metric</Text>
              <Text style={styles.metricLabel}>Metric Name *</Text>
              <View>
                <TextInput
                  style={[styles.input, styles.boxSize]}
                  onChangeText={(itemValue, itemIndex) =>
                    addMetricChangeHandler('name', itemValue)
                  }
                  value={addMetricBody.name}
                  keyboardType="characters"
                />

                {addMetricError?.name != null ? (
                  <Text style={{ color: 'red' }}>{addMetricError?.name}</Text>
                ) : (
                  <></>
                )}

                <Text style={styles.metricLabel}>Unit *</Text>
                <View style={styles.chooseBorder}>
                  <Picker
                    selectedValue={addMetricBody.unit}
                    onValueChange={(itemValue, itemIndex) => {
                      addMetricChangeHandler('unit', itemValue);
                    }}>
                    <Picker.Item label="Choose" value="Choose" />

                    {unit?.map(unitValue => (
                      <Picker.Item
                        key={`unit__${unitValue.value}`}
                        label={unitValue.label}
                        value={unitValue.value}
                      />
                    ))}
                  </Picker>
                </View>

                {addMetricError?.unit != null ? (
                  <Text style={{ color: 'red' }}>{addMetricError?.unit}</Text>
                ) : (
                  <></>
                )}



                {addMetricBody.unit == 1 && (
                  <View>
                    <Text style={styles.metricLabel}>Currency</Text>

                    <View style={styles.chooseBorder}>
                      <Picker
                        selectedValue={addMetricBody.currency}
                        onValueChange={(itemValue, itemIndex) => {
                          addMetricChangeHandler('currency', itemValue);
                        }}>
                        <Picker.Item label="Choose" value="Choose" />

                        {currency?.map(cur => (
                          <Picker.Item
                            key={`currency__${cur.value}`}
                            label={cur.label}
                            value={cur.value}
                          />
                        ))}
                      </Picker>
                    </View>

                    <Text style={styles.metricLabel}>Denomination</Text>

                    <View style={styles.chooseBorder}>
                      <Picker
                        selectedValue={addMetricBody.denomination}
                        onValueChange={(itemValue, itemIndex) => {
                          addMetricChangeHandler('denomination', itemValue);
                        }}>
                        <Picker.Item label="Choose" value="Choose" />

                        {denomination?.map(den => (
                          <Picker.Item
                            key={`denomination__${den.value}`}
                            label={den.label}
                            value={den.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                )}

                {addMetricBody.unit == 3 && (
                  <View>
                    <Text style={styles.metricLabel}>Denomination</Text>

                    <View style={styles.chooseBorder}>
                      <Picker
                        selectedValue={addMetricBody.denomination}
                        onValueChange={(itemValue, itemIndex) => {
                          addMetricChangeHandler('denomination', itemValue);
                        }}>
                        <Picker.Item label="Choose" value="Choose" />

                        {denomination?.map(den => (
                          <Picker.Item
                            key={`denomination__${den.value}`}
                            label={den.label}
                            value={den.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                )}
                <Text style={styles.metricLabel}>Periodicity *</Text>
                <View style={styles.chooseBorder}>
                  <Picker
                    selectedValue={addMetricBody.period}
                    onValueChange={(itemValue, itemIndex) =>
                      addMetricChangeHandler('period', itemValue)
                    }

                  // style={styles.picker}
                  >
                    <Picker.Item label="Choose" value="Choose" />

                    {periodicity?.map(p => (
                      <Picker.Item
                        key={`period__${p.value}`}
                        label={p.label}
                        value={p.value}
                      />
                    ))}
                  </Picker>
                </View>
                {addMetricError?.period != null ? (
                  <Text style={{ color: 'red' }}>{addMetricError?.period}</Text>
                ) : (
                  <></>
                )}

                <Text style={styles.metricLabel}>Aggregatable</Text>

                <View style={styles.chooseBorder}>
                  <Picker
                    selectedValue={addMetricBody.aggregatable}
                    onValueChange={(itemValue, itemIndex) =>
                      addMetricChangeHandler('aggregatable', itemValue)
                    }>
                    <Picker.Item label="Choose" value="Choose" />
                    {aggregatable?.map(agg => (
                      <Picker.Item
                        key={`aggregatable__${agg.value}`}
                        label={agg.label}
                        value={agg.value}
                      />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.metricLabel}>
                  Notes (A brief note on how this metric is calculated /
                  measured)
                </Text>

                <TextInput
                  style={[styles.input, styles.boxSize]}
                  onChangeText={(itemValue, itemIndex) =>
                    addMetricChangeHandler('notes', itemValue)
                  }
                  value={addMetricBody.notes}
                  keyboardType="characters"
                />

                <View style={stylesSheet.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleMetricSaveData}
                    style={stylesSheet.button}
                  ><Text style={stylesSheet.buttonText}>SUBMIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>{
                      setAddMetricBody(metricState);
                      setAddMetricError(metricErrorState);
                      setIsMetricModalVisible(false);
                    }}
                    style={stylesSheet.button}
                  ><Text style={stylesSheet.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
})

export default Add;
