import React from 'react';
import { WebView, View } from 'react-native';
import Header from './Header';

const Transaction = (props) => {
    return (
        <View style={styles.container}>
            <Header title="Transactions" />
            <WebView
                source={{
                    uri: 'https://ddkexplorer.ddkoin.com/account/9800187006007272034'
                }}
            />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
};

export default Transaction;