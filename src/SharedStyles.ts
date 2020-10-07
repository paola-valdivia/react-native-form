import { StyleSheet } from 'react-native';
import { baseColors } from './constants';

export default StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 14,
        elevation: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: baseColors.description,
        marginBottom: 10,
    },
    labelAndValidationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    labelText: {
        fontSize: 14,
        color: baseColors.label,
    },
    validationDot: {
        alignSelf: 'center',
        height: 10,
        width: 10,
        borderRadius: 10,
    },
    inputText: {
        fontSize: 14,
        padding: 0,
        color: baseColors.main,
        textAlignVertical: 'top',
    },
    answerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
    },
    answerText: {
        fontSize: 13,
        flex: 1,
    },
    closeMcqBox: {
        color: '#fff',
        backgroundColor: baseColors.main,
        position: 'relative',
        marginTop: 10,
    },
});
