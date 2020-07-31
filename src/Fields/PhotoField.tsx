import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ViewStyle,
    ImageStyle, StyleProp,
} from 'react-native';

import { CommonStyles, DescriptionProps, Nullable } from '../types';
import sharedStyles from '../SharedStyles';

import Description from '../components/Description';
import ValidationDot from '../components/ValidationDot';

const styles = StyleSheet.create({
    labelAndValidationContainer: {
        marginBottom: 2,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageContainer: {
        marginRight: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    image: {
        height: 64,
        width: 64,
        borderRadius: 5,
    },
    openCameraButton: {
        marginTop: 10,
    },
});

interface Styles extends CommonStyles {
    imagesContainerStyle?: StyleProp<ViewStyle>;
    imageContainerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    openCameraButtonStyle: StyleProp<ViewStyle>;
    colors?: {
        valid?: string;
        error?: string;
    };
}

interface Props extends Styles {
    descriptionProps: DescriptionProps;
    label?: string;
    pictureUris: string[];
    maxPictures?: number;
    isValid: Nullable<boolean>;
    onOpenCamera: () => void;
    onPressPicture: (index: number) => void;
    openCameraIcon: React.ReactNode;
}

function PhotoField(props: Props) {
    return (
        <View style={props.containerStyle}>
            <Description {...props.descriptionProps} />

            <View
                style={[
                    sharedStyles.labelAndValidationContainer,
                    styles.labelAndValidationContainer,
                    props.labelAndValidationContainerStyle,
                ]}
            >
                <Text numberOfLines={1} style={[sharedStyles.labelText, props.labelStyle]}>
                    {props.label}
                </Text>
                <ValidationDot isValid={props.isValid} style={props.validationDotStyle} colors={props.colors} />
            </View>

            <View style={[styles.imagesContainer, props.imagesContainerStyle]}>
                {props.pictureUris.map((pictureUri: string, index: number) => {
                    return (
                        <TouchableHighlight
                            key={'picture_' + index}
                            onPress={() => props.onPressPicture(index)}
                            style={[styles.imageContainer, props.imageContainerStyle]}
                        >
                            <Image source={{ uri: pictureUri }} style={[styles.image, props.imageStyle]} />
                        </TouchableHighlight>
                    );
                })}
                {(!props.maxPictures || props.pictureUris.length < props.maxPictures) && (
                    <TouchableOpacity
                        onPress={props.onOpenCamera}
                        style={[styles.openCameraButton, props.openCameraButtonStyle]}
                    >
                        {props.openCameraIcon}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default React.memo(PhotoField);
