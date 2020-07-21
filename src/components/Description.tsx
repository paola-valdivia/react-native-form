import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import { DescriptionProps } from '../types';

import DescriptionPictures from './DescriptionPictures';

function Description(props: DescriptionProps) {
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
