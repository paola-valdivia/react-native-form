import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

import { DescriptionPicturesProps } from '../types';

interface PictureSizes {
    [index: number]: { width: number; height: number };
}

function DescriptionPictures(props: DescriptionPicturesProps) {
    const { pictures, onPressPicture, ImageViewer } = props;

    const [pictureSizes, setPictureSizes] = React.useState<PictureSizes>({});

    // ImageViewer component management
    const [displayViewer, setDisplayViewer] = React.useState(false);
    const [viewerIndex, setViewerIndex] = React.useState(0);
    const hideViewer = React.useCallback(() => setDisplayViewer(false), []);

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

    const pictureUris = React.useMemo(() => pictures.map((formUrl) => formUrl.src), [pictures]);

    // There are no pictures to render
    if (!pictureUris.length) return null;

    return (
        <View>
            {ImageViewer && (
                <ImageViewer
                    isVisible={displayViewer}
                    pictureUris={pictureUris}
                    startingIndex={viewerIndex}
                    goBack={hideViewer}
                />
            )}

            <View style={[{ flex: 1, alignItems: 'center' }, props.containerStyle]}>
                {pictureUris.map((uri, index) => {
                    if (!pictureSizes[index]) return null;

                    const { height, width } = pictureSizes[index];
                    return (
                        <TouchableHighlight
                            key={uri}
                            onPress={() => {
                                setDisplayViewer(true);
                                setViewerIndex(index);
                                onPressPicture && onPressPicture(index);
                            }}
                            disabled={!ImageViewer}
                        >
                            <Image source={{ uri }} style={[{ marginBottom: 15, height, width }, props.pictureStyle]} />
                        </TouchableHighlight>
                    );
                })}
            </View>
        </View>
    );
}

export default React.memo(DescriptionPictures);
