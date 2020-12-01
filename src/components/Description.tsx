import React from 'react';
import { View, Text } from 'react-native';

import { DescriptionProps } from '../types';

import DescriptionPictures from './DescriptionPictures';

export const descriptionProps: (keyof DescriptionProps)[] = [
    'descriptionText',
    'descriptionPictures',
    'descriptionImageViewer',
    'onPressDescriptionPicture',
    'descriptionContainerStyle',
    'descriptionTextStyle',
    'descriptionPicturesContainerStyle',
    'descriptionPictureStyle',
];

function Description(props: DescriptionProps) {
    return (
        <View style={props.descriptionContainerStyle}>
            {props.descriptionText && <Text style={props.descriptionTextStyle}>{props.descriptionText}</Text>}
            {props.descriptionPictures && (
                <DescriptionPictures
                    pictures={props.descriptionPictures}
                    onPressPicture={props.onPressDescriptionPicture}
                    ImageViewer={props.descriptionImageViewer}
                    containerStyle={props.descriptionPicturesContainerStyle}
                    pictureStyle={props.descriptionPictureStyle}
                />
            )}
        </View>
    );
}

export default React.memo(Description);
