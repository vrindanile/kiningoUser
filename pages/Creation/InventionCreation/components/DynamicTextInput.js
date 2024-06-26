import React from 'react';
import { TextInput } from 'react-native';
import {
    dimensions
} from '../../../../utility/Mycolors';
const DynamicTextInput = ({ placeholder }) => {
    return (
        <TextInput
            style={{
                height: 40,
                borderColor: '#dbdbd9',
                borderWidth: 1,
                marginBottom: 10,
                paddingHorizontal: 10,
                marginTop: 30,
                width: dimensions.SCREEN_WIDTH * 0.83,
            }}
            placeholder={placeholder}
        />
    );
};

export default DynamicTextInput;
