import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import R from 'ramda';

import { PhotoFieldProps } from '../types';
import sharedStyles from '../SharedStyles';

import Description, { descriptionProps } from '../components/Description';
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

function PhotoField<T extends React.FC>(props: PhotoFieldProps<T>) {
    const ImageComponent = props.ImageComponent || Image;
    return (
        <View style={props.containerStyle}>
            <Description {...R.pick(descriptionProps, props)} />

            <View
                style={[
                    sharedStyles.labelAndValidationContainer,
                    styles.labelAndValidationContainer,
                    props.labelAndValidationContainerStyle,
                ]}
            >
                <Text numberOfLines={3} ellipsizeMode={'tail'} style={[sharedStyles.labelText, props.labelStyle]}>
                    {props.label}
                </Text>
                <ValidationDot isValid={props.isValid} style={props.validationDotStyle} colors={props.colors} />
            </View>

            <View style={[styles.imagesContainer, props.imagesContainerStyle]}>
                {props.pictureUris.map((pictureUri: string, index: number) => {
                    return (
                        <TouchableHighlight
                            key={'picture_' + index}
                            onPress={() => props.onPressPicture && props.onPressPicture(index)}
                            style={[styles.imageContainer, props.imageContainerStyle]}
                        >
                            <ImageComponent
                                source={{
                                    uri: pictureUri,
                                }}
                                style={[styles.image, props.imageStyle]}
                                {...props.imageComponentProps}
                            />
                        </TouchableHighlight>
                    );
                })}
                {props.openCameraButton}
            </View>
        </View>
    );
}

export default React.memo(PhotoField);
