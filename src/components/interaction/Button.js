import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
        <Text style={styles.textStyle}>{props.children}</Text>
    </TouchableOpacity>
);

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fb6503',
        fontSize: 16,
        fontWeight: '600',
        padding: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fb6503',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    }
};

export { Button };
