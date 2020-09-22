import React from 'react';
import { Animated, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import { CommonStyles, DescriptionProps, Nullable } from '../types';
import sharedStyles from '../SharedStyles';

import Description from './Description';
import ValidationDot from './ValidationDot';

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: 30,
    },
    innerContainer: {
        flex: 1,
    },
    labelContainer: {
        justifyContent: 'center',
    },
    validationDot: {
        paddingRight: 10,
    },
});

interface Styles extends CommonStyles {
    inputContainerStyle?: StyleProp<ViewStyle>;
    colors?: {
        valid?: string;
        error?: string;
    };
}

interface Props extends Styles {
    children: React.ReactNode;
    descriptionProps?: DescriptionProps;
    label: string;
    isValid?: Nullable<boolean>;
    isExpanded: boolean;
    onPress?: () => void;
    onEndAnimation?: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    minFontSize?: number;
    maxFontSize?: number;
}

function TextFieldAnimation(props: Props) {
    const { children, descriptionProps, label, isValid, isExpanded, onPress, onEndAnimation } = props;

    const animationValue = React.useRef(new Animated.Value(isExpanded ? 1 : 0));

    React.useEffect(() => {
        Animated.timing(animationValue.current, {
            toValue: isExpanded ? 1 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start(onEndAnimation);
    }, [isExpanded, onEndAnimation]);

    const minFontSize = props.minFontSize || 11;
    const maxFontSize = props.maxFontSize || 13;

    return (
        <TouchableWithoutFeedback onPress={onPress} disabled={!onPress}>
            <View style={[sharedStyles.container, props.containerStyle]}>
                <Description {...descriptionProps} />
                <View style={[styles.inputContainer, props.inputContainerStyle]}>
                    {props.leftIcon}

                    <View style={styles.innerContainer}>
                        <Animated.View
                            style={[
                                styles.labelContainer,
                                {
                                    height: animationValue.current.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['100%', '45%'],
                                    }),
                                },
                            ]}
                        >
                            <Animated.Text
                                numberOfLines={1}
                                style={[
                                    sharedStyles.labelText,
                                    props.labelStyle,
                                    {
                                        fontSize: animationValue.current.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [maxFontSize, minFontSize],
                                        }),
                                    },
                                ]}
                            >
                                {label}
                            </Animated.Text>
                        </Animated.View>

                        {isExpanded && (
                            <Animated.View
                                style={{
                                    height: animationValue.current.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '55%'],
                                    }),
                                }}
                            >
                                {children}
                            </Animated.View>
                        )}
                    </View>

                    {props.rightIcon}

                    <ValidationDot
                        isValid={isValid}
                        colors={props.colors}
                        style={[styles.validationDot, props.validationDotStyle]}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default React.memo(TextFieldAnimation);
