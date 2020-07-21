import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TextStyle } from 'react-native';

import { CommonStyles, DescriptionProps, Nullable } from '../types';
import { baseColors } from '../constants';

import Description from '../components/Description';

interface Props {
    descriptionProps: DescriptionProps;
    label: string;
    value: string;
    isValid: Nullable<boolean>;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    commonStyles?: CommonStyles;
    inputStyle?: TextStyle;
    colors?: {
        valid?: string;
        error?: string;
        placeholder?: string;
    };
}

function MultiLineTextField(props: Props) {
    const {
        descriptionProps,
        label,
        value,
        isValid,
        onChangeText,
        placeholder,
        onFocus,
        onBlur,
        commonStyles,
        inputStyle,
        colors,
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
            <View style={[{ shadowOpacity: isFocused ? 0.35 : 0.1 }, commonStyles?.container]}>
                <Description {...descriptionProps} />

                <View style={commonStyles?.labelAndValidationContainer}>
                    <Text numberOfLines={1} style={commonStyles?.label}>
                        {label}
                    </Text>
                    {isValid !== null && (
                        <View
                            style={[
                                commonStyles?.validationDot,
                                {
                                    backgroundColor: isValid
                                        ? colors?.valid || baseColors.valid
                                        : colors?.error || baseColors.error,
                                },
                            ]}
                        />
                    )}
                </View>

                <TextInput
                    ref={inputRef}
                    value={value}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    multiline={true}
                    placeholderTextColor={colors?.placeholder || baseColors.placeholder}
                    style={inputStyle}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default React.memo(MultiLineTextField);
