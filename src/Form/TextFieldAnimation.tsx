import React, { ReactElement } from 'react';
import {
    Animated,
    StyleSheet,
    TextStyle,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';

import { FormUrl, Nullable } from '../../../index';
import sharedStyles, { colors } from './SharedStyles';
import Description from './Description';
import Icon from '../Icon';

const styles = StyleSheet.create({
    iconContainer: {
        width: 35,
        height: '100%',
        justifyContent: 'center',
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

export interface TextFieldDesignProps {
    label: string;
    description?: string;
    descriptionPictures?: FormUrl[];
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
    minFontSize?: number;
    maxFontSize?: number;
    containerStyle?: ViewStyle;
    inputContainerStyle?: ViewStyle;
    iconContainerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    textStyle?: TextStyle;
}

interface Props extends TextFieldDesignProps {
    children: ReactElement;
    isExpanded: boolean;
    isFocused: boolean;
    focus: () => void;
    isValid?: Nullable<boolean>;
    isTextHidden: boolean; // Set the right icon
    inputFocus: () => void;
    switchTextHidden?: (isHidden: boolean) => void;
}

function TextFieldAnimation(props: Props) {
    const { isExpanded, switchTextHidden, inputFocus } = props;

    const animationValue = React.useRef(new Animated.Value(isExpanded ? 1 : 0));

    React.useEffect(() => {
        Animated.timing(animationValue.current, {
            toValue: isExpanded ? 1 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start(isExpanded ? inputFocus : undefined);
    }, [isExpanded, inputFocus]);

    const minFontSize = props.minFontSize || 11;
    const maxFontSize = props.maxFontSize || 13;

    return (
        <TouchableWithoutFeedback onPress={() => !props.isFocused && props.focus()}>
            <View
                style={[sharedStyles.container, { shadowOpacity: props.isFocused ? 0.35 : 0.1 }, props.containerStyle]}
            >
                <Description description={props.description} descriptionPictures={props.descriptionPictures} />
                <View style={[{ flexDirection: 'row', height: 30 }, props.inputContainerStyle]}>
                    <View style={[styles.iconContainer, props.iconContainerStyle]}>
                        {props.iconName && (
                            <Icon
                                name={props.iconName}
                                size={props.iconSize || 18}
                                color={props.iconColor || colors.main}
                            />
                        )}
                    </View>
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
                                    {
                                        fontSize: animationValue.current.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [maxFontSize, minFontSize],
                                        }),
                                    },
                                    props.textStyle,
                                ]}
                            >
                                {props.label}
                            </Animated.Text>
                        </Animated.View>

                        {props.isExpanded && (
                            <Animated.View
                                style={{
                                    height: animationValue.current.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '55%'],
                                    }),
                                }}
                            >
                                {props.children}
                            </Animated.View>
                        )}
                    </View>

                    {switchTextHidden && props.isExpanded && (
                        <TouchableOpacity
                            style={{ marginLeft: 'auto', alignSelf: 'center' }}
                            onPress={() => switchTextHidden(!props.isTextHidden)}
                        >
                            <Icon
                                name={props.isTextHidden ? 'show_password' : 'hide_password'}
                                size={22}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    )}

                    {props.isValid !== null && (
                        <View
                            style={[
                                sharedStyles.validationDot,
                                styles.validationDot,
                                { backgroundColor: props.isValid ? colors.valid : colors.error },
                            ]}
                        />
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default TextFieldAnimation;
