import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Nullable } from '../types';
import styles from '../SharedStyles';
import { baseColors } from '../constants';

interface Props {
    isValid?: Nullable<boolean>;
    colors?: {
        valid?: string;
        error?: string;
    };
    style?: StyleProp<ViewStyle>;
}

function ValidationDot(props: Props) {
    if (props.isValid === undefined || props.isValid === null) return null;

    const validColor = props.colors?.valid || baseColors.valid;
    const errorColor = props.colors?.error || baseColors.error;

    return (
        <View
            style={[styles.validationDot, props.style, { backgroundColor: props.isValid ? validColor : errorColor }]}
        />
    );
}

export default React.memo(ValidationDot);
