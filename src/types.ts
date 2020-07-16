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