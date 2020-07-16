import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, ViewStyle, Modal } from 'react-native';
import { WithTranslation } from 'react-i18next';
import RNFS from 'react-native-fs';

import {
    ActionPopup,
    AnswerValues,
    BarCodeAnswer,
    FormUrl,
    ImagePickerOptions,
    Nullable,
    PhotoComponent,
} from '../../../index';
import { withTranslationAndStatics } from '../../intl/i18n';

import Icon from '../Icon';
import ImageViewer from '../ImageViewer';
import CameraWrapper from '../Camera/CameraWrapper';
import BarcodeScanner from '../Camera/BarcodeScanner';

import sharedStyles, { colors } from './SharedStyles';
import Description from '../components/Description';
import { segmentScreen } from '../../utils/Segment';
import { ImagePicker } from '../../../native_modules';

const styles = StyleSheet.create({
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
});

interface Props extends WithTranslation {
    id: string;
    label: string;
    description?: string;
    descriptionPictures?: FormUrl[];
    minPhotos?: number;
    maxPhotos?: number;
    quality?: number;
    isGalleryEnabled?: boolean;
    pictureUris: string[];
    isBarcode?: boolean;
    saveAnswer: (newAnswerValues: AnswerValues, id: string, isValid: Nullable<boolean>) => void;
    isValid: Nullable<boolean>;
    validationFunc: (answer: Array<string | object> | BarCodeAnswer, component?: PhotoComponent) => Nullable<boolean>;
    setActionPopup: (popup: ActionPopup) => Promise<void>;
    submissionId: string;
    campaignId: string;
    component?: PhotoComponent;
    containerStyle?: ViewStyle;
}

