import AsyncStorage from '@react-native-async-storage/async-storage';

const types = {
    User: 'UserDetails',
    Dubba: 'DubbaDetails',
    UserActive: 'UserActive',
    CancelBiometric: 'CancelBiometric'
}

// export const actionCreators = {
//   add: (title) => ({ type: types.ADD, payload: createItem(title) }),
//   remove: (id) => ({ type: types.REMOVE, payload: id }),
// }

const SetStoreData = async (value) => {
    try {
        // await AsyncStorage.removeItem('userVerifiedDetails');
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('userVerifiedDetails', jsonValue)

    } catch (e) {
        console.log("SetStoreData: error");
    }
}

const SetCancelBiometricStatus = async (value) => {
    try {
        await AsyncStorage.setItem('BiometricStatus', value)
    } catch (e) {
        console.log("StoreBiometricStatus: error");
    }
}

export const GetUserDataFromStorage = async () => {
    try {
        let jsonValue = await AsyncStorage.getItem('userVerifiedDetails')
        let biometricStatus = await AsyncStorage.getItem('BiometricStatus');
        if (jsonValue != null) {
            jsonValue = JSON.parse(jsonValue);
            jsonValue = biometricStatus != null ? { ...jsonValue, "cancelBioState": biometricStatus } : jsonValue;
        }
        return jsonValue;
    } catch (e) {
        return null;
        // error reading value
    }
}

export const actionCreators = {
    UserDetails: (data) => ({ type: types.User, payload: data }),
    DubbaDetails: (data) => ({ type: types.Dubba, payload: data }),
    UserActiveStatus: (data) => ({ type: types.UserActive, payload: data }),
    CancelBiometricStatus: (data) => ({ type: types.CancelBiometric, payload: data })
}

export const initialState = {
    UserDetails: [],
    UserActiveStatus: true,
    BiometricVerifyStatus: false
}


export function reducer(state, action) {
    switch (action.type) {
        case types.User:
            SetStoreData(action.payload);
            [...state.UserDetails = []]
            return { ...state, UserDetails: [...state.UserDetails, action.payload] }
        case types.Dubba:
            [...state.DubbaDetails = []]
            return { ...state, DubbaDetails: [...state.DubbaDetails, action.payload] }
        case types.UserActive:
            action.payload.cancelBiometricPop ? SetCancelBiometricStatus("false") : SetCancelBiometricStatus("true");
            if (!action.payload.userActive) {
                return { ...state, UserActiveStatus: action.payload.userActive, BiometricVerifyStatus: true }
            }
            return { ...state, UserActiveStatus: action.payload.userActive, BiometricVerifyStatus: false }
        // case types.CancelBiometric:
        //   action.payload == false ? SetCancelBiometricStatus("false") : SetCancelBiometricStatus("true");
        //   return { ...state, UserActiveStatus: action.payload, BiometricVerifyStatus: false } 
    }
}

export function StoreData() {
    const data = localStorage.getItem("UserDetails")
    // console.log(data);
}