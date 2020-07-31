import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

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
    textStyle?: StyleProp<TextStyle>;
    picturesContainerStyle?: StyleProp<ViewStyle>;
    pictureStyle?: StyleProp<ImageStyle>;
}

export interface CommonStyles {
    containerStyle?: StyleProp<ViewStyle>;
    labelAndValidationContainerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    validationDotStyle?: StyleProp<ViewStyle>;
}
