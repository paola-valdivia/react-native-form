import React from 'react';
import { Keyboard, Text } from 'react-native';

import { PickerFieldProps } from '../types';
import sharedStyles from '../SharedStyles';

import TextFieldAnimation from '../components/TextFieldAnimation';

function PickerField(props: PickerFieldProps) {
    const { value, isValid, openPicker, disabled } = props;

    const onPress = React.useCallback(() => {
        Keyboard.dismiss();
        openPicker();
    }, [openPicker]);

    return (
        <TextFieldAnimation
            label={props.label}
            isValid={isValid === undefined ? null : isValid}
            isExpanded={!!value}
            onPress={onPress}
            leftIcon={props.leftIcon}
            rightIcon={props.rightIcon}
            containerStyle={props.containerStyle}
            labelAndValidationContainerStyle={props.labelAndValidationContainerStyle}
            labelStyle={props.labelStyle}
            validationDotStyle={props.validationDotStyle}
            inputContainerStyle={props.inputContainerStyle}
            descriptionText={props.descriptionText}
            descriptionPictures={props.descriptionPictures}
            onPressDescriptionPicture={props.onPressDescriptionPicture}
            descriptionTextStyle={props.descriptionTextStyle}
            descriptionPicturesContainerStyle={props.descriptionPicturesContainerStyle}
            descriptionPictureStyle={props.descriptionPictureStyle}
            disabled={disabled}
        >
            <Text style={[sharedStyles.inputText, props.inputStyle]}>{value}</Text>
        </TextFieldAnimation>
    );
}

export default React.memo(PickerField);
