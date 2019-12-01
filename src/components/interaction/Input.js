import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ value, label, placeholder, onChangeText, secureTextEntry, autoCompleteType, keyboardType, textContentType, editable }) => (
    <View style={styles.containerStyle}>
        <Text style={styles.labelStyle}>{label}</Text>
        <TextInput
            value={value}
            secureTextEntry={secureTextEntry || false}
            autoCorrect={false}
            autoCompleteType={autoCompleteType}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.inputStyle}
            clearButtonMode="while-editing"
            keyboardType={keyboardType || 'default'}
            textContentType={textContentType}
            editable={editable || true}
        />
    </View>
);

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 3
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 10,
        flex: 2,
        fontWeight: 'bold'
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export { Input };
