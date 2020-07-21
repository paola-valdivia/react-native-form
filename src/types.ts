import React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type Nullable<T> = T | null;

export interface FormUrl {
    readonly src: string;
    readonly name?: string;
    readonly size?: number;
    readonly dimensions?: {
        width: number;
        height: number;
    };
}

export interface ImageViewerProps {
    pictures: string[];
    startingIndex: number;
    goBack: () => void;
}

export interface DescriptionProps {
    description?: {
        text?: string;
        pictures?: FormUrl[];
    };
    imageViewerComponent?: React.ComponentType<ImageViewerProps>;
    styles?: {
        text?: TextStyle;
        picturesContainer?: ViewStyle;
        picture?: ImageStyle;
    };
}

export interface CommonStyles {
    container?: ViewStyle;
    labelAndValidationContainer?: ViewStyle;
    label?: TextStyle;
    validationDot?: ViewStyle;
}
