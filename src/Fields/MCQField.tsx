import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ViewStyle,
    TouchableOpacity,
    Animated,
    Keyboard,
} from 'react-native';
import { WithTranslation } from 'react-i18next';
import { withTranslationAndStatics } from '../../intl/i18n';

import { AnswerValues, FormUrl, MCQComponent, MCQItem, Nullable } from '../../../index';
import sharedStyles, { colors } from './SharedStyles';
import Icon from '../Icon';
import Description from '../components/Description';

const styles = StyleSheet.create({
    answerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
    },
    answerText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        flex: 1,
    },
    closeQcmBox: {
        color: '#fff',
        backgroundColor: '#293541',
        position: 'relative',
    },
});

interface Props extends WithTranslation {
    id: string;
    label: string;
    description?: string;
    descriptionPictures?: FormUrl[];
    selectedAnswersIndices: number[];
    saveAnswer: (newAnswerValues: AnswerValues, id: string, isValid: Nullable<boolean>) => void;
    validationFunc: (answer: number[], component: MCQComponent) => Nullable<boolean>;
    isValid: Nullable<boolean>;
    component: MCQComponent;
    containerStyle?: ViewStyle;
}

/* function to render answers */
function mcqAnswer(
    index: number,
    answerText: string,
    selectedAnswersIndices: number[],
    isMultiple: boolean,
    onPress: (index: number) => void
) {
    const isChecked: boolean = selectedAnswersIndices.includes(index);
    const answerColor: string = isChecked ? colors.main : colors.inactive;
    const backgroundColor: string = isChecked ? colors.background : '#fff';
    const iconColor: string = isChecked ? colors.main : '#fff';

    return (
        <TouchableWithoutFeedback onPress={() => onPress(index)} key={'answer_' + index}>
            <View
                style={[
                    styles.answerContainer,
                    {
                        borderColor: answerColor,
                        backgroundColor: backgroundColor,
                        marginTop: index > 0 ? 10 : 0,
                    },
                ]}
            >
                <Text style={[styles.answerText, { color: answerColor }]}>{answerText}</Text>
                {isMultiple ? (
                    <Icon name="check_square" color={iconColor} size={16} />
                ) : (
                    <Icon name="dot" color={iconColor} size={14} />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

/* function to render validation dot */
function renderValidationDot(isValid: boolean, additionalStyle?: ViewStyle) {
    return (
        <View
            style={[
                sharedStyles.validationDot,
                { backgroundColor: isValid ? colors.valid : colors.error },
                additionalStyle,
            ]}
        />
    );
}

function MCQField(props: Props) {
    const { id, isValid, validationFunc, selectedAnswersIndices, saveAnswer, component, t } = props;
    const { foldable_mcq, multipleAllowed, items } = component;
    const selectedAnswerQty = selectedAnswersIndices.length;

    const arrowRotationCoefficient = React.useRef(new Animated.Value(0));

    const [folded, setFold] = React.useState(true);

    React.useEffect(() => {
        Animated.timing(arrowRotationCoefficient.current, {
            toValue: folded ? 0 : 1,
            delay: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [folded]);

    /* callback to fold mcq field */
    const toggleFold = React.useCallback(() => setFold(!folded), [folded]);

    /* callback to save the new answer */
    const onPressAnswer = React.useCallback(
        (answerIndex: number) => {
            Keyboard.dismiss();

            let newSelectedAnswersIndices: number[];
            if (!selectedAnswersIndices.includes(answerIndex)) {
                newSelectedAnswersIndices = multipleAllowed ? [...selectedAnswersIndices, answerIndex] : [answerIndex];
            } else {
                newSelectedAnswersIndices = selectedAnswersIndices.filter(
                    (selectedAnswerIndex) => selectedAnswerIndex !== answerIndex
                );
            }

            saveAnswer(newSelectedAnswersIndices, id, validationFunc(newSelectedAnswersIndices, component));
        },
        [component, id, multipleAllowed, saveAnswer, selectedAnswersIndices, validationFunc]
    );

    /* callback to render mcq answers */
    const renderAnswer = React.useCallback(
        (index, answerText) => {
            return mcqAnswer(index, answerText, selectedAnswersIndices, multipleAllowed, onPressAnswer);
        },
        [multipleAllowed, onPressAnswer, selectedAnswersIndices]
    );

    let selectedAnswersLabel: string = '';
    if (foldable_mcq) {
        if (multipleAllowed) {
            if (selectedAnswerQty === 0) {
                selectedAnswersLabel = t('form.placeholder.mcq.multiple_0');
            } else {
                selectedAnswersLabel = t('form.placeholder.mcq.multiple', { count: selectedAnswerQty });
            }
        } else {
            if (selectedAnswerQty === 0) {
                selectedAnswersLabel = t('form.placeholder.mcq.single');
            } else {
                selectedAnswersLabel = items[selectedAnswersIndices[0]].text;
            }
        }
    }

    return (
        <View style={[sharedStyles.container, props.containerStyle]}>
            <Description description={props.description} descriptionPictures={props.descriptionPictures} />

            <View style={sharedStyles.labelAndValidationContainer}>
                <Text numberOfLines={1} style={sharedStyles.labelText}>
                    {props.label}
                </Text>
                {!foldable_mcq && isValid !== null && renderValidationDot(isValid)}
            </View>

            {!foldable_mcq ? (
                items.map((possibleAnswer: MCQItem, index: number) => {
                    return renderAnswer(index, possibleAnswer.text);
                })
            ) : (
                <>
                    <TouchableOpacity
                        style={[
                            styles.answerContainer,
                            {
                                marginBottom: 10,
                                borderColor: selectedAnswerQty > 0 ? colors.main : colors.inactive,
                                backgroundColor: selectedAnswerQty > 0 ? colors.background : '#fff',
                            },
                        ]}
                        onPress={toggleFold}
                    >
                        <Text
                            style={{
                                ...styles.answerText,
                                color: selectedAnswerQty > 0 ? colors.main : colors.inactive,
                            }}
                        >
                            {selectedAnswersLabel}
                        </Text>
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
                            <Icon
                                name="card_arrow"
                                size={16}
                                style={{ color: selectedAnswerQty > 0 ? colors.main : colors.inactive }}
                            />
                        </Animated.View>
                        {isValid !== null && renderValidationDot(isValid, { position: 'absolute', right: 35 })}
                    </TouchableOpacity>
                    {!folded && (
                        <>
                            {items.map((possibleAnswer: MCQItem, index: number) => {
                                return renderAnswer(index, possibleAnswer.text);
                            })}
                            <TouchableOpacity
                                style={[styles.answerContainer, styles.closeQcmBox, { marginTop: 10 }]}
                                onPress={toggleFold}
                            >
                                <Text style={[styles.answerText, { color: '#fff' }]}>{t('form.closeFoldableMcq')}</Text>
                                <Icon
                                    style={{ color: '#fff', transform: [{ rotate: '-90deg' }] }}
                                    name="card_arrow"
                                    size={16}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </>
            )}
        </View>
    );
}

export default React.memo(withTranslationAndStatics()(MCQField));
