import React from 'react';
import { View, ViewStyle } from 'react-native';

import sharedStyles from './SharedStyles';
import { FormUrl } from '../../../index';
import Description from '../components/Description';

interface Props {
    description: string;
    descriptionPictures?: FormUrl[];
    containerStyle?: ViewStyle;
}

function InstructionField(props: Props) {
    return (
        <View style={[sharedStyles.container, props.containerStyle]}>
            <Description description={props.description} descriptionPictures={props.descriptionPictures} />
        </View>
    );
}

export default React.memo(InstructionField);
