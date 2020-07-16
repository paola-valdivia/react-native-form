import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Modal } from 'react-native';

import { FormUrl } from '../../../index';
import ImageViewer from '../ImageViewer';

interface Props {
    descriptionPictures: FormUrl[];
}
interface State {
    pictureSizes: { [index: number]: { width: number; height: number } };
    displayImageViewer: boolean;
    imageViewerStartingIndex: number;
}

export default class DescriptionPictures extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pictureSizes: {},
            displayImageViewer: false,
            imageViewerStartingIndex: 0,
        };
    }

    dismissImageViewer = (): void => this.setState({ displayImageViewer: false });

    componentDidMount(): void {
        // We get the size of the pictures when the component mounts because the props are not supposed to change after
        this.props.descriptionPictures.forEach((formUrl, index) => {
            Image.getSize(
                formUrl.src,
                (width, height) => {
                    this.setState({
                        pictureSizes: {
                            ...this.state.pictureSizes,
                            [index]: { height, width },
                        },
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }

    render(): React.ReactNode {
        // No images to render
        if (!this.props.descriptionPictures.length) return null;

        // The images cannot be rendered until the sizes are computed
        if (Object.keys(this.state.pictureSizes).length !== this.props.descriptionPictures.length) return null;

        const pictureUris = this.props.descriptionPictures.map((formUrl) => formUrl.src);

        return (
            <View>
                <Modal visible={this.state.displayImageViewer} onRequestClose={this.dismissImageViewer}>
                    <ImageViewer
                        pictureUris={pictureUris}
                        index={this.state.imageViewerStartingIndex}
                        goBack={this.dismissImageViewer}
                    />
                </Modal>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    {this.props.descriptionPictures.map((formUrl, index) => {
                        const { height, width } = this.state.pictureSizes[index];
                        return (
                            <TouchableHighlight
                                key={formUrl.name}
                                onPress={() =>
                                    this.setState({
                                        displayImageViewer: true,
                                        imageViewerStartingIndex: index,
                                    })
                                }
                            >
                                <Image source={{ uri: formUrl.src }} style={{ marginBottom: 15, height, width }} />
                            </TouchableHighlight>
                        );
                    })}
                </View>
            </View>
        );
    }
}
