import React from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { DatePickerProps } from '../types';

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    datePickerIOSContainer: {
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    datePickerIOSHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});

function DatePicker(props: DatePickerProps) {
    const [iosTempValue, setIosTempValue] = React.useState(props.value);
    // const iosDateControlValueRef = React.useRef(props.value);

    if (Platform.OS !== 'ios') {
        if (!props.isVisible) return null;

        return (
            <RNDateTimePicker
                mode="date"
                value={props.value}
                onChange={(event, date) => props.onClosePicker(date)}
                minimumDate={props.minimumDate}
                maximumDate={props.maximumDate}
            />
        );
    }

    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={() => props.onClosePicker(props.value)}
            style={[styles.modal, props.modalStyle]}
        >
            <View style={[styles.datePickerIOSContainer, props.datePickerIOSContainerStyle]}>
                <View style={[styles.datePickerIOSHeader, props.datePickerIOSHeaderStyle]}>
                    <Button title={props.iosClearButtonText || 'CLEAR'} onPress={() => props.onClosePicker()} />
                    <Button
                        title={props.iosValidateButtonText || 'OK'}
                        onPress={() => props.onClosePicker(iosTempValue)}
                    />
                </View>
                <RNDateTimePicker
                    value={iosTempValue}
                    onChange={(event, date?: Date) => date && setIosTempValue(date)}
                    textColor="black"
                />
            </View>
        </Modal>
    );
}

export default React.memo(DatePicker);
