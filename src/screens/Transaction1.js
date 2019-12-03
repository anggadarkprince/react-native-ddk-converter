import React, {Component} from 'react';
import {WebView, View} from 'react-native';

class Transaction1 extends Component {
    static navigationOptions = {
        title: 'Transaction 1',
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
                        uri: 'https://ddkexplorer.ddkoin.com/account/9800187006007272034'
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

export default Transaction1;