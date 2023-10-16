import React from 'react';
import { StyleSheet, View,  TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import themeStyles from '../styles/theme.styles';
import constants from '../styles/constants';
const BottomModal = (props) => {
    const { showModal, setShowModal, animationInType, animationOutType, animationTiming, modalHeight = 0.5, bgColor = '#fff', autoFocus=true ,screen=''} = props;
    return (
        <Modal
        propagateSwipe
            // autoFocus={false}
            animationIn={animationInType}
            animationInTiming={animationTiming}
            animationOut={animationOutType}
            animationOutTiming={animationTiming}
            // animationType={animationType}
            hasBackdrop={false}
            backdropTransitionOutTiming={animationTiming}
            transparent={true}
            isVisible={showModal}
            onSwipeComplete={() => screen != "chat" && setShowModal(!showModal)}
            swipeDirection="down"
            style={styles.modalContainer}
            onRequestClose={() => setShowModal(!showModal)}
            onBackdropPress={() => setShowModal(!showModal)}>
            <TouchableOpacity activeOpacity={1} onPress={() => setShowModal(!showModal)} style={{ flex: 1 - modalHeight, backgroundColor: 'transparent' }} >
            </TouchableOpacity>
            <View style={[styles.viewContainer,{flex: modalHeight,}]} >
                <View style={[styles.innerViewContainer,{ paddingHorizontal: screen == 'chat' ? 0 :20,backgroundColor: bgColor, }]}>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer:{justifyContent: 'flex-end', margin: 0, left: 0, top: 0, right: 0,padding: 0,marginHorizontal: 0,backgroundColor:'rgba(255,255,255,.75)'},
    viewContainer :{  backgroundColor: '#fff', justifyContent: 'space-around', alignItems: 'center', borderTopEndRadius: 20, borderTopStartRadius: 20, marginTop: 'auto', elevation: 3, borderColor: themeStyles.CARD_BORDER_COLOR, borderWidth: 1, shadowColor: '#171717', margin: 0, left: 0,right: 0, padding: 0, marginHorizontal: 0,},
    innerViewContainer:{ flex: 1,  width: constants.screenWidth, borderTopEndRadius: 20, borderTopStartRadius: 20 }
});

export default BottomModal;