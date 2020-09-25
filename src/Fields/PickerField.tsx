import React from 'react';
import { Keyboard, Text } from 'react-native';

import { PickerFieldProps } from '../types';
import sharedStyles from '../SharedStyles';

import TextFieldAnimation from '../components/TextFieldAnimation';

function PickerField(props: PickerFieldProps) {
    const { value, isValid, openPicker } = props;

    const onPress = React.useCallback(() => {
        Keyboard.dismiss();
        openPicker();
    }, [openPicker]);

    return (
        <TextFieldAnimation
            descriptionProps={props.descriptionProps}
            label={props.label}
            isValid={isValid === undefined ? null : isValid}
            isExpanded={!!value}
            onPress={onPress}
            leftIcon={props.leftIcon}
            rightIcon={props.rightIcon}
            containerStyle={props.containerStyle}
            inputContainerStyle={props.inputContainerStyle}
        >
            <Text style={[sharedStyles.inputText, props.inputStyle]}>{value}</Text>
        </TextFieldAnimation>
    );
}

export default React.memo(PickerField);
