import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import R from 'ramda';

import { Nullable } from '../../../index';
import sharedStyles from './SharedStyles';
import TextFieldAnimation, { TextFieldDesignProps } from '../components/TextFieldAnimation';

interface Props extends TextFieldDesignProps {
    value: string;
    canHideText?: boolean;
    isValid?: Nullable<boolean>;
    textInputProps?: TextInputProps;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
}

const SingleLineTextField = React.forwardRef((props: Props, ref) => {
    const { value, isValid, onChangeText, canHideText, onBlur } = props;

    const inputRef = React.useRef<TextInput>(null);
    const prevFocusRef = React.useRef(false);

    const [isTextHidden, setTextHide] = React.useState(canHideText || false);
    const [isFocused, setFocus] = React.useState(false);

    /* capture the ref */
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (!ref) return () => {};

        typeof ref === 'function' ? ref(inputRef) : (ref.current = inputRef.current);
        return () => (typeof ref === 'function' ? ref(null) : (ref.current = null));
    }, [ref]);

    const inputFocus = React.useCallback(() => {
        if (inputRef.current && isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    /* run onBlur functions */
    React.useEffect(() => {
        if (onBlur && prevFocusRef.current && !isFocused) {
            onBlur();
        }
        prevFocusRef.current = isFocused;
    }, [onBlur, isFocused]);

    return (
        <TextFieldAnimation
            {...R.omit(['ref'], props)}
            isExpanded={isFocused || !R.isEmpty(value)}
            isValid={isValid === undefined ? null : isValid}
            isFocused={isFocused}
            focus={() => setFocus(true)}
            isTextHidden={isTextHidden}
            switchTextHidden={canHideText ? setTextHide : undefined}
            inputFocus={inputFocus}
        >
            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={onChangeText}
                style={[sharedStyles.inputText, props.inputStyle]}
                secureTextEntry={isTextHidden || false}
                onBlur={() => setFocus(false)}
                {...props.textInputProps}
            />
        </TextFieldAnimation>
    );
});

export default React.memo(SingleLineTextField);
