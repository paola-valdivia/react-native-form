import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

import { makeCancelablePromise } from '../utils';
import { CancelablePromise, DescriptionPicturesProps } from '../types';

interface PictureSize {
    width: number;
    height: number;
}

interface PictureSizes {
    [index: number]: PictureSize;
}

// Transform react-native Image.getSize to be a Promise
const getImageSize = (uri: string): Promise<PictureSize> => {
    return new Promise<PictureSize>((resolve, reject) => {
        Image.getSize(
            uri,
            (width, height) => resolve({ width, height }),
            (error) => reject(error)
        );
    });
};

function DescriptionPictures(props: DescriptionPicturesProps) {
    const { pictures, onPressPicture, ImageViewer } = props;

    const [pictureSizes, setPictureSizes] = React.useState<PictureSizes>({});

    // ImageViewer component management
    const [displayViewer, setDisplayViewer] = React.useState(false);
    const [viewerIndex, setViewerIndex] = React.useState(0);
    const hideViewer = React.useCallback(() => setDisplayViewer(false), []);

    // Initialize pictureSizes using the given dimensions or calculating them otherwise
    React.useEffect(() => {
        const cancelablePromises: CancelablePromise<PictureSize>[] = [];
        const newPictureSizes: PictureSizes = {};
        pictures.forEach((formUrl, index) => {
            if (formUrl.dimensions) {
                newPictureSizes[index] = formUrl.dimensions;
            } else {
                const cancelablePromise = makeCancelablePromise<PictureSize>(getImageSize(formUrl.src));
                cancelablePromises.push(cancelablePromise);

                cancelablePromise.promise
                    .then(({ width, height }) => {
                        setPictureSizes((prevPictureSizes) => ({
                            ...prevPictureSizes,
                            [index]: { height, width },
                        }));
                    })
                    .catch(console.log);
            }
        });
        // Reset pictureSizes state to newPictureSizes which will then be updated when the callbacks are called
        setPictureSizes(newPictureSizes);

        return () => {
            cancelablePromises.forEach((promise) => promise.cancel);
        };
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
                            <Image
                                source={{ uri }}
                                style={[
                                    { marginBottom: 15, height, width, maxHeight: 300, resizeMode: 'contain' },
                                    props.pictureStyle,
                                ]}
                            />
                        </TouchableHighlight>
                    );
                })}
            </View>
        </View>
    );
}

export default React.memo(DescriptionPictures);
