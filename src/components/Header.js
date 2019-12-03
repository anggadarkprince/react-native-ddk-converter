import React from 'react';
import { Text, View } from 'react-native';

const styles = {
    viewStyle: {
        backgroundColor: '#fb6503',
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        paddingTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        elevation: 3,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        color: '#fff'
    }
};

const Header = (props) => {
    const { viewStyle, textStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.title || 'DDKoin Converter'}</Text>
        </View>
    );
};

export default Header;
