import React, { Component } from 'react';
import { View, Text } from 'react-native';

import sharedStyles from './SharedStyles';
import { FormUrl } from '../../../index';
import DescriptionPictures from './DescriptionPictures';
import R from 'ramda';

interface Props {
    description?: string;
    descriptionPictures?: FormUrl[];
}

export default class Description extends Component<Props> {
    render() {
        return (
            <View>
                {!!this.props.description && <Text style={sharedStyles.descriptionText}>{this.props.description}</Text>}
                {this.props.descriptionPictures && (
                    <DescriptionPictures descriptionPictures={this.props.descriptionPictures} />
                )}
            </View>
        );
    }
}
