import { Animated, StyleSheet} from 'react-native';
import React, { useState ,useEffect} from 'react';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';

import Constants from '../components/constants';
// import theme from '../styles/theme.styles';
import styles from '../styles/LoginStyles';
const { Value, Text: AnimatedText } = Animated;
const animationsColor = [...new Array(Constants.createPinInput.CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(Constants.createPinInput.CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};
export default function CodePinInput(props) {
    const { value, setValue, autofocusValue, indexValue} = props;
    // const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: Constants.createPinInput.CELL_COUNT });
    const [props1, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    // useEffect(()={
    //    props.setValue() 
    // },[])
    const renderCell = ({ index, symbol, isFocused }) => {

        // console.log(index + indexValue)
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [Constants.createPinInput.NOT_EMPTY_CELL_BG_COLOR, Constants.createPinInput.ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [Constants.createPinInput.DEFAULT_CELL_BG_COLOR, Constants.createPinInput.ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index ].interpolate({
                inputRange: [0, 1],
                outputRange: [Constants.createPinInput.CELL_SIZE, Constants.createPinInput.CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index + indexValue}
                style={[styles.codeFieldRootCell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    return (
            <CodeField
                ref={ref}
                key={autofocusValue ? '' : 0}
                {...props1}
                value={value}
                onChangeText={setValue}
            cellCount={Constants.createPinInput.CELL_COUNT}
                rootStyle={styles.codeFieldRootStyle}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
                autoFocus={true}
                secureTextEntry
            />
    );
};
