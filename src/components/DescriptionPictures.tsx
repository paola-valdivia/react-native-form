import React from 'react';
import { View, Image, TouchableHighlight, Modal, ViewStyle, ImageStyle } from 'react-native';

import { FormUrl, ImageViewerProps } from '../types';

interface Props {
    pictures: FormUrl[];
    imageViewerComponent?: React.ComponentType<ImageViewerProps>;
    styles?: {
        picturesContainer?: ViewStyle;
        picture?: ImageStyle;
    };
}
interface PictureSizes {
    [index: number]: { width: number; height: number };
}

function DescriptionPictures(props: Props) {
    const { pictures, imageViewerComponent: ImageViewer } = props;

    const [pictureSizes, setPictureSizes] = React.useState<PictureSizes>({});
    const [shouldDisplayViewer, setShouldDisplayViewer] = React.useState(false);
    const [viewerIndex, setViewerIndex] = React.useState(0);

    const dismissViewer = React.useCallback(() => setShouldDisplayViewer(false), []);

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

    const pictureUris = pictures.map((picture) => picture.src);

    return (
        <View>
            {ImageViewer && (
                <Modal visible={shouldDisplayViewer} onRequestClose={dismissViewer}>
                    <ImageViewer pictures={pictureUris} startingIndex={viewerIndex} goBack={dismissViewer} />
                </Modal>
            )}

            <View style={[{ flex: 1, alignItems: 'center' }]}>
                {pictures.map((formUrl, index) => {
                    if (!pictureSizes[index]) return null;

                    const { height, width } = pictureSizes[index];
                    if (!ImageViewer) {
                        return <Image source={{ uri: formUrl.src }} style={{ marginBottom: 15, height, width }} />;
                    }

                    return (
                        <TouchableHighlight
                            key={formUrl.name}
                            onPress={() => {
                                setShouldDisplayViewer(true);
                                setViewerIndex(index);
                            }}
                        >
                            <Image source={{ uri: formUrl.src }} style={{ marginBottom: 15, height, width }} />
                        </TouchableHighlight>
                    );
                })}
            </View>
        </View>
    );
}

export default React.memo(DescriptionPictures);
