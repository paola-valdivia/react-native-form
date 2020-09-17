import React from 'react';
import { Keyboard, Text, View, ViewStyle, StyleProp } from 'react-native';

import { CommonStyles, DescriptionProps, Nullable } from '../types';
import sharedStyles from '../SharedStyles';

import TextFieldAnimation from '../components/TextFieldAnimation';

interface Styles extends CommonStyles {
    inputContainerStyle?: StyleProp<ViewStyle>;
}

interface Props extends Styles {
    descriptionProps: DescriptionProps;
    label: string;
    value: string;
    isValid?: Nullable<boolean>;
    openPicker: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

function PickerField(props: Props) {
    const { value, isValid, openPicker } = props;

    const onPress = React.useCallback(() => {
        Keyboard.dismiss();
        openPicker();
    }, [openPicker]);

    return (
        <View>
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
                <Text style={sharedStyles.inputText}>{value}</Text>
            </TextFieldAnimation>
        </View>
    );
}

export default React.memo(PickerField);