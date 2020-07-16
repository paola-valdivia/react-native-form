import React from 'react';
import { View, Text, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import R from 'ramda';

import { FormUrl, ImageViewerProps } from '../types';

import DescriptionPictures from './DescriptionPictures';

interface Props {
    description?: {
        text?: string;
        pictures?: FormUrl[];
    };
    imageViewerComponent: React.ComponentType<ImageViewerProps>;
    styles?: {
        text?: TextStyle;
        picturesContainer?: ViewStyle;
        picture?: ImageStyle;
    };
}

function Description(props: Props) {
    const { description, imageViewerComponent, styles } = props;
    return (
        <View>
            {description?.text && <Text style={styles?.text}>{description}</Text>}
            {description?.pictures && (
                <DescriptionPictures
                    pictures={description?.pictures}
                    imageViewerComponent={imageViewerComponent}
                    styles={R.omit(['text'], styles)}
                />
            )}
        </View>
    );
}

export default React.memo(Description);
