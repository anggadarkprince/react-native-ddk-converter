import React, {Component} from 'react';
import {WebView, View} from 'react-native';

class Transaction2 extends Component {
    static navigationOptions = {
        title: 'Transaction 2',
        headerStyle: {
            backgroundColor: '#fb6503'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{
                        uri: 'https://ddkexplorer.ddkoin.com/account/3117124267466722813'
                    }}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
};

export default Transaction2;