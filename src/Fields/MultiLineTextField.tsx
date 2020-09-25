import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

import { MultiLineTextFieldProps } from '../types';
import { baseColors } from '../constants';
import styles from '../SharedStyles';

import Description from '../components/Description';
import ValidationDot from '../components/ValidationDot';

function MultiLineTextField(props: MultiLineTextFieldProps) {
    const {
        descriptionProps,
        label,
        value,
        isValid,
        onChangeText,
        placeholder,
        onFocus,
        onBlur,
        textInputProps,
    } = props;

    const inputRef = React.useRef<TextInput>(null);
    const prevFocusRef = React.useRef<boolean>(false);

    const [isFocused, setFocus] = React.useState(false);

    // Trigger onFocus/onBlur
    React.useEffect(() => {
        if (!prevFocusRef.current && isFocused && onFocus) onFocus();
        if (prevFocusRef.current && !isFocused && onBlur) onBlur();

        prevFocusRef.current = isFocused;
    }, [isFocused, onFocus, onBlur]);

    // setFocus and focus the input on press
    const onPress = React.useCallback(() => {
        if (!isFocused) {
            setFocus(true);
            inputRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, { shadowOpacity: isFocused ? 0.35 : 0.1 }, props.containerStyle]}>
                <Description {...descriptionProps} />

                <View style={[styles.labelAndValidationContainer, props.labelAndValidationContainerStyle]}>
                    {label && (
                        <Text numberOfLines={1} style={[styles.labelText, props.labelStyle]}>
                            {label}
                        </Text>
                    )}
                    <ValidationDot isValid={isValid} style={props.validationDotStyle} colors={props.colors} />
                </View>

                <TextInput
                    ref={inputRef}
                    value={value}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    multiline={true}
                    placeholderTextColor={props.colors?.placeholder || baseColors.placeholder}
                    style={[styles.inputText, props.inputStyle]}
                    {...textInputProps}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default React.memo(MultiLineTextField);
