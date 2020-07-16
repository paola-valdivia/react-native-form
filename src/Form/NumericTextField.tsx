import React from 'react';
import { ViewStyle } from 'react-native';
import { WithTranslation } from 'react-i18next';

import { AnswerValues, FormUrl, Nullable } from '../../../index';
import SingleLineTextField from './SingleLineTextField';

interface Props extends WithTranslation {
    id: string;
    label: string;
    description?: string;
    descriptionPictures?: FormUrl[];
    iconName?: string;
    iconSize?: number;
    initialValue: string;
    saveAnswer: (newAnswerValues: AnswerValues, id: string, isValid: Nullable<boolean>) => void;
    isValid: Nullable<boolean>;
    validationFunc: (text: string) => Nullable<boolean>;
    containerStyle: ViewStyle;
}

function NumericTextField(props: Props) {
    const { id, initialValue, isValid, validationFunc, saveAnswer } = props;

    const [valid, setValid] = React.useState<Nullable<boolean>>(isValid);
    const [text, setText] = React.useState(initialValue || '');

    /* props value has always the priority */
    React.useEffect(() => {
        setText(initialValue || '');
    }, [initialValue, setText]);

    /* props validation has always the priority */
    React.useEffect(() => {
        setValid(isValid);
    }, [isValid, setValid]);

    /* update validation on text change */
    React.useEffect(() => {
        setValid(validationFunc(text));
    }, [text, setValid, validationFunc]);

    return (
        <SingleLineTextField
            label={props.label}
            description={props.description}
            descriptionPictures={props.descriptionPictures}
            iconName={props.iconName}
            iconSize={props.iconSize}
            containerStyle={props.containerStyle}
            value={text}
            isValid={valid}
            onChangeText={setText}
            textInputProps={{ keyboardType: 'numeric' }}
            onBlur={() => saveAnswer(text, id, valid)}
        />
    );
}

export default React.memo(NumericTextField);
