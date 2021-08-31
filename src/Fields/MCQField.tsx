import React from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, Animated } from 'react-native';
import R from 'ramda';

import { MCQAnswerProps, MCQFieldProps } from '../types';
import { baseColors } from '../constants';
import styles from '../SharedStyles';

import Description, { descriptionProps } from '../components/Description';
import ValidationDot from '../components/ValidationDot';

/* Component used for individual answers */
const MCQAnswer = React.memo((props: MCQAnswerProps) => {
    const { text, onPress, isSelected, index, icon, containerStyle, textStyle, disabled } = props;

    return (
        <TouchableWithoutFeedback onPress={() => onPress(index)} disabled={disabled}>
            <View style={[styles.answerContainer, containerStyle && containerStyle(isSelected, index)]}>
                <Text style={[styles.answerText, textStyle && textStyle(isSelected)]}>{text}</Text>
                {icon && icon(isSelected)}
            </View>
        </TouchableWithoutFeedback>
    );
});

function MCQField(props: MCQFieldProps) {
    const { onSelectAnswer, disabled } = props;

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

    const activeColor = React.useMemo(() => (props.colors && props.colors.active) || baseColors.main, [props.colors]);
    const inactiveColor = React.useMemo(() => (props.colors && props.colors.inactive) || baseColors.inactive, [
        props.colors,
    ]);
    const activeBackgroundColor = React.useMemo(
        () => (props.colors && props.colors.activeBackground) || baseColors.background,
        [props.colors]
    );
    const inactiveBackgroundColor = React.useMemo(() => (props.colors && props.colors.inactiveBackground) || '#fff', [
        props.colors,
    ]);

    let openFoldableIcon = props.activeOpenFoldableIcon;
    if (props.inactiveOpenFoldableIcon && selectedAnswerQty === 0) {
        openFoldableIcon = props.inactiveOpenFoldableIcon;
    }

    let closeFoldableIcon = props.activeCloseFoldableIcon;
    if (props.inactiveCloseFoldableIcon && selectedAnswerQty === 0) {
        closeFoldableIcon = props.inactiveCloseFoldableIcon;
    }

    const onPressAnswer = React.useCallback((index: number) => onSelectAnswer(index), [onSelectAnswer]);

    const answerIcon = React.useCallback(
        (isSelected: boolean) => {
            return isSelected ? props.activeAnswerIcon : props.inactiveAnswerIcon;
        },
        [props.activeAnswerIcon, props.inactiveAnswerIcon]
    );
    const answerContainerStyle = React.useCallback(
        (isSelected: boolean, index: number) => {
            const color = isSelected ? activeColor : inactiveColor;
            const backgroundColor = isSelected ? activeBackgroundColor : inactiveBackgroundColor;

            return [
                {
                    borderColor: color,
                    backgroundColor,
                    marginTop: index > 0 ? 10 : 0,
                },
                props.answerContainerStyle,
            ];
        },
        [activeColor, inactiveColor, activeBackgroundColor, inactiveBackgroundColor, props.answerContainerStyle]
    );
    const answerTextStyle = React.useCallback(
        (isSelected: boolean) => {
            const color = isSelected ? activeColor : inactiveColor;
            return [{ color }, props.answerTextStyle];
        },
        [activeColor, inactiveColor, props.answerTextStyle]
    );

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
        <View style={[styles.container, disabled && { shadowColor: '#fff' }, props.containerStyle]}>
            <Description {...R.pick(descriptionProps, props)} />

            <View style={[styles.labelAndValidationContainer, props.labelAndValidationContainerStyle]}>
                {props.label && <Text
                    numberOfLines={3}
                    ellipsizeMode={'tail'}
                    style={[styles.labelText, props.labelStyle]}>{props.label}</Text>}
                {!props.foldable && (
                    <ValidationDot isValid={props.isValid} style={props.validationDotStyle} colors={props.colors} />
                )}
            </View>

            {!props.foldable ? (
                props.possibleAnswers.map((possibleAnswer: string, index: number) => {
                    return (
                        <MCQAnswer
                            key={`answer_${index}`}
                            text={possibleAnswer}
                            onPress={onPressAnswer}
                            isSelected={props.selectedAnswersIndices.includes(index)}
                            index={index}
                            icon={answerIcon}
                            containerStyle={answerContainerStyle}
                            textStyle={answerTextStyle}
                            disabled={disabled}
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
                        disabled={disabled}
                    >
                        {props.openFoldableLabel && (
                            <Text
                                style={[
                                    styles.answerText,
                                    { color: selectedAnswerQty > 0 ? activeColor : inactiveColor },
                                    props.openFoldableLabelStyle,
                                ]}
                            >
                                {props.openFoldableLabel}
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
                                        key={`answer_${index}`}
                                        text={possibleAnswer}
                                        onPress={onPressAnswer}
                                        isSelected={props.selectedAnswersIndices.includes(index)}
                                        index={index}
                                        icon={answerIcon}
                                        containerStyle={answerContainerStyle}
                                        textStyle={answerTextStyle}
                                        disabled={disabled}
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
