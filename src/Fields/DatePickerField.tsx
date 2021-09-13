import React from 'react';
import { View } from 'react-native';
import moment from 'moment';

import PickerField from './PickerField';
import DatePicker from '../DatePicker/DatePicker';
import { DatePickerFieldProps } from '../types';

function DatePickerField(props: DatePickerFieldProps) {
    const { onChange, disabled } = props;

    const [showPicker, setShowPicker] = React.useState(false);

    const openPicker = React.useCallback(() => setShowPicker(true), []);
    const onClosePicker = React.useCallback(
        (date?: Date) => {
            setShowPicker(false);
            onChange(date);
        },
        [onChange]
    );

    return (
        <View>
            <PickerField
                label={props.label}
                value={props.value ? moment(props.value).format(props.dateStringFormat || 'DD/MM/YYYY') : ''}
                isValid={props.isValid}
                openPicker={openPicker}
                leftIcon={props.leftIcon}
                rightIcon={props.rightIcon}
                containerStyle={props.containerStyle}
                labelAndValidationContainerStyle={props.labelAndValidationContainerStyle}
                labelStyle={props.labelStyle}
                validationDotStyle={props.validationDotStyle}
                inputContainerStyle={props.inputContainerStyle}
                inputStyle={props.inputStyle}
                descriptionText={props.descriptionText}
                descriptionPictures={props.descriptionPictures}
                onPressDescriptionPicture={props.onPressDescriptionPicture}
                descriptionTextStyle={props.descriptionTextStyle}
                descriptionImageViewer={props.descriptionImageViewer}
                descriptionPicturesContainerStyle={props.descriptionPicturesContainerStyle}
                descriptionPictureStyle={props.descriptionPictureStyle}
                disabled={disabled}
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
