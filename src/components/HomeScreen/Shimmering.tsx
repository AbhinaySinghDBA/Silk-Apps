import React, { PureComponent } from 'react';
import {
    Animated,
    Dimensions,
    StyleProp,
    View,
    ViewStyle,
    StyleSheet,
    LayoutChangeEvent,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

interface IProps {
    colors?: Array<string>;
    gradientStyle?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle> & { width: number; height: number };
}
interface IState {
    viewWidth: number;
}

const GREY = 'transparent';
const shimmeringAnimatedValue = new Animated.Value(0);
const ShimmringAnimation = Animated.loop(
    Animated.timing(shimmeringAnimatedValue, {
        useNativeDriver: false,
        delay: 3000,
        duration: 500,
        toValue: 1,
    }),
);
export default class Shimmering extends PureComponent<IProps, IState> {
    private readonly animation: Animated.CompositeAnimation;
    private gradientColors = [GREY, '#fff', GREY];

    constructor(props: Readonly<IProps>) {
        super(props);

        this.state = {
            viewWidth: -1,
        };

        this.animation = ShimmringAnimation;
    }

    startAnimation() {
        this.animation.start();
    }

    render() {
        const { colors, gradientStyle, wrapperStyle } = this.props;
        const width = Dimensions.get('screen').width;
        const loadingStyle = { backgroundColor: GREY };
        const left = this._getLeftValue();
        // console.log(JSON.stringify(this.props.children))
        return (
            <View
                style={{
                    width: wrapperStyle?.width ?? width,
                    height: wrapperStyle?.height ?? 80,
                }}>
                <View
                    style={[styles.container, loadingStyle, wrapperStyle]}
                    onLayout={event => this._onLayoutChange(event)}>
                    <Animated.View
                        style={[
                            {
                                flex: 1,
                                left,
                                // width:20
                            },
                            gradientStyle,
                        ]}>
                        <LinearGradient
                            colors={colors || this.gradientColors}
                            start={{ x: 0.3, y: 0.2 }}
                            end={{ x: 0.8, y: 0.4 }}
                            style={{ flex: 1,opacity:0.5 }}
                        />
                        
                    </Animated.View>
                    
                </View>
                {this.props.children}
            </View>
        );
    }

    private _onLayoutChange(event: LayoutChangeEvent) {
        this.setState({
            viewWidth: event.nativeEvent.layout.width,
        });

        this.startAnimation();
    }

    private _getLeftValue() {
        const { viewWidth } = this.state;
        return shimmeringAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-viewWidth, viewWidth],
        });
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        // width:10
    },
});