import React from 'react';
import { View, Text } from 'react-native';

import { DescriptionProps } from '../types';

import DescriptionPictures from './DescriptionPictures';

function Description(props: DescriptionProps) {
    const { text, pictures, onPressPicture, textStyle, picturesContainerStyle, pictureStyle } = props;
    return (
        <View>
            {text && <Text style={textStyle}>{text}</Text>}
            {pictures && (
                <DescriptionPictures
                    pictures={pictures}
                    onPressPicture={onPressPicture}
                    containerStyle={picturesContainerStyle}
                    pictureStyle={pictureStyle}
                />
            )}
        </View>
    );
}

export default React.memo(Description);