function PhotoField(props: Props) {
    const { id, campaignId, isValid, pictureUris, saveAnswer, validationFunc, component, t } = props;

    const retakePictureRef = React.useRef(false);

    const [cameraIsDisplayed, setDisplayCamera] = React.useState(false);
    const [imageViewerIsDisplayed, setDisplayImageViewer] = React.useState(false);
    const [imageViewerStartingIndex, setImageViewerStartingIndex] = React.useState(0);

    /* memoized callback to avoid unnecessary rerender */
    const dismissCamera = React.useCallback(() => setDisplayCamera(false), []);
    const displayImageViewer = React.useCallback(() => setDisplayImageViewer(true), []);
    const dismissImageViewer = React.useCallback(() => setDisplayImageViewer(false), []);
    const onValidBarcode = React.useCallback(
        (barcodeData: string, newPictureUri: string) => {
            const barcodeAnswer: BarCodeAnswer = { barcode: barcodeData, s3key: newPictureUri };
            saveAnswer(barcodeAnswer, id, validationFunc(barcodeAnswer));
            segmentScreen('Camera', {
                campaignId: campaignId,
                isBarcode: true,
                replacePicture: false,
            });
        },
        [id, campaignId, saveAnswer, validationFunc]
    );

    /* those functions have pictureUris as dependency useCallback is useless here */
    const deletePicture = (pictureIndex: number): void => {
        setDisplayImageViewer(false);
        props
            .setActionPopup({
                type: 'ACTION',
                title: t('popupAction.deletePic.title'),
                message: t('popupAction.deletePic.description'),
                color: '#E74C3C',
                iconName: 'delete',
                acceptTitle: t('popupAction.deletePic.main'),
                rejectTitle: t('popupAction.deletePic.second'),
            })
            .then(() => {
                if (props.isBarcode) {
                    /* small trick to clean the barcode answer */
                    saveAnswer('', id, null);
                } else {
                    const isLastPicture: boolean = pictureUris.length === 1;
                    const newAnswer = pictureUris.filter((_: any, index: number) => index !== pictureIndex);
                    saveAnswer(newAnswer, id, validationFunc(newAnswer, component!));
                    setImageViewerStartingIndex(pictureIndex - 1);
                    !isLastPicture && displayImageViewer();
                }
            })
            .catch(() => {
                setImageViewerStartingIndex(pictureIndex);
                displayImageViewer();
            });
    };

    const onValidPictures = (newPictureUris: string[]): void => {
        // Remove the directory path from the uri
        // We have to do this because this path changes on application update (depends on version hash)
        // Though this is only the case for iOS, it is preferable to mimic this on Android
        const urisSimplified = newPictureUris.map((uri) => {
            const splitUri = uri.split('/');
            return splitUri[splitUri.length - 1];
        });

        if (urisSimplified.length > 0 && retakePictureRef.current) {
            const updatedPicture = [...pictureUris];
            updatedPicture[imageViewerStartingIndex] = urisSimplified[0];
            saveAnswer(updatedPicture, id, validationFunc(updatedPicture, component!));
            segmentScreen('Camera', {
                campaignId: campaignId,
                isBarcode: false,
                replacePicture: true,
            });
            retakePictureRef.current = false;
        } else {
            const newAnswer = [...pictureUris, ...urisSimplified];
            saveAnswer(newAnswer, id, validationFunc(newAnswer, component!));
            segmentScreen('Camera', {
                campaignId: campaignId,
                isBarcode: false,
                replacePicture: false,
            });
        }
    };

    // Re add the directory path
    const absolutePictureUris = pictureUris.map(
        (uri: string) => 'file://' + RNFS.DocumentDirectoryPath + `/${props.submissionId}/` + uri
    );

    return (
        <View style={[sharedStyles.container, props.containerStyle]}>
            <Modal visible={cameraIsDisplayed && !props.isBarcode} onRequestClose={dismissCamera}>
                <CameraWrapper
                    goBack={dismissCamera}
                    onValidPictures={onValidPictures}
                    minPhotos={props.minPhotos || 1}
                    maxPhotos={props.maxPhotos || 1}
                    photoCount={pictureUris.length}
                    startIndex={retakePictureRef.current ? imageViewerStartingIndex : pictureUris.length}
                    quality={props.quality}
                    isGalleryEnabled={props.isGalleryEnabled}
                    onGallerySelect={(options: ImagePickerOptions) =>
                        ImagePicker.openPicker(props.submissionId, options)
                    }
                    isRetake={retakePictureRef.current}
                    submissionId={props.submissionId}
                />
            </Modal>

            <Modal visible={!!(cameraIsDisplayed && props.isBarcode)} onRequestClose={dismissCamera}>
                <BarcodeScanner
                    goBack={dismissCamera}
                    onValidBarcode={onValidBarcode}
                    submissionId={props.submissionId}
                />
            </Modal>

            <Modal visible={imageViewerIsDisplayed} onRequestClose={dismissImageViewer}>
                <ImageViewer
                    pictureUris={absolutePictureUris}
                    index={imageViewerStartingIndex}
                    goBack={dismissImageViewer}
                    deletePicture={deletePicture}
                    retakePhoto={() => {
                        retakePictureRef.current = true;
                        setDisplayImageViewer(false);
                        setDisplayCamera(true);
                    }}
                />
            </Modal>

            <Description description={props.description} descriptionPictures={props.descriptionPictures} />

            <View style={[sharedStyles.labelAndValidationContainer, { marginBottom: 2 }]}>
                <Text numberOfLines={1} style={sharedStyles.labelText}>
                    {props.label}
                </Text>
                {isValid !== null && (
                    <View
                        style={[sharedStyles.validationDot, { backgroundColor: isValid ? colors.valid : colors.error }]}
                    />
                )}
            </View>

            <View style={styles.imagesContainer}>
                {absolutePictureUris.map((pictureUri: string, index: number) => {
                    return (
                        <TouchableHighlight
                            key={'picture_' + index}
                            onPress={() => {
                                setDisplayImageViewer(true);
                                setImageViewerStartingIndex(index);
                            }}
                            style={styles.imageContainer}
                        >
                            <Image source={{ uri: pictureUri }} style={styles.image} />
                        </TouchableHighlight>
                    );
                })}
                {pictureUris.length < (props.maxPhotos || 1) && (
                    <TouchableOpacity onPress={() => setDisplayCamera(true)} style={{ marginTop: 10 }}>
                        <Icon
                            name={props.isBarcode ? 'barcode_with_borders' : 'camera_with_borders'}
                            color={colors.placeholder}
                            size={64}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default React.memo(withTranslationAndStatics()(PhotoField));
