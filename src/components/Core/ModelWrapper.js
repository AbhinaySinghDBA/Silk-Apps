import React from 'react'
import { Modal, StyleSheet, Text, Pressable, View, Button } from 'react-native';

const ModelWrapper = ({ isVisible, setIsVisible, title, actionBtn, children }) => {

    return (
        <View style={styles?.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}>
                <View style={styles?.centeredView}>
                    <View style={styles?.modalView}>
                        <Text>{title}</Text>
                        {children}
                        {actionBtn.map((btn, index) => <Button
                            title={btn.title}
                            key={`action_btn__${index}__${btn.title}`}
                            onPress={btn.onPress}
                        />)}

                    </View>
                </View>
            </Modal>

        </View >
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModelWrapper