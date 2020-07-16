import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { WithTranslation } from 'react-i18next';

import { AnswerValues, FormUrl, Nullable } from '../../../index';
import { withTranslationAndStatics } from '../../intl/i18n';

import sharedStyles, { colors } from './SharedStyles';
import Description from '../components/Description';

interface Props extends WithTranslation {
    id: string;
    label: string;
    description?: string;
    descriptionPictures?: FormUrl[];
    initialValue: string;
    saveAnswer: (newAnswerValues: AnswerValues, id: string, isValid: Nullable<boolean>) => void;
    isValid: Nullable<boolean>;
    validationFunc: (text: string) => Nullable<boolean>;
    containerStyle: ViewStyle;
}

function MultiLineTextField(props: Props) {
    const { id, initialValue, isValid, validationFunc, saveAnswer, t } = props;

    const inputRef = React.useRef<TextInput>(null);
    const prevFocusRef = React.useRef<boolean>(false);

    const [valid, setValid] = React.useState<Nullable<boolean>>(isValid);
    const [text, setText] = React.useState(initialValue || '');
    const [isFocused, setFocus] = React.useState(false);

    /* props value has always the priority */
    React.useEffect(() => {
        setText(initialValue || '');
    }, [initialValue, setText]);

    /* props validation has always the priority */
    React.useEffect(() => {
        setValid(isValid);
    }, [isValid, setValid]);

    /* save answers on blur */
    React.useEffect(() => {
        if (prevFocusRef.current && !isFocused) {
            saveAnswer(text, id, valid);
        }
        prevFocusRef.current = isFocused;
    }, [id, isFocused, saveAnswer, text, valid]);

    /* update validation on text change */
    React.useEffect(() => {
        setValid(validationFunc(text));
    }, [text, setValid, validationFunc]);

    // setFocus and focus the input on press
    const onPress = React.useCallback(() => {
        if (!isFocused) {
            setFocus(true);
            inputRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={[
                    sharedStyles.container,
                    {
                        shadowOpacity: isFocused ? 0.35 : 0.1,
                    },
                    props.containerStyle,
                ]}
            >
                <Description description={props.description} descriptionPictures={props.descriptionPictures} />

                <View style={sharedStyles.labelAndValidationContainer}>
                    <Text numberOfLines={1} style={sharedStyles.labelText}>
                        {props.label}
                    </Text>
                    {valid !== null && (
                        <View
                            style={[
                                sharedStyles.validationDot,
                                { backgroundColor: valid ? colors.valid : colors.error },
                            ]}
                        />
                    )}
                </View>

                <TextInput
                    ref={inputRef}
                    value={text}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    onChangeText={setText}
                    placeholder={t('form.placeholder.textField')}
                    multiline={true}
                    placeholderTextColor={colors.placeholder}
                    style={{ ...sharedStyles.inputText, height: 115 }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default React.memo(withTranslationAndStatics()(MultiLineTextField));
