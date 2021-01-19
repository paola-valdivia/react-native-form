# @mobeye/react-native-form-fields

Optimized field components with nice design for react-native forms

## Table of contents

- [Getting started](#getting-started)
- [General Usage](#general-usage)

## Getting started

Install the library using Yarn:
```bash
yarn add @mobeye/react-native-form-fields
```

## General Usage

See example app (`example/App.tsx`) for more examples using TypeScript

You can use most Fields based on the example below, they work in the same way as a basic `TextInput`

```javascript
import React from 'react';
import SingleLineTextField from '@mobeye/react-native-form-fields';

const App = () => {
    const [text, setText] = React.useState('');
    
    const containerStyle = {
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
    }
    
    // Make sure to use React callbacks and/or memoized values to prevent unnecessary renders !
    return (
        <SingleLineTextField
            label="Click on me !"
            value={text}
            onChangeText={setText}
            containerStyle={containerStyle}
        />
    );
}
```

## Field common props

### `Description`

All fields come with an optional `Description` to display text and/or images above the field.
Can be used to give context, indications or whatever you want.

Those props are present in every field and will be immediately passed to the `Description` component.

| Property                            | Type                      | Description                    |
| ----------------------------------- | ------------------------- | ------------------------------ |
| `descriptionText`                   | `string`                  | (Optional) Text to display     |
| `descriptionPictures`               | `FormUrl[]`               | (Optional) Pictures to display. See [FormUrl](#formurl) |
| `descriptionImageViewer`            | `FC<ImageViewerProps>`    | (Optional) If an ImageViewer component is provided, it will open on picture press. See [ImageViewerProps](#imageviewerprops) |
| `onPressDescriptionPicture`         | `(index: number) => void` | (Optional) callback fired when user touches a picture |
| `descriptionContainerStyle`         | `ViewStyle`               | (Optional) Style for the Description container |
| `descriptionTextStyle`              | `TextStyle`               | (Optional) Style for the text  |
| `descriptionPicturesContainerStyle` | `ViewStyle`               | (Optional) Style for the view containing the pictures |
| `descriptionPictureStyle`           | `ImageStyle`              | (Optional) Style for the Image components rendering the pictures |

#### `FormUrl`

Custom type used to pass pictures to the `Description` component

| Property     | Type                                | Description                         |
| ------------ | ----------------------------------- | ----------------------------------- |
| `src`        | `string`                            | (Required) Url or path to the image |
| `name`       | `string`                            | (Optional) Not used for now         |
| `size`       | `number`                            | (Optional) Not used for now         |
| `dimensions` | `{ width: number; height: number }` | (Optional) If not provided will be computed on initial render and every time `pictures` changes |

#### `ImageViewerProps`

Props of the custom ImageViewer component passed using `descriptionImageViewer`
Those 4 props will be passed to the component by the `DescriptionPictures` component
It is up to you to use them or not

 | Property         | Type          | Description                                           |
 | ---------------- | ------------- | ----------------------------------------------------- |
 | `isVisible`      | `boolean`     | (Required) Show/Hide ImageViewer                      |
 | `pictureUris`    | `string[]`    | (Required) List of the description pictures           |
 | `startingIndex`  | `number`      | (Required) index of the picture pressed by the user   |
 | `goBack`         | `() => void`  | (Required) callback to dismiss the viewer             |

### Styles

In addition to their own style props, every field has these 4 styles: 

| Property                           | Type        | Description                                 |
| ---------------------------------- | ----------- | ------------------------------------------- |
| `containerStyle`                   | `ViewStyle` | (Optional) Container style                  |
| `labelAndValidationContainerStyle` | `ViewStyle` | (Optional) Label/validation container style |
| `labelStyle`                       | `TextStyle` | (Optional) Label text style                 |
| `validationDotStyle`               | `ViewStyle` | (Optional) Validation dot style             |

### Colors

All fields have an optional props `colors` which is an object with the optional following keys:
`valid`, `error`, `active`, `inactive`, `activeBackground`, `inactiveBackground`, `placeholder`
 
Depending on the field only some of them can be used. If unsure please refer to the types exported with the library

## Fields

### `SingleLineTextField`

A TextInput with a nice animation on focus/blur


| Property              | Type                     | Description                                                   |
| --------------------- | ------------------------ | ------------------------------------------------------------- |
| `label`               | `string`                 | (Required) Label to display and animate                       |
| `value`               | `string`                 | (Required) Value to display in the input. Can be empty        |
| `isValid`             | `bool \| null`           | (Optional) If undefined or null, validation will not be rendered. If boolean validation will be rendered either as valid or invalid |
| `onChangeText`        | `(text: string) => void` | (Optional) `TextInput` `onChangeText` callback                |
| `onFocus`             | `() => void`             | (Optional) Triggered on input focus                           |
| `onBlur`              | `() => void`             | (Optional) Triggered on input blur                            |
| `leftIcon`            | `ReactNode`              | (Optional) Component to be rendered on the left of the input  |
| `rightIcon`           | `ReactNode`              | (Optional) Component to be rendered on the right of the input |
| `textInputProps`      | `TextInputProps`         | (Optional) Props that will be directly passed down to the `TextInput` |
| `inputContainerStyle` | `ViewStyle`              | (Optional) input container style                              |
| `inputStyle`          | `TextStyle`              | (Optional) Style to pass down to the `TextInput`              |

### `MultiLineTextField`

| Property              | Type                     | Description                                                   |
| --------------------- | ------------------------ | ------------------------------------------------------------- |
| `label`               | `string`                 | (Required) Label to display and animate                       |
| `value`               | `string`                 | (Required) Value to display in the input. Can be empty        |
| `isValid`             | `bool \| null`           | (Optional) If undefined or null, validation will not be rendered. If boolean validation will be rendered either as valid or invalid |
| `onChangeText`        | `(text: string) => void` | (Optional) `TextInput` `onChangeText` callback                |
| `onFocus`             | `() => void`             | (Optional) Triggered on input focus                           |
| `onBlur`              | `() => void`             | (Optional) Triggered on input blur                            |
| `textInputProps`      | `TextInputProps`         | (Optional) Props that will be directly passed down to the `TextInput` |
| `inputStyle`          | `TextStyle`              | (Optional) Style to pass down to the `TextInput`              |

### `MCQField`

| Property                        | Type                            | Description                             |
| ------------------------------- | ------------------------------- | ----------------------------------------|
| `label`                         | `string`                        | (Required) Label to display and animate |
| `possibleAnswers`               | `string[]`                      | (Required) List of possible answers to display |
| `selectedAnswersIndices`        | `number[]`                      | (Required) List of indices of the selected answers |
| `onSelectAnswer`                | `(answerIndex: number) => void` | (Required) Callback fired when user selects an answer |
| `isValid`                       | `bool \| null`                  | (Optional) If undefined or null, validation will not be rendered. If boolean validation will be rendered either as valid or invalid |
| `foldable`                      | `boolean`                       | (Optional) Should the MCQField be foldable (useful when there are a lot of possible answers) |
| `openFoldableLabel`             | `string`                        | (Optional) Opening button label for foldable MCQ |
| `closeFoldableLabel`            | `string`                        | (Optional) Closing button label for foldable MCQ |
| `activeAnswerIcon`              | `React.ReactNode`               | (Optional) Icon to display next to the answer when it is selected |
| `inactiveAnswerIcon`            | `React.ReactNode`               | (Optional) Icon to display next to the answer when it is not selected |
| `activeOpenFoldableIcon`        | `React.ReactNode`               | (Optional) Icon to display in the open button for foldable MCQ when it is closed |
| `inactiveOpenFoldableIcon`      | `React.ReactNode`               | (Optional) Icon to display in the open button for foldable MCQ when it is opened |
| `activeCloseFoldableIcon`       | `React.ReactNode`               | (Optional) Icon to display in the close button for foldable MCQ when it is closed |
| `inactiveCloseFoldableIcon`     | `React.ReactNode`               | (Optional) Icon to display in the close button for foldable MCQ when it is opened |
| `shouldAnimateOpenFoldableIcon` | `boolean`                       | (Optional) Should the openFoldableIcon be animated (90° rotation) on opening |
| `answerContainerStyle`          | `ViewStyle`                     | (Optional) Answer container style |
| `answerTextStyle`               | `TextStyle`                     | (Optional) Answer text style |
| `openFoldableBoxStyle`          | `ViewStyle`                     | (Optional) Open foldable button style |
| `openFoldableLabelStyle`        | `TextStyle`                     | (Optional) Open foldable button label style |
| `closeFoldableBoxStyle`         | `ViewStyle`                     | (Optional) Close foldable button style |
| `closeFoldableLabelStyle`       | `TextStyle`                     | (Optional) Close foldable button label style |

### `PickerField`

| Property              | Type                     | Description                                                   |
| --------------------- | ------------------------ | ------------------------------------------------------------- |
| `label`               | `string`                 | (Required) Label to display and animate                       |
| `value`               | `string`                 | (Required) Value to display in the input. Can be empty        |
| `openPicker`          | `() => void`             | (Required) Callback fired when user presses the field to open the picker |
| `isValid`             | `bool \| null`           | (Optional) If undefined or null, validation will not be rendered. If boolean validation will be rendered either as valid or invalid |
| `leftIcon`            | `React.ReactNode`        | (Optional) Icon to display on the left part of the field      |
| `rightIcon`           | `React.ReactNode`        | (Optional) Icon to display on the right part of the field     |
| `inputContainerStyle` | `ViewStyle`              | (Optional) input container style                              |
| `inputStyle`          | `TextStyle`              | (Optional) Style to pass down to the `TextInput`              |

### `PhotoField`

| Property                  | Type                      | Description                                                   |
| ------------------------- | ------------------------- | ------------------------------------------------------------- |
| `label`                   | `string`                  | (Required) Label to display and animate                       |
| `pictureUris`             | `string[]`                | (Required) List of picture uris to display                    |
| `openCameraButton`        | `React.ReactNode`         | (Required) Open Camera button to be pressed by the user to open the camera |
| `isValid`                 | `bool \| null`            | (Optional) If undefined or null, validation will not be rendered. If boolean validation will be rendered either as valid or invalid |
| `onPressPicture`          | `(index: number) => void` | (Optional) Callback fired when user presses a picture         |
| `imagesContainerStyle`    | `ViewStyle`               | (Optional) Style for the view containing the images           |
| `imageContainerStyle`     | `ViewStyle`               | (Optional) Style for the Touchable containing each individual image |
| `imageStyle`              | `ImageStyle`              | (Optional) Style for the images                               |
