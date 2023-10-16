import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../styles/theme.styles';
import constants from '../../styles/constants';
const KeyboardDismiss = ({ children }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <LinearGradient
                start={{ x: 0.0, y: 0.20 }} end={{ x: 0, y: 1.0 }}
                locations={[0,0.4]}
                colors={[theme.GRADIENT_START_COLOR, theme.GRADIENT_END_COLOR]}
                style={{ flex: 1, width: constants.screenWidth, height: constants.screenHeight }}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"always"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {children}
                    </TouchableWithoutFeedback>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
});

export default KeyboardDismiss;