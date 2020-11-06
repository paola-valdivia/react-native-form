import React, { useReducer } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { MCQField, MultiLineTextField, SingleLineTextField } from 'react-native-form-fields';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#F4F7FB',
    },
    scrollViewContentContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
    },
    fieldContainer: {
        width: '90%',
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 14,
        elevation: 5,
    },
});

interface State {
    singleLineTextField1: string;
    singleLineTextField2: string;
    singleLineTextField3: string;
    singleLineTextField3Focus: boolean;
    multiLineTextField1: string;
    multiLineTextField2: string;
    mcqFieldSelectedAnswers: number[];
    mcqFieldSelectedAnswers2: number[];
}

/*
 * Don't define descriptionPictures inside the component because the reference will change at every render
 * Which means this will trigger unnecessary rerenders and make the picture flicker
 * */
const descriptionPictures = [
    {
        src:
            'https://api.mobeye-app.com/media/campaign/9281/form_images/718503f05bfa43e9d186dddc9e61be002ea4f9aa_320.jpeg',
    },
];

const App = (): React.ReactElement => {
    const reducer = (state: State, action: Partial<State>): State => ({ ...state, ...action });

    const initialState: State = {
        singleLineTextField1: '',
        singleLineTextField2: '',
        singleLineTextField3: '',
        singleLineTextField3Focus: false,
        multiLineTextField1: '',
        multiLineTextField2: '',
        mcqFieldSelectedAnswers: [],
        mcqFieldSelectedAnswers2: [],
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    /*
     * You should define all field callbacks with React.useCallback
     * All field components are optimized with React.memo (PureComponents before hooks)
     * useCallback will ensure that the function signature only changes when it has to
     * Meaning the field will only rerender when necessary
     * */
    const onChangeTextSLTF1 = React.useCallback((text: string) => dispatch({ singleLineTextField1: text }), []);
    const onChangeTextSLTF2 = React.useCallback((text: string) => dispatch({ singleLineTextField2: text }), []);
    const onChangeTextSLTF3 = React.useCallback((text: string) => dispatch({ singleLineTextField3: text }), []);
    const switchFocusSLTF3 = React.useCallback(
        () => dispatch({ singleLineTextField3Focus: !state.singleLineTextField3Focus }),
        [state.singleLineTextField3Focus]
    );
    const onChangeTextMLTF1 = React.useCallback((text: string) => dispatch({ multiLineTextField1: text }), []);
    const onChangeTextMLTF2 = React.useCallback((text: string) => dispatch({ multiLineTextField2: text }), []);

    const onSelectAnswerMCQF = React.useCallback(
        (index: number) => {
            if (!state.mcqFieldSelectedAnswers.includes(index)) {
                dispatch({ mcqFieldSelectedAnswers: [...state.mcqFieldSelectedAnswers, index] });
            } else {
                dispatch({
                    mcqFieldSelectedAnswers: state.mcqFieldSelectedAnswers.filter(
                        (answerIndex) => answerIndex !== index
                    ),
                });
            }
        },
        [state.mcqFieldSelectedAnswers]
    );
    const onSelectAnswerMCQF2 = React.useCallback(
        (index: number) => {
            if (!state.mcqFieldSelectedAnswers2.includes(index)) {
                dispatch({ mcqFieldSelectedAnswers2: [...state.mcqFieldSelectedAnswers2, index] });
            } else {
                dispatch({
                    mcqFieldSelectedAnswers2: state.mcqFieldSelectedAnswers2.filter(
                        (answerIndex) => answerIndex !== index
                    ),
                });
            }
        },
        [state.mcqFieldSelectedAnswers2]
    );

    const foldableLabel = (selectedAnswersQty: number) => `${selectedAnswersQty} answers selected`;

    /*
     * For the same reason you should use memoized values when you can
     * */
    const isValidSLTF2 = React.useMemo(() => {
        if (!state.singleLineTextField2) return null;
        return state.singleLineTextField2.startsWith('R');
    }, [state.singleLineTextField2]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <Text style={styles.title}>REACT NATIVE FORM FIELDS</Text>

                {/* SingleLineTextField 1 */}
                <SingleLineTextField
                    label="Single line text with no validation"
                    value={state.singleLineTextField1}
                    onChangeText={onChangeTextSLTF1}
                    containerStyle={styles.fieldContainer}
                />

                {/* SingleLineTextField 2 */}
                <SingleLineTextField
                    label="Single line text that must start with the letter 'R'"
                    value={state.singleLineTextField2}
                    isValid={isValidSLTF2}
                    onChangeText={onChangeTextSLTF2}
                    containerStyle={styles.fieldContainer}
                />

                {/* SingleLineTextField 3 */}
                <SingleLineTextField
                    label="Text that changes color on Focus"
                    value={state.singleLineTextField3}
                    onChangeText={onChangeTextSLTF3}
                    onFocus={switchFocusSLTF3}
                    onBlur={switchFocusSLTF3}
                    containerStyle={[
                        styles.fieldContainer,
                        { backgroundColor: state.singleLineTextField3Focus ? '#212223' : '#fff' },
                    ]}
                    inputStyle={{ color: state.singleLineTextField3Focus ? '#fff' : '#000' }}
                />

                {/* MultiLineTextField 1 */}
                <MultiLineTextField
                    label="MultiLineTextField with placeholder"
                    value={state.multiLineTextField1}
                    onChangeText={onChangeTextMLTF1}
                    containerStyle={styles.fieldContainer}
                    placeholder="I am a placeholder"
                />

                {/* MultiLineTextField 2 */}
                <MultiLineTextField
                    descriptionText={
                        'This showcases an example of a field with a description text and pictures. ' +
                        'You can use those to add information and context for the field and ' +
                        'to help the user understand what they are supposed to do'
                    }
                    descriptionPictures={descriptionPictures}
                    label="I am a MultiLineTextField"
                    value={state.multiLineTextField2}
                    onChangeText={onChangeTextMLTF2}
                    containerStyle={styles.fieldContainer}
                    descriptionPicturesContainerStyle={{ marginTop: 10 }}
                />

                {/* MCQField */}
                <MCQField
                    label="MCQField"
                    possibleAnswers={['a', 'b', 'c', 'd']}
                    selectedAnswersIndices={state.mcqFieldSelectedAnswers}
                    onSelectAnswer={onSelectAnswerMCQF}
                    containerStyle={styles.fieldContainer}
                />

                {/* MCQField 2 */}
                <MCQField
                    label="MCQField foldable"
                    possibleAnswers={['a', 'b', 'c', 'd']}
                    selectedAnswersIndices={state.mcqFieldSelectedAnswers2}
                    onSelectAnswer={onSelectAnswerMCQF2}
                    foldable={true}
                    openFoldableLabel={foldableLabel}
                    closeFoldableLabel={foldableLabel}
                    containerStyle={styles.fieldContainer}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
