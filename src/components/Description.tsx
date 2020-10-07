import React from 'react';
import { View, Text } from 'react-native';

import { DescriptionProps } from '../types';

import DescriptionPictures from './DescriptionPictures';

function Description(props: DescriptionProps) {
    const {
        descriptionText,
        descriptionPictures,
        onPressDescriptionPicture,
        descriptionTextStyle,
        descriptionPicturesContainerStyle,
        descriptionPictureStyle,
    } = props;
    return (
        <View>
            {descriptionText && <Text style={descriptionTextStyle}>{descriptionText}</Text>}
            {descriptionPictures && (
                <DescriptionPictures
                    pictures={descriptionPictures}
                    onPressPicture={onPressDescriptionPicture}
                    containerStyle={descriptionPicturesContainerStyle}
                    pictureStyle={descriptionPictureStyle}
                />
            )}
        </View>
    );
}

export default React.memo(Description);
