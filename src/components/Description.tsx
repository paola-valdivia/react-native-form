import React from 'react';
import { View, Text } from 'react-native';

import { DescriptionProps } from '../types';
import styles from '../SharedStyles';

import DescriptionPictures from './DescriptionPictures';

function Description(props: DescriptionProps) {
    return (
        <View style={[styles.container, props.descriptionContainerStyle]}>
            {props.descriptionText && <Text style={props.descriptionTextStyle}>{props.descriptionText}</Text>}
            {props.descriptionPictures && (
                <DescriptionPictures
                    pictures={props.descriptionPictures}
                    onPressPicture={props.onPressDescriptionPicture}
                    containerStyle={props.descriptionPicturesContainerStyle}
                    pictureStyle={props.descriptionPictureStyle}
                />
            )}
        </View>
    );
}

export default React.memo(Description);
