import React from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, Animated } from 'react-native';

import { MCQAnswerProps, MCQFieldProps } from '../types';
import { baseColors } from '../constants';
import styles from '../SharedStyles';

import Description from '../components/Description';
import ValidationDot from '../components/ValidationDot';

/* Component used for individual answers */
function MCQAnswer(props: MCQAnswerProps) {
    // const answerColor: string = isChecked ? colors.main : colors.inactive;
    // const backgroundColor: string = isChecked ? colors.background : '#fff';
    // const iconColor: string = isChecked ? colors.main : '#fff';

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.answerContainer, props.containerStyle]}>
                <Text style={[styles.answerText, props.textStyle]}>{props.text}</Text>
                {props.icon}
            </View>
        </TouchableWithoutFeedback>
    );
}

function MCQField(props: MCQFieldProps) {
    const selectedAnswerQty = props.selectedAnswersIndices.length;

    const arrowRotationCoefficient = React.useRef(new Animated.Value(0));

    const [isFolded, setIsFolded] = React.useState(true);

    React.useEffect(() => {
        Animated.timing(arrowRotationCoefficient.current, {
            toValue: isFolded ? 0 : 1,
            delay: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isFolded]);

    const toggleFold = () => setIsFolded((prevIsFolded) => !prevIsFolded);

    const activeColor = props.colors?.active || baseColors.main;
    const inactiveColor = props.colors?.inactive || baseColors.inactive;
    const activeBackgroundColor = props.colors?.activeBackground || baseColors.background;
    const inactiveBackgroundColor = props.colors?.inactiveBackground || '#fff';

    let openFoldableIcon = props.activeOpenFoldableIcon;
    if (props.inactiveOpenFoldableIcon && selectedAnswerQty === 0) {
        openFoldableIcon = props.inactiveOpenFoldableIcon;
    }

    let closeFoldableIcon = props.activeCloseFoldableIcon;
    if (props.inactiveCloseFoldableIcon && selectedAnswerQty === 0) {
        closeFoldableIcon = props.inactiveCloseFoldableIcon;
    }

    const renderOpenFoldableIcon = (icon: React.ReactNode): React.ReactNode => {
        if (!icon) return null;
        if (!props.shouldAnimateOpenFoldableIcon) {
            return <View>{icon}</View>;
        }

        return (
            <Animated.View
                style={[
                    {
                        transform: [
                            {
                                rotate: arrowRotationCoefficient.current.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '90deg'],
                                }),
                            },
                        ],
                    },
                ]}
            >
                {icon}
            </Animated.View>
        );
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Description {...props.descriptionProps} />

            <View style={[styles.labelAndValidationContainer, props.labelAndValidationContainerStyle]}>
                {props.label && (
                    <Text numberOfLines={1} style={[styles.labelText, props.labelStyle]}>
                        {props.label}
                    </Text>
                )}
                {!props.foldable && (
                    <ValidationDot isValid={props.isValid} style={props.validationDotStyle} colors={props.colors} />
                )}
            </View>

            {!props.foldable ? (
                props.possibleAnswers.map((possibleAnswer: string, index: number) => {
                    return (
                        <MCQAnswer
                            text={possibleAnswer}
                            isSelected={props.selectedAnswersIndices.includes(index)}
                            onPress={() => props.onSelectAnswer(index)}
                            icon={props.answerIcon}
                            containerStyle={props.answerContainerStyle}
                            textStyle={props.answerTextStyle}
                        />
                    );
                })
            ) : (
                <>
                    <TouchableOpacity
                        style={[
                            styles.answerContainer,
                            {
                                marginBottom: 10,
                                borderColor: selectedAnswerQty > 0 ? activeColor : inactiveColor,
                                backgroundColor:
                                    selectedAnswerQty > 0 ? activeBackgroundColor : inactiveBackgroundColor,
                            },
                            props.openFoldableBoxStyle,
                        ]}
                        onPress={toggleFold}
                    >
                        {props.openFoldableLabel && (
                            <Text
                                style={[
                                    styles.answerText,
                                    { color: selectedAnswerQty > 0 ? activeColor : inactiveColor },
                                    props.openFoldableLabelStyle,
                                ]}
                            >
                                {props.openFoldableLabel(selectedAnswerQty)}
                            </Text>
                        )}
                        {openFoldableIcon && renderOpenFoldableIcon(openFoldableIcon)}
                        <ValidationDot
                            isValid={props.isValid}
                            style={{ position: 'absolute', right: 35 }}
                            colors={props.colors}
                        />
                    </TouchableOpacity>

                    {!isFolded && (
                        <>
                            {props.possibleAnswers.map((possibleAnswer, index) => {
                                return (
                                    <MCQAnswer
                                        text={possibleAnswer}
                                        isSelected={props.selectedAnswersIndices.includes(index)}
                                        onPress={() => props.onSelectAnswer(index)}
                                        icon={props.answerIcon}
                                        containerStyle={props.answerContainerStyle}
                                        textStyle={props.answerTextStyle}
                                    />
                                );
                            })}
                            {props.closeFoldableLabel && (
                                <TouchableOpacity
                                    style={[styles.answerContainer, styles.closeMcqBox, props.closeFoldableBoxStyle]}
                                    onPress={toggleFold}
                                >
                                    <Text style={[styles.answerText, { color: '#fff' }]}>
                                        {props.closeFoldableLabel}
                                    </Text>
                                    {closeFoldableIcon}
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </>
            )}
        </View>
    );
}

export default React.memo(MCQField);
