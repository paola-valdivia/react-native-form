import React from 'react';
import { Keyboard, StyleSheet, Text, View, Button, Platform, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import R from 'ramda';
import { WithTranslation } from 'react-i18next';
import { withTranslationAndStatics } from '../../intl/i18n';

import { AnswerValues, DateComponent, FormUrl, Nullable } from '../../../index';
import sharedStyles from './SharedStyles';
import TextFieldAnimation from './TextFieldAnimation';

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    datePickerIOSContainer: {
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    datePickerIOSHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});

interface Props extends WithTranslation {
    id: string;
    label: string;
    description?: string;
    descriptionPictures?: FormUrl[];
    initialValue: string;
    isValid: Nullable<boolean>;
    validationFunc: (text: string, component: DateComponent) => Nullable<boolean>;
    saveAnswer: (newAnswerValues: AnswerValues, id: string, isValid: Nullable<boolean>) => void;
    component: DateComponent;
    containerStyle?: ViewStyle;
}

function stringIsDate(date: string): boolean {
    return !!date && !isNaN(moment(date).toDate().getDay());
}

function DateField(props: Props) {
    const { id, initialValue, isValid, validationFunc, component, saveAnswer, t } = props;
    const { preventPastDate } = component;

    const prevFocusRef = React.useRef<boolean>(false);
    const isAndroidRef = React.useRef(Platform.OS === 'android');
    const iosDateControlValueRef = React.useRef(new Date());

    const [valid, setValid] = React.useState<Nullable<boolean>>(isValid);
    const [value, setValue] = React.useState(stringIsDate(initialValue) ? initialValue : '');
    const [isFocused, setFocus] = React.useState(false);

    /* props value has always the priority */
    React.useEffect(() => {
        setValue(stringIsDate(initialValue) ? initialValue : '');
    }, [initialValue, setValue]);

    /* props validation has always the priority */
    React.useEffect(() => {
        setValid(isValid);
    }, [isValid, setValid]);

    /* dismiss keyboard on focus and save answer on blur */
    React.useEffect(() => {
        if (!prevFocusRef.current && isFocused) {
            Keyboard.dismiss();
        } else if (prevFocusRef.current && !isFocused) {
            saveAnswer(value, id, validationFunc(value, component));
        }
        prevFocusRef.current = isFocused;
    }, [isFocused, saveAnswer, value, id, component, validationFunc]);

    /* callback for ios datepicker */
    const onDatePickerIOSClose = (mode: 'cancel' | 'clear' | 'validate' = 'validate'): void => {
        if (mode === 'cancel') {
            iosDateControlValueRef.current = stringIsDate(value) ? moment(value).toDate() : new Date();
        } else if (mode === 'clear') {
            iosDateControlValueRef.current = new Date();
            setValue('');
        } else {
            setValue(moment(iosDateControlValueRef.current).format());
        }
        setFocus(false);
    };

    /* callback for android datepicker */
    const onDatePickerAndroidClose = (event: any, date?: Date) => {
        setValue(date ? moment(date).format() : '');
        setFocus(false);
    };

    return (
        <View>
            <TextFieldAnimation
                label={props.label}
                description={props.description}
                descriptionPictures={props.descriptionPictures}
                iconName="full_calendar"
                iconSize={24}
                isExpanded={isFocused || !R.isEmpty(value)}
                isValid={valid}
                isFocused={isFocused}
                focus={() => setFocus(true)}
                isTextHidden={false}
                containerStyle={props.containerStyle}
            >
                <Text style={sharedStyles.inputText}>{moment(value).format('DD/MM/YYYY')}</Text>
            </TextFieldAnimation>
            {isAndroidRef.current && isFocused && (
                <RNDateTimePicker
                    mode="date"
                    value={value ? moment(value).toDate() : new Date()}
                    minimumDate={preventPastDate ? new Date() : undefined}
                    onChange={onDatePickerAndroidClose}
                />
            )}
            <Modal
                isVisible={!isAndroidRef.current && isFocused}
                onBackdropPress={() => onDatePickerIOSClose('cancel')}
                style={styles.modal}
            >
                <View style={styles.datePickerIOSContainer}>
                    <View style={styles.datePickerIOSHeader}>
                        <Button
                            title={t('form.date.clear').toUpperCase()}
                            onPress={() => onDatePickerIOSClose('clear')}
                        />
                        <Button title={t('form.date.validate').toUpperCase()} onPress={() => onDatePickerIOSClose()} />
                    </View>
                    <RNDateTimePicker
                        value={iosDateControlValueRef.current}
                        onChange={(event, date?: Date) => date && (iosDateControlValueRef.current = date)}
                        textColor="black"
                    />
                </View>
            </Modal>
        </View>
    );
}

export default React.memo(withTranslationAndStatics()(DateField));
