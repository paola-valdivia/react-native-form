import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

import { DescriptionPicturesProps } from '../types';

interface PictureSizes {
    [index: number]: { width: number; height: number };
}

function DescriptionPictures(props: DescriptionPicturesProps) {
    const { pictures } = props;

    const [pictureSizes, setPictureSizes] = React.useState<PictureSizes>({});

    // Initialize pictureSizes using the given dimensions or calculating them otherwise
    React.useEffect(() => {
        const newPictureSizes: PictureSizes = {};
        pictures.forEach((formUrl, index) => {
            if (formUrl.dimensions) {
                newPictureSizes[index] = formUrl.dimensions;
            } else {
                Image.getSize(
                    formUrl.src,
                    (width, height) => {
                        setPictureSizes((prevPictureSizes) => ({
                            ...prevPictureSizes,
                            [index]: { height, width },
                        }));
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
        // Reset pictureSizes state to newPictureSizes which will then be updated when the callbacks are called
        setPictureSizes(newPictureSizes);
    }, [pictures]);

    // There are no pictures to render
    if (!pictures.length) return null;

    return (
        <View style={[{ flex: 1, alignItems: 'center' }, props.containerStyle]}>
            {pictures.map((formUrl, index) => {
                if (!pictureSizes[index]) return null;

                const { height, width } = pictureSizes[index];
                return (
                    <TouchableHighlight
                        key={formUrl.name}
                        onPress={() => props.onPressPicture && props.onPressPicture(index)}
                        disabled={!props.onPressPicture}
                    >
                        <Image
                            source={{ uri: formUrl.src }}
                            style={[{ marginBottom: 15, height, width }, props.pictureStyle]}
                        />
                    </TouchableHighlight>
                );
            })}
        </View>
    );
}

export default React.memo(DescriptionPictures);
