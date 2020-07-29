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

export interface DescriptionProps {
    text?: string;
    pictures?: FormUrl[];
    onPressPicture?: (index: number) => void;
    textStyle?: TextStyle;
    picturesContainerStyle?: ViewStyle;
    pictureStyle?: ImageStyle;
}

export interface CommonStyles {
    containerStyle?: ViewStyle;
    labelAndValidationContainerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    validationDotStyle?: ViewStyle;
}
