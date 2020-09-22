import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import moment from 'moment';

import PickerField from './PickerField';
import DatePicker, { Styles as DatePickerStyles } from '../DatePicker/DatePicker';
import { CommonStyles, DescriptionProps, Nullable } from '../types';

interface Styles extends CommonStyles, DatePickerStyles {
    pickerFieldContainerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
}

interface Props extends Styles {
    descriptionProps: DescriptionProps;
    label: string;
    value: Date;
    isValid?: Nullable<boolean>;
    onChange: (date?: Date) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    dateStringFormat?: string;

    // Android only
    minimumDate?: Date;
    maximumDate?: Date;

    // iOS only
    iosClearButtonText?: string;
    iosValidateButtonText?: string;
}

function DatePickerField(props: Props) {
    const { onChange } = props;

    const [showPicker, setShowPicker] = React.useState(false);

    const openPicker = React.useCallback(() => setShowPicker(true), []);
    const onClosePicker = React.useCallback(
        (date?: Date) => {
            onChange(date);
            setShowPicker(false);
        },
        [onChange]
    );

    return (
        <View>
            <PickerField
                descriptionProps={props.descriptionProps}
                label={props.label}
                value={moment(props.value).format(props.dateStringFormat || 'DD/MM/YYYY')}
                isValid={props.isValid}
                openPicker={openPicker}
                leftIcon={props.leftIcon}
                rightIcon={props.rightIcon}
                containerStyle={props.containerStyle}
                inputContainerStyle={props.inputContainerStyle}
                inputStyle={props.inputStyle}
            />
            <DatePicker
                isVisible={showPicker}
                value={props.value}
                onClosePicker={onClosePicker}
                minimumDate={props.minimumDate}
                maximumDate={props.maximumDate}
                iosClearButtonText={props.iosClearButtonText}
                iosValidateButtonText={props.iosValidateButtonText}
                modalStyle={props.modalStyle}
                datePickerIOSContainerStyle={props.datePickerIOSContainerStyle}
                datePickerIOSHeaderStyle={props.datePickerIOSHeaderStyle}
            />
        </View>
    );
}

export default React.memo(DatePickerField);
